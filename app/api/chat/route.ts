/**
 * Chat API route for Bespoke Academy chatbot
 * Enhanced with AI SDK and local documentation search
 * Handles streaming chat responses using AI SDK with Groq provider
 */

import { NextRequest } from 'next/server'
import { groq } from '@ai-sdk/groq'
import { streamText, tool } from 'ai'
import { z } from 'zod'
import { documentationService } from '@/lib/documentation'
import type { ChatRequest } from '@/lib/chat'
import { isValidMessage, isValidChatContext } from '@/lib/chat'
import {
  parseGroqError,
  GroqErrorType,
  type GroqApiError,
  logGroqError
} from '@/lib/errors/groq-errors'

export const maxDuration = 30

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
      return Response.json(
        {
          error: 'Too many requests. Please wait a moment before trying again.',
          errorType: 'RATE_LIMIT_EXCEEDED',
          isRetryable: true,
          retryAfter: 60,
          timestamp: new Date().toISOString(),
          requestId
        },
        { status: 429 }
      )
    }

    // Parse and validate request
    const body = await request.json()

    const validation = validateChatRequest(body)
    if (!validation.isValid) {
      return Response.json(
        {
          error: validation.error,
          errorType: 'VALIDATION_ERROR',
          isRetryable: false,
          timestamp: new Date().toISOString(),
          requestId
        },
        { status: 400 }
      )
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

    // Convert messages to AI SDK format
    const messages = [
      {
        role: 'system' as const,
        content: `You are a helpful assistant for Bespoke Academy, an AI and robotics education platform.
        You have access to the academy's documentation and can search for relevant information to answer questions.
        Always try to provide accurate information from the documentation when available.
        If you find relevant documentation, cite your sources and provide links to the full documents.`
      },
      ...chatRequest.conversationHistory
        .filter(msg => msg.sender !== 'tool')
        .map(msg => ({
          role: msg.sender as 'user' | 'assistant',
          content: msg.content
        })),
      {
        role: 'user' as const,
        content: chatRequest.message
      }
    ]

    // Get context suggestions
    const contextSuggestions = await documentationService.getContextSuggestions(chatRequest.message)
    const suggestedContext = contextSuggestions.length > 0 ? contextSuggestions[0] : chatRequest.context.type

    // Create AI SDK streaming response with documentation tools
    const result = await streamText({
      model: groq('openai/gpt-oss-20b'),
      messages,
      temperature: 0.7,
      tools: {
        searchDocumentation: tool({
          description: 'Search Bespoke Academy documentation for relevant information',
          inputSchema: z.object({
            query: z.string().describe('Search query to find in documentation'),
            contextType: z.string().optional().describe('Optional context type to filter results'),
            limit: z.number().default(5).describe('Maximum number of results to return')
          }),
          execute: async ({ query, contextType, limit }) => {
            const searchResults = await documentationService.searchDocumentation(
              query,
              contextType || suggestedContext,
              limit
            )

            return {
              results: searchResults.map(result => ({
                title: result.title,
                filename: result.filename,
                contextType: result.contextType,
                snippet: result.snippet,
                relevanceScore: result.relevanceScore,
                primaryUrl: result.metadata.primaryUrl,
                description: result.metadata.description,
                keywords: result.metadata.keywords
              })),
              query,
              totalResults: searchResults.length
            }
          }
        }),

        getDocumentByType: tool({
          description: 'Get a specific document by its type (curriculum, pricing, etc.)',
          inputSchema: z.object({
            documentType: z.string().describe('The type of document to retrieve')
          }),
          execute: async ({ documentType }) => {
            const document = await documentationService.getDocumentByType(documentType)

            if (!document) {
              return {
                error: `Document of type '${documentType}' not found`,
                availableTypes: await documentationService.getAvailableDocumentTypes()
              }
            }

            return {
              title: document.title,
              filename: document.filename,
              contextType: document.contextType,
              content: document.content,
              primaryUrl: document.metadata.primaryUrl,
              description: document.metadata.description,
              keywords: document.metadata.keywords,
              wordCount: document.metadata.wordCount
            }
          }
        }),

        getAvailableDocumentTypes: tool({
          description: 'Get all available document types with their descriptions',
          inputSchema: z.object({}),
          execute: async () => {
            return await documentationService.getAvailableDocumentTypes()
          }
        })
      },
      toolChoice: 'auto'
    })

    return result.toUIMessageStreamResponse()

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
    return Response.json({
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
    }, { status: statusCode })
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new Response(null, {
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
    let healthStatus = 'healthy'
    let issues: string[] = []

    // Check if documentation service is available
    const availableTypes = await documentationService.getAvailableDocumentTypes()
    if (availableTypes.length === 0) {
      healthStatus = 'degraded'
      issues.push('Documentation service may not be fully loaded')
    }

    // Check rate limiter
    const activeRequests = rateLimiter.size

    return Response.json({
      status: healthStatus,
      timestamp: new Date().toISOString(),
      requestId,
      service: {
        name: 'Bespoke Academy Chat API',
        version: '2.0.0',
        environment: process.env.NODE_ENV || 'development',
        sdk: 'AI SDK with Groq provider'
      },
      documentation: {
        availableDocuments: availableTypes.length,
        documentTypes: availableTypes.map(t => t.type),
        loaded: availableTypes.length > 0
      },
      rateLimiter: {
        activeRequests,
        configured: true
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

    return Response.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      requestId,
      service: {
        name: 'Bespoke Academy Chat API',
        version: '2.0.0',
        environment: process.env.NODE_ENV || 'development',
        sdk: 'AI SDK with Groq provider'
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