/**
 * Client-side chat utilities
 *
 * These utilities are safe to use in client-side code and don't require server-only environment variables.
 * All actual API calls should go through the API route, not direct client-side calls.
 */

import type { ChatRequest, ChatResponse } from '@/lib/chat'
import { getClientGroqConfig, isBrowser } from '@/config/groq.client'

/**
 * Send a chat message through the API route (client-safe)
 */
export async function sendChatMessage(request: ChatRequest): Promise<Response> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
  }

  return response
}

/**
 * Send a non-streaming chat message through the API route
 */
export async function sendNonStreamingChatMessage(request: ChatRequest): Promise<ChatResponse> {
  const response = await sendChatMessage(request)

  if (!response.body) {
    throw new Error('No response body received')
  }

  // For now, we'll convert the streaming response to a non-streaming one
  // In a real implementation, you might want a separate non-streaming endpoint
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let fullContent = ''
  let isComplete = false
  let metadata: any = {}

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6)
          if (dataStr === '[DONE]') {
            isComplete = true
            break
          }

          try {
            const data = JSON.parse(dataStr)
            if (data.content) {
              fullContent += data.content
            }
            if (data.isComplete && data.metadata) {
              metadata = data.metadata
              isComplete = true
            }
          } catch (parseError) {
            // Ignore parsing errors for individual chunks
          }
        }
      }

      if (isComplete) break
    }
  } finally {
    reader.releaseLock()
  }

  return {
    content: fullContent,
    isComplete,
    metadata
  }
}

/**
 * Test the API connection (client-safe)
 */
export async function testChatConnection(): Promise<{ connected: boolean; error?: string }> {
  try {
    const response = await fetch('/api/chat', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      return { connected: data.status === 'healthy' }
    } else {
      return { connected: false, error: `HTTP ${response.status}` }
    }
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Get available models through the API (client-safe)
 */
export async function getAvailableModels(): Promise<string[]> {
  try {
    const response = await fetch('/api/chat', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data.groq?.availableModels || []
    }
    return []
  } catch (error) {
    console.error('Failed to fetch models:', error)
    return []
  }
}

/**
 * Get client configuration summary
 */
export function getClientGroqConfigSummary() {
  return getClientGroqConfig()
}

/**
 * Create a simple error handler for client-side chat errors
 */
export function handleChatError(error: unknown): { message: string; isRetryable: boolean } {
  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('rate limit')) {
      return {
        message: 'Too many requests. Please wait a moment before trying again.',
        isRetryable: true
      }
    }

    if (error.message.includes('network') || error.message.includes('fetch')) {
      return {
        message: 'Network connection failed. Please check your internet connection.',
        isRetryable: true
      }
    }

    if (error.message.includes('timeout')) {
      return {
        message: 'Request timed out. Please try again.',
        isRetryable: true
      }
    }

    if (error.message.includes('validation')) {
      return {
        message: 'Invalid request. Please check your message and try again.',
        isRetryable: false
      }
    }

    // Return the original error message for other cases
    return {
      message: error.message,
      isRetryable: !error.message.includes('configuration') && !error.message.includes('authentication')
    }
  }

  return {
    message: 'An unexpected error occurred. Please try again.',
    isRetryable: true
  }
}