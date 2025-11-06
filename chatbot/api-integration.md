# Groq API Integration Documentation

## Overview

This document details the integration of Groq API for the Bespoke Academy chatbot, providing high-performance AI responses using OpenAI-compatible endpoints.

## API Configuration

### Required Environment Variables

```bash
# Groq API Configuration
GROQ_API_KEY=gsk_your_api_key_here
CHATBOT_MODEL=llama3-8b-8192
GROQ_BASE_URL=https://api.groq.com/openai/v1

# Optional Configuration
GROQ_MAX_TOKENS=1000
GROQ_TEMPERATURE=0.7
GROQ_TIMEOUT=30000
```

### API Client Setup

```typescript
// src/lib/groq.ts
import OpenAI from 'openai'

export class GroqClient {
  private client: OpenAI

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
      timeout: parseInt(process.env.GROQ_TIMEOUT || '30000'),
    })
  }

  async chatCompletion(params: ChatCompletionParams) {
    return this.client.chat.completions.create(params)
  }
}

export const groqClient = new GroqClient()
```

## Available Models

### Recommended Models

| Model | Context Window | Speed | Best For |
|-------|----------------|-------|-----------|
| `llama3-8b-8192` | 8192 tokens | Very Fast | General conversations, quick responses |
| `llama3-70b-8192` | 8192 tokens | Fast | Complex queries, detailed explanations |
| `gemma2-9b-it` | 8192 tokens | Fast | Educational content, structured responses |

### Model Selection Strategy

```typescript
function selectModel(userIntent: string, complexity: 'simple' | 'complex' = 'simple') {
  switch (complexity) {
    case 'simple':
      return 'llama3-8b-8192' // Fast responses for basic questions
    case 'complex':
      return 'llama3-70b-8192' // Detailed responses for complex topics
    default:
      return 'llama3-8b-8192'
  }
}
```

## API Endpoint Implementation

### Chat API Route

```typescript
// app/api/chat/route.ts
import { groqClient } from '@/lib/groq'
import { ChatCompletionMessageParam } from 'openai/resources'

export async function POST(request: Request) {
  try {
    const { message, conversationHistory, context } = await request.json()

    // Build system message based on context
    const systemMessage = buildSystemMessage(context)

    // Prepare conversation history
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemMessage },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    // Create streaming response
    const stream = await groqClient.chatCompletion({
      model: process.env.CHATBOT_MODEL || 'llama3-8b-8192',
      messages,
      max_tokens: parseInt(process.env.GROQ_MAX_TOKENS || '1000'),
      temperature: parseFloat(process.env.GROQ_TEMPERATURE || '0.7'),
      stream: true,
    })

    return new Response(
      new ReadableStream({
        async start(controller) {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content
            if (content) {
              controller.enqueue(`data: ${JSON.stringify({ content })}\n\n`)
            }
          }
          controller.close()
        }
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        }
      }
    )
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process message' }),
      { status: 500 }
    )
  }
}
```

### System Message Builder

```typescript
function buildSystemMessage(context: string): string {
  const basePrompt = `You are a professional educational assistant for Bespoke Academy, an institution specializing in AI and robotics education for students ages 13-17.

Your role is to:
1. Provide accurate, helpful information about our programs
2. Assist with technical support and troubleshooting
3. Offer educational guidance and study tips
4. Maintain a professional, encouraging, and knowledgeable tone

Key information about Bespoke Academy:
- 40-week AI Robotics Curriculum for grades 8-11
- No prior experience required - perfect for complete beginners
- Hands-on learning with AI tools and real projects
- Meets weekly on Fridays for 2+ hours
- Four phases: Digital Foundations, Electronics & Robotics, AI Concepts, Integrated Projects

Always be helpful, accurate, and focused on the student's learning journey. If you don't know something, admit it and suggest alternative resources.`

  const contextPrompts = {
    'course-advising': `
Focus on course information, prerequisites, and recommendations.
Highlight our beginner-friendly approach and hands-on learning methodology.`,

    'technical-support': `
Provide step-by-step troubleshooting assistance.
If the issue requires human intervention, guide them to contact support.`,

    'general-inquiry': `
Be informative about the academy while being conversational.
Ask clarifying questions to better understand their needs.`,

    'learning-assistance': `
Offer educational support and study tips.
Encourage curiosity and confidence in learning technical topics.`
  }

  return basePrompt + (contextPrompts[context as keyof typeof contextPrompts] || '')
}
```

## Client-Side Integration

### Chat Service

```typescript
// src/lib/chat.ts
export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
  metadata?: {
    context?: string
    confidence?: number
  }
}

export class ChatService {
  private static instance: ChatService

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService()
    }
    return ChatService.instance
  }

  async sendMessage(
    message: string,
    conversationHistory: ChatMessage[],
    context: string = 'general-inquiry'
  ): Promise<ReadableStream> {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory,
        context,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }

    return response.body!
  }
}
```

### Streaming Response Handler

