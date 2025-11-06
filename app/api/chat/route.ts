/**
 * Chat API route for Bespoke Academy chatbot
 * Enhanced with centralized configuration and detailed error handling
 * Handles streaming chat responses using Groq API
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGroqClient, testGroqConnection, getGroqConfigurationSummary } from '@/lib/groq'
import type { ChatRequest } from '@/lib/chat'
import { isValidMessage, isValidChatContext } from '@/lib/chat'
import {
  parseGroqError,
  GroqErrorType,
  type GroqApiError,
  logGroqError
} from '@/lib/errors/groq-errors'

// Rate limiting (simple in-memory implementation for development)
const rateLimiter = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ipAddress: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = rateLimiter.get(ipAddress)

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimiter.set(ipAddress, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false // Rate limit exceeded
  }

  record.count++
  return true
}

// Input validation
function validateChatRequest(data: any): { isValid: boolean; error?: string; sanitized?: ChatRequest } {
  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'Invalid request format' }
  }

  // Validate message
  if (!data.message || typeof data.message !== 'string') {
    return { isValid: false, error: 'Message is required and must be a string' }
  }

  if (data.message.trim().length === 0) {
    return { isValid: false, error: 'Message cannot be empty' }
  }

  if (data.message.length > 2000) {
    return { isValid: false, error: 'Message is too long (max 2000 characters)' }
  }

  // Validate conversation history
  if (data.conversationHistory && !Array.isArray(data.conversationHistory)) {
    return { isValid: false, error: 'conversationHistory must be an array' }
  }

  const validHistory = data.conversationHistory?.filter(isValidMessage) || []

  // Validate context
  const context = data.context || { type: 'general-inquiry' }
  if (!isValidChatContext(context)) {
    return { isValid: false, error: 'Invalid context format' }
  }

  // Sanitize message
  const sanitizedMessage = data.message
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim()

  if (sanitizedMessage.length === 0) {
    return { isValid: false, error: 'Message contains invalid content' }
  }

  return {
    isValid: true,
    sanitized: {
      message: sanitizedMessage,
      conversationHistory: validHistory,
      context,
      config: data.config
    }
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  const ipAddress = request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    // Check rate limiting
    if (!checkRateLimit(ipAddress)) {
      const rateLimitError = {
        error: 'Too many requests. Please wait a moment before trying again.',
        errorType: 'RATE_LIMIT_EXCEEDED',
        isRetryable: true,
        retryAfter: 60,
        timestamp: new Date().toISOString(),
        requestId
      }
      return NextResponse.json(rateLimitError, { status: 429 })
    }

    // Parse and validate request
    let body: any
    try {
      body = await request.json()
    } catch (parseError) {
      const validationError = {
        error: 'Invalid JSON in request body',
        errorType: 'VALIDATION_ERROR',
        isRetryable: false,
        timestamp: new Date().toISOString(),
        requestId
      }
      return NextResponse.json(validationError, { status: 400 })
    }

    const validation = validateChatRequest(body)
    if (!validation.isValid) {
      const validationError = {
        error: validation.error,
        errorType: 'VALIDATION_ERROR',
        isRetryable: false,
        timestamp: new Date().toISOString(),
        requestId
      }
      return NextResponse.json(validationError, { status: 400 })
    }

    const chatRequest: ChatRequest = validation.sanitized!

    // Log the request (for debugging)
    console.log('Chat Request:', {
      requestId,
      timestamp: new Date().toISOString(),
      ipAddress,
      userAgent,
      messageLength: chatRequest.message.length,
      context: chatRequest.context.type,
      historySize: chatRequest.conversationHistory.length
    })

    // Get Groq client and send request
    const groqClient = getGroqClient()

    // Create streaming response
    const stream = await groqClient.sendChatRequest(chatRequest)

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-Request-ID': requestId
      }
    })

  } catch (error) {
    const responseTime = Date.now() - startTime

    // Parse and log the error with detailed context
    let groqError: GroqApiError
    if (error instanceof Error && error.name === 'GroqApiError') {
      groqError = error as GroqApiError
    } else {
      groqError = parseGroqError(error, {
        requestId,
        timestamp: new Date(),
        ipAddress,
        userAgent,
        endpoint: 'api/chat',
        responseTime,
        additionalData: {
          method: 'POST'
        }
      })
    }

    logGroqError(groqError, {
      ipAddress,
      userAgent,
      responseTime
    })

    // Determine appropriate status code based on error type
    let statusCode = 500
    switch (groqError.type) {
      case GroqErrorType.RATE_LIMIT_EXCEEDED:
        statusCode = 429
        break
      case GroqErrorType.API_KEY_INVALID:
      case GroqErrorType.API_KEY_MISSING:
        statusCode = 401
        break
      case GroqErrorType.CONTENT_TOO_LONG:
      case GroqErrorType.REQUEST_INVALID:
      case GroqErrorType.VALIDATION_ERROR:
        statusCode = 400
        break
      case GroqErrorType.MODEL_NOT_FOUND:
        statusCode = 404
        break
      case GroqErrorType.REQUEST_TIMEOUT:
        statusCode = 408
        break
      case GroqErrorType.NETWORK_ERROR:
      case GroqErrorType.SERVICE_UNAVAILABLE:
        statusCode = 503
        break
      default:
        statusCode = 500
    }

    // Return detailed error response
    const errorResponse = {
      error: groqError.userFriendlyMessage,
      errorType: groqError.type,
      isRetryable: groqError.isRetryable,
      suggestedAction: groqError.suggestedAction,
      timestamp: groqError.context.timestamp.toISOString(),
      requestId,
      responseTime,
      // Include additional debug info in development
      ...(process.env.NODE_ENV === 'development' && {
        technicalError: groqError.message,
        originalError: groqError.originalError,
        severity: groqError.severity
      })
    }

    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// Health check endpoint with enhanced diagnostics
export async function GET() {
  const requestId = `health_${Date.now()}`

  try {
    const connectionResult = await testGroqConnection()

    let healthStatus = 'healthy'
    let issues: string[] = []

    if (!connectionResult.connected) {
      healthStatus = 'unhealthy'
      issues.push(connectionResult.error?.userFriendlyMessage || 'Connection failed')
    }

    // Get configuration summary
    const configSummary = getGroqConfigurationSummary()

    // Check rate limiter
    const activeRequests = rateLimiter.size

    return NextResponse.json({
      status: healthStatus,
      timestamp: new Date().toISOString(),
      requestId,
      service: {
        name: 'Bespoke Academy Chat API',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      },
      groq: {
        connected: connectionResult.connected,
        availableModels: connectionResult.models || [],
        currentModel: configSummary.model,
        baseURL: configSummary.baseURL,
        maxTokens: configSummary.maxTokens,
        temperature: configSummary.temperature,
        enableStreaming: configSummary.enableStreaming,
        ...(connectionResult.error && {
          error: {
            type: connectionResult.error.type,
            message: connectionResult.error.message,
            severity: connectionResult.error.severity
          }
        })
      },
      rateLimiter: {
        activeRequests,
        configured: true
      },
      configuration: {
        maxMessageLength: configSummary.maxMessageLength,
        maxHistoryLength: configSummary.maxHistoryLength,
        timeout: configSummary.timeout
      },
      issues: issues.length > 0 ? issues : undefined
    })

  } catch (error) {
    const groqError = parseGroqError(error, {
      requestId,
      timestamp: new Date(),
      endpoint: 'api/chat/health'
    })

    logGroqError(groqError)

    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      requestId,
      service: {
        name: 'Bespoke Academy Chat API',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      },
      error: {
        type: groqError.type,
        message: groqError.userFriendlyMessage,
        severity: groqError.severity,
        isRetryable: groqError.isRetryable
      },
      ...(process.env.NODE_ENV === 'development' && {
        technicalError: groqError.message,
        originalError: groqError.originalError
      })
    }, { status: 503 })
  }
}