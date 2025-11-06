/**
 * ChatInterface component for the main chat window
 */

"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageBubble } from './message-bubble'
import { TypingIndicator } from './typing-indicator'
import { ChatHeader } from './chat-header'
import { ChatInput } from './chat-input'
import { MessageCircle, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react'
import type { ChatRequest, ChatMessage, StreamingChunk } from '@/lib/chat'
import { sendChatMessage } from '@/lib/utils/chat-client'
import { detectMessageContext } from '@/lib/chat'
import { cn } from '@/lib/utils'

interface ChatInterfaceProps {
  embedded?: boolean
  initialMessages?: ChatMessage[]
  className?: string
  onMessageSent?: (message: string) => void
  onClose?: () => void
}

export function ChatInterface({
  embedded = false,
  initialMessages = [],
  className,
  onMessageSent,
  onClose
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [currentResponse, setCurrentResponse] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [sessionRated, setSessionRated] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Enhanced scroll for streaming - use immediate scroll during streaming
  const scrollToBottomImmediate = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' })
  }, [])

  useEffect(() => {
    // Use smooth scroll for new messages, immediate for streaming
    if (currentResponse) {
      scrollToBottomImmediate()
    } else {
      scrollToBottom()
    }
  }, [messages, currentResponse, scrollToBottom, scrollToBottomImmediate])

  // Add welcome message if no messages
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: `Welcome to Bespoke Academy! I'm your AI learning assistant, here to help you succeed in your AI and robotics education journey.

I can assist you with:
🎓 Course information and recommendations
🔧 Technical support and troubleshooting
📚 Learning strategies and study tips
💼 Program details and enrollment guidance

What would you like to explore today?`,
        sender: 'assistant',
        timestamp: new Date(),
        metadata: {
          context: 'general-inquiry'
        }
      }
      setMessages([welcomeMessage])
    }
  }, [])

  const processStreamingResponse = useCallback(async (stream: ReadableStream<Uint8Array>) => {
    const reader = stream.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ''
    let buffer = ''
    let assistantMessageCreated = false
    let completionData: any = null

    // Helper function to create assistant message (only called once)
    const createAssistantMessage = (content: string, metadata?: any) => {
      if (assistantMessageCreated || !content.trim()) {
        return null // Prevent duplicate message creation
      }

      assistantMessageCreated = true
      return {
        id: `assistant_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        content: content.trim(),
        sender: 'assistant' as const,
        timestamp: new Date(),
        metadata: {
          context: detectMessageContext(messages[messages.length - 1]?.content || '').type,
          ...metadata
        }
      }
    }

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Decode the chunk and add to buffer
        const chunk = decoder.decode(value, { stream: true })
        buffer += chunk

        // Process complete SSE messages from buffer
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // Keep the last incomplete line in buffer

        for (const line of lines) {
          const trimmedLine = line.trim()

          // Skip empty lines and comments
          if (!trimmedLine || trimmedLine.startsWith(':')) {
            continue
          }

          if (trimmedLine.startsWith('data: ')) {
            const dataStr = trimmedLine.slice(6)

            // Check for the DONE marker
            if (dataStr === '[DONE]') {
              setIsTyping(false)

              const assistantMessage = createAssistantMessage(fullResponse)
              if (assistantMessage) {
                setMessages(prev => [...prev, assistantMessage])
                setShowQuickActions(false)
              }

              setCurrentResponse('')
              return
            }

            try {
              const data = JSON.parse(dataStr)

              // Tool execution notifications are now handled server-side and not sent to client
              // If any tool-related data unexpectedly reaches here, log it for debugging
              if (data.type === 'tool_execution' || data.type === 'tool_execution_complete') {
                console.warn('🔧 Unexpected tool notification reached client:', data)
                continue
              }

              // Handle content chunks
              if (data.content) {
                fullResponse += data.content
                setCurrentResponse(fullResponse)
              }

              // Handle completion signals (alternative to [DONE])
              if (data.isComplete) {
                setIsTyping(false)
                completionData = data

                const assistantMessage = createAssistantMessage(fullResponse, {
                  model: data.metadata?.model,
                  responseTime: data.metadata?.responseTime
                })

                if (assistantMessage) {
                  setMessages(prev => [...prev, assistantMessage])
                  setShowQuickActions(false)
                }

                setCurrentResponse('')

                if (data.error) {
                  // Handle detailed error information
                  if (data.errorDetails) {
                    setError(`${data.error} (${data.errorDetails.type})`)
                    console.log('Detailed error info:', data.errorDetails)
                  } else {
                    setError(data.error)
                  }
                }
              }
            } catch (parseError) {
              console.warn('Failed to parse SSE data:', dataStr, 'Error:', parseError)
            }
          }
        }
      }
    } catch (error) {
      console.error('Stream processing error:', error)
      setError('Connection lost. Please try again.')
      setIsTyping(false)
      setCurrentResponse('')
    } finally {
      reader.releaseLock()

      // Process any remaining content in buffer (fallback)
      if (fullResponse.trim() && !assistantMessageCreated) {
        const assistantMessage = createAssistantMessage(fullResponse, {
          fallback: true,
          ...completionData?.metadata
        })

        if (assistantMessage) {
          setMessages(prev => [...prev, assistantMessage])
          setShowQuickActions(false)
        }
      }
      setCurrentResponse('')
      setIsTyping(false)
    }
  }, [messages])

  const handleSendMessage = useCallback(async (message: string) => {
    if (isLoading) return

    // Add user message
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      content: message,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setIsTyping(true)
    setError(null)
    setShowQuickActions(false)

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    try {
      // Prepare chat request
      const chatRequest: ChatRequest = {
        message,
        conversationHistory: messages,
        context: detectMessageContext(message)
      }

      // Send message using client-safe function
      const response = await sendChatMessage(chatRequest)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))

        // Enhanced error handling with detailed information
        let errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`

        if (errorData.errorType && errorData.isRetryable !== undefined) {
          console.log('API Error Details:', {
            type: errorData.errorType,
            isRetryable: errorData.isRetryable,
            suggestedAction: errorData.suggestedAction,
            requestId: errorData.requestId,
            responseTime: errorData.responseTime
          })

          // Add retryability information to error message
          if (errorData.isRetryable && errorData.suggestedAction) {
            errorMessage += ` (${errorData.suggestedAction})`
          }
        }

        throw new Error(errorMessage)
      }

      if (!response.body) {
        throw new Error('No response body received')
      }

      await processStreamingResponse(response.body)
      onMessageSent?.(message)

    } catch (error) {
      console.error('Chat error:', error)

      let errorMessage = 'Failed to send message. Please try again.'
      let isRetryable = true

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request was cancelled.'
          isRetryable = false
        } else if (error.message.includes('RATE_LIMIT') || error.message.includes('rate limit')) {
          errorMessage = 'Too many requests. Please wait a moment before trying again.'
          isRetryable = true
        } else if (error.message.includes('NETWORK') || error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network connection failed. Please check your internet connection.'
          isRetryable = true
        } else if (error.message.includes('TIMEOUT') || error.message.includes('timeout')) {
          errorMessage = 'Request timed out. Please try again.'
          isRetryable = true
        } else if (error.message.includes('VALIDATION') || error.message.includes('validation')) {
          errorMessage = 'Invalid request. Please check your message and try again.'
          isRetryable = false
        } else if (error.message.includes('AUTH') || error.message.includes('API key')) {
          errorMessage = 'Service configuration error. Please contact support.'
          isRetryable = false
        } else {
          // Use the error message if it contains more specific information
          errorMessage = error.message
          isRetryable = !error.message.includes('configuration') && !error.message.includes('authentication')
        }
      }

      setError(errorMessage)
      setIsTyping(false)
      setCurrentResponse('')

      // Store retryability for potential future features
      console.log('Error is retryable:', isRetryable)
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [isLoading, messages, processStreamingResponse, onMessageSent])

  const detectMessageContext = (message: string): ChatRequest['context'] => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('course') || lowerMessage.includes('program') || lowerMessage.includes('curriculum')) {
      return { type: 'course-advising' }
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('problem') || lowerMessage.includes('error') ||
        lowerMessage.includes('issue') || lowerMessage.includes('login') || lowerMessage.includes('access')) {
      return { type: 'technical-support' }
    }

    if (lowerMessage.includes('learn') || lowerMessage.includes('study') || lowerMessage.includes('understand') ||
        lowerMessage.includes('explain') || lowerMessage.includes('concept')) {
      return { type: 'learning-assistance' }
    }

    return { type: 'general-inquiry' }
  }

  const handleQuickAction = useCallback((action: string) => {
    handleSendMessage(action)
  }, [handleSendMessage])

  const handleRetry = useCallback(() => {
    setError(null)
    if (messages.length > 0) {
      const lastUserMessage = messages.findLast(m => m.sender === 'user')
      if (lastUserMessage) {
        handleSendMessage(lastUserMessage.content)
      }
    }
  }, [messages, handleSendMessage])

  const handleRating = useCallback((rating: 'positive' | 'negative') => {
    setSessionRated(true)
    // Here you would typically send this rating to your analytics service
    console.log('Chat session rated:', rating)
  }, [])

  const clearChat = useCallback(() => {
    setMessages([])
    setCurrentResponse('')
    setError(null)
    setShowQuickActions(true)
    setSessionRated(false)
  }, [])

  const quickActions = [
    "Tell me about your courses",
    "I need technical help",
    "How do I enroll?",
    "What will I learn?"
  ]

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  }

  const sizeClasses = embedded
    ? "w-full h-[600px]"
    : "w-[400px] h-[600px] sm:w-[450px] sm:h-[650px]"

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.2 }}
      className={cn(
        "flex flex-col bg-background border border-border rounded-lg shadow-lg overflow-hidden",
        sizeClasses,
        className
      )}
    >
      {/* Header */}
      <ChatHeader
        title={embedded ? "Ask a Question" : "Bespoke Academy Assistant"}
        subtitle={embedded ? undefined : "How can I help you today?"}
        onClose={onClose}
      />

      {/* Messages */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" role="log" aria-label="Chat messages" aria-live="polite" aria-atomic="false">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                showTimestamp={false}
              />
            ))}

            {/* Current streaming response */}
            {currentResponse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 max-w-full"
                role="status"
                aria-live="polite"
                aria-label="AI assistant is responding"
              >
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-surface text-surface-foreground">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="rounded-lg bg-muted text-muted-foreground px-4 py-2 rounded-bl-sm max-w-[400px] sm:max-w-[500px] lg:max-w-[600px]">
                    <div className="flex items-start gap-2">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words flex-1">
                        {currentResponse}
                      </p>
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-4 bg-muted-foreground rounded-full mt-0.5"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Typing indicator */}
            {isTyping && !currentResponse && (
              <div role="status" aria-live="polite" aria-label="AI assistant is typing">
                <TypingIndicator />
              </div>
            )}
          </AnimatePresence>

          {/* Quick actions */}
          {showQuickActions && messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2"
            >
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action)}
                  className="text-xs"
                >
                  {action}
                </Button>
              ))}
            </motion.div>
          )}

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
            >
              <span className="text-sm text-destructive">{error}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="ml-auto"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </motion.div>
          )}

          {/* Rating prompt */}
          {!sessionRated && messages.length > 3 && !showQuickActions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-muted rounded-lg"
            >
              <span className="text-sm text-muted-foreground">Was this helpful?</span>
              <div className="flex gap-1 ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRating('positive')}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRating('negative')}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isLoading}
            placeholder="Type your message..."
          />
        </div>
      </div>
    </motion.div>
  )
}