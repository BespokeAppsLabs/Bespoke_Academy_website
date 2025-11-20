/**
 * ChatInterface component for the main chat window
 * Enhanced with documentation display and AI SDK backend
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
import { DocumentationResult } from './documentation-result'
import { MessageCircle, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react'
import type { ChatMessage } from '@/lib/chat'
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
  const [error, setError] = useState<string | null>(null)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [sessionRated, setSessionRated] = useState(false)
  const [input, setInput] = useState('')

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
    scrollToBottom()
  }, [messages, scrollToBottom])

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
📖 Access to our complete documentation

I have access to all of Bespoke Academy's documentation and can search for specific information to help answer your questions accurately.

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
      const chatRequest = {
        message,
        conversationHistory: messages,
        context: { type: detectMessageContext(message) }
      }

      // Send message to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatRequest),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      if (!response.body) {
        throw new Error('No response body received')
      }

      // Process streaming response (AI SDK format)
      await processStreamingResponse(response.body)
      onMessageSent?.(message)

    } catch (error) {
      console.error('Chat error:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
      setIsTyping(false)
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [isLoading, messages, onMessageSent])

  const processStreamingResponse = useCallback(async (stream: ReadableStream<Uint8Array>) => {
    const reader = stream.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let currentAssistantMessage: ChatMessage | null = null

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        buffer += chunk

        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmedLine = line.trim()
          if (!trimmedLine || trimmedLine.startsWith(':')) continue

          if (trimmedLine.startsWith('data: ')) {
            const dataStr = trimmedLine.slice(6)

            if (dataStr === '[DONE]') {
              setIsTyping(false)
              if (currentAssistantMessage) {
                setMessages(prev => [...prev, currentAssistantMessage as ChatMessage])
              }
              return
            }

            try {
              const data = JSON.parse(dataStr)

              // Handle AI SDK streaming format
              if (data.type === 'text-delta') {
                if (!currentAssistantMessage) {
                  currentAssistantMessage = {
                    id: `assistant_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
                    content: data.delta,
                    sender: 'assistant',
                    timestamp: new Date(),
                    metadata: {
                      context: detectMessageContext(messages[messages.length - 1]?.content || '')
                    }
                  }
                } else {
                  currentAssistantMessage.content += data.delta
                }

                // Update the message in real-time
                setMessages(prev => {
                  const filtered = prev.filter(m => m.id !== currentAssistantMessage!.id)
                  return [...filtered, currentAssistantMessage!]
                })
              }

              // Handle tool calls and results
              if (data.type === 'tool-input-start' || data.type === 'tool-input-available' || data.type === 'tool-output-available') {
                // Don't create empty messages for tool events only
                // Store tool data in the current message if it exists, or create a new one
                if (!currentAssistantMessage) {
                  currentAssistantMessage = {
                    id: `assistant_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
                    content: '', // Will be populated if there's actual text response
                    sender: 'assistant',
                    timestamp: new Date(),
                    metadata: {
                      context: detectMessageContext(messages[messages.length - 1]?.content || ''),
                      toolData: data
                    } as any
                  }
                } else {
                  // Add tool data to existing message
                  if (!currentAssistantMessage.metadata) {
                    currentAssistantMessage.metadata = {
                      context: detectMessageContext(messages[messages.length - 1]?.content || '')
                    }
                  }
                  ;(currentAssistantMessage.metadata as any).toolData = data
                }

                // Don't update the UI for tool events alone - wait for actual content or completion
                return
              }

              // Handle completion
              if (data.type === 'finish') {
                setIsTyping(false)
                if (currentAssistantMessage) {
                  // Only add the message if it has content or tool data
                  if (currentAssistantMessage.content || (currentAssistantMessage.metadata as any)?.toolData) {
                    setMessages(prev => [...prev, currentAssistantMessage as ChatMessage])
                  }
                }
                return
              }

            } catch (parseError) {
              console.warn('Failed to parse streaming data:', dataStr, parseError)
            }
          }
        }
      }
    } catch (error) {
      console.error('Stream processing error:', error)
      setError('Connection lost. Please try again.')
      setIsTyping(false)
    } finally {
      reader.releaseLock()
    }
  }, [messages])

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
        "flex flex-col bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden",
        "ring-1 ring-primary/20",
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
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-zinc-900 text-white" role="log" aria-label="Chat messages" aria-live="polite" aria-atomic="false"
         style={{
           backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 252, 214, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 252, 214, 0.03) 0%, transparent 50%)'
         }}>
          <AnimatePresence>
            {messages.map((message) => (
              <div key={message.id}>
                <MessageBubble
                  message={message}
                  showTimestamp={false}
                />

                {/* Display tool results if present in metadata */}
                {(message.metadata as any)?.toolData && (
                  <DocumentationResult
                    toolResult={{ result: (message.metadata as any).toolData.output || (message.metadata as any).toolData }}
                  />
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isTyping && (
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
                  className={cn(
                    "text-xs border-zinc-600 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:border-primary/60",
                    "hover:text-primary transition-all duration-200",
                    "relative overflow-hidden group",
                    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-200",
                    "hover:before:opacity-100"
                  )}
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
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg",
                "bg-red-950/50 border border-red-800/50 text-red-400"
              )}
            >
              <span className="text-sm text-red-400">{error}</span>
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
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg",
                "bg-zinc-800 border border-zinc-700 text-zinc-300"
              )}
            >
              <span className="text-sm text-zinc-300">Was this helpful?</span>
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
        <div className="border-t border-zinc-700 bg-zinc-800/50 p-4 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isLoading}
              placeholder="Type your message..."
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}