```typescript
// Hook for handling streaming responses
export function useStreamingResponse() {
  const [response, setResponse] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processStream = async (stream: ReadableStream) => {
    const reader = stream.getReader()
    const decoder = new TextDecoder()

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.content) {
                setResponse(prev => prev + data.content)
              }
            } catch (parseError) {
              console.warn('Failed to parse chunk:', line)
            }
          }
        }
      }
      setIsComplete(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      reader.releaseLock()
    }
  }

  return { response, isComplete, error, processStream }
}
```

## Error Handling & Resilience

### Retry Logic

```typescript
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      if (attempt === maxRetries) throw error

      // Exponential backoff
      await new Promise(resolve =>
        setTimeout(resolve, delay * Math.pow(2, attempt - 1))
      )
    }
  }

  throw new Error('Max retries exceeded')
}
```

### Fallback Responses

```typescript
const fallbackResponses = {
  'network-error': 'I\'m having trouble connecting right now. Please try again in a moment.',
  'api-error': 'I\'m experiencing technical difficulties. Please contact support@bespokeacademy.com for immediate assistance.',
  'timeout': 'The response is taking longer than expected. Let me try that again.',
  'rate-limit': 'I\'ve received too many requests. Please wait a moment before asking another question.',
  'invalid-request': 'I didn\'t understand that. Could you please rephrase your question?'
}

function getFallbackResponse(errorType: string): string {
  return fallbackResponses[errorType as keyof typeof fallbackResponses] ||
         fallbackResponses['api-error']
}
```

## Performance Optimization

### Request Optimization

```typescript
// Optimize conversation history to stay within token limits
function optimizeConversationHistory(
  history: ChatMessage[],
  maxTokens: number = 4000
): ChatMessage[] {
  // Keep recent messages and important context
  const optimized = [...history]

  // Remove very old messages if history is too long
  while (getTokenCount(optimized) > maxTokens && optimized.length > 2) {
    // Remove the third oldest message (keep system and first user message)
    optimized.splice(2, 1)
  }

  return optimized
}

// Simple token estimation (rough approximation)
function getTokenCount(messages: ChatMessage[]): number {
  return messages.reduce((total, msg) =>
    total + Math.ceil(msg.content.length / 4), 0
  )
}
```

### Caching Strategy

```typescript
// Simple in-memory cache for common responses
const responseCache = new Map<string, string>()

function getCachedResponse(prompt: string): string | null {
  const key = prompt.toLowerCase().trim()
  return responseCache.get(key) || null
}

function setCachedResponse(prompt: string, response: string): void {
  const key = prompt.toLowerCase().trim()
  responseCache.set(key, response)

  // Limit cache size
  if (responseCache.size > 100) {
    const firstKey = responseCache.keys().next().value
    responseCache.delete(firstKey)
  }
}
```

## Security Considerations

### Input Validation

```typescript
function validateUserInput(input: string): { isValid: boolean; sanitized?: string; error?: string } {
  // Check for empty input
  if (!input || input.trim().length === 0) {
    return { isValid: false, error: 'Message cannot be empty' }
  }

  // Check length limits
  if (input.length > 2000) {
    return { isValid: false, error: 'Message is too long (max 2000 characters)' }
  }

  // Basic sanitization
  const sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')

  return { isValid: true, sanitized }
}
```

### Rate Limiting

```typescript
// Simple in-memory rate limiter
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
```

## Monitoring & Analytics

### Request Logging

```typescript
function logChatRequest(data: {
  message: string
  context: string
  responseTime: number
  success: boolean
  error?: string
}) {
  // Log to monitoring service
  console.log('Chat Request:', {
    timestamp: new Date().toISOString(),
    messageLength: data.message.length,
    context: data.context,
    responseTime: data.responseTime,
    success: data.success,
    error: data.error
  })
}
```

### Performance Metrics

```typescript
// Track key performance indicators
const metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  averageResponseTime: 0,
  errorsByType: {} as Record<string, number>
}

function updateMetrics(responseTime: number, success: boolean, errorType?: string) {
  metrics.totalRequests++

  if (success) {
    metrics.successfulRequests++
    metrics.averageResponseTime =
      (metrics.averageResponseTime + responseTime) / 2
  } else if (errorType) {
    metrics.errorsByType[errorType] = (metrics.errorsByType[errorType] || 0) + 1
  }
}
```

## Testing

### Unit Tests

```typescript
// Mock Groq client for testing
export const mockGroqClient = {
  chatCompletion: jest.fn().mockResolvedValue({
    choices: [{
      delta: { content: 'Test response' }
    }]
  })
}

// Test API endpoint
describe('/api/chat', () => {
  it('should process chat messages successfully', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello',
        conversationHistory: [],
        context: 'general-inquiry'
      })
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('text/event-stream')
  })
})
```

### Integration Tests

```typescript
// Test streaming response
describe('Chat Streaming', () => {
  it('should stream responses correctly', async () => {
    const chatService = ChatService.getInstance()
    const stream = await chatService.sendMessage(
      'Test message',
      [],
      'general-inquiry'
    )

    const chunks = []
    const reader = stream.getReader()

    const result = await reader.read()
    expect(result.done).toBe(false)

    reader.releaseLock()
  })
})
```

---

**Last Updated**: 2025-10-26
**API Integration Version**: 1.0.0