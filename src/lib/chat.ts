/**
 * Chat system types and utilities for Bespoke Academy chatbot
 */

import { BASE_PROMPT, CONTEXT_PROMPTS } from './prompts'

export interface ToolCall {
  id: string
  type: 'function'
  function: {
    name: string
    arguments: string
  }
}

export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'assistant' | 'tool'
  timestamp: Date
  metadata?: {
    context?: string
    confidence?: number
    sources?: string[]
    model?: string
    responseTime?: number
  }
  toolCalls?: ToolCall[]
  toolCallId?: string
}

export interface ChatState {
  messages: ChatMessage[]
  isConnected: boolean
  isTyping: boolean
  unreadCount: number
  context: ChatContext
  error: string | null
}

export interface ChatContext {
  type: 'course-advising' | 'technical-support' | 'general-inquiry' | 'learning-assistance'
  currentPage?: string
  userRole?: 'prospect' | 'student' | 'parent' | 'educator'
  previousTopics?: string[]
}

export interface ChatConfig {
  model: string
  maxTokens: number
  temperature: number
  systemMessage: string
  enableStreaming: boolean
  timeoutMs: number
}

export interface ChatRequest {
  message: string
  conversationHistory: ChatMessage[]
  context: ChatContext
  config?: Partial<ChatConfig>
}

export interface ChatResponse {
  content: string
  isComplete: boolean
  metadata?: {
    model: string
    tokensUsed: number
    responseTime: number
    requestId?: string
  }
}

export interface StreamingChunk {
  content: string
  isComplete: boolean
}

export interface ChatSession {
  id: string
  startTime: Date
  messages: ChatMessage[]
  context: ChatContext
  endTime?: Date
  rating?: number
  feedback?: string
}

export interface ChatAnalytics {
  sessionId: string
  messageCount: number
  averageResponseTime: number
  userSatisfaction?: number
  topicDistribution: Record<string, number>
  errorCount: number
}

export interface ChatWidgetState {
  isOpen: boolean
  isMinimized: boolean
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  notificationCount: number
}

// Type guards and validation functions
export function isValidMessage(message: any): message is ChatMessage {
  return (
    message &&
    typeof message.id === 'string' &&
    typeof message.content === 'string' &&
    (message.sender === 'user' || message.sender === 'assistant') &&
    message.timestamp instanceof Date
  )
}

export function isValidChatContext(context: any): context is ChatContext {
  return (
    context &&
    typeof context === 'object' &&
    ['course-advising', 'technical-support', 'general-inquiry', 'learning-assistance'].includes(context.type)
  )
}

// Chat configuration factory (now imports from centralized config)
export function createChatConfig(overrides: Partial<ChatConfig> = {}): ChatConfig {
  // Import here to avoid circular dependencies
  const { getGroqConfig } = require('@/config')
  const groqConfig = getGroqConfig()

  return {
    model: groqConfig.model,
    maxTokens: groqConfig.maxTokens,
    temperature: groqConfig.temperature,
    systemMessage: '',
    enableStreaming: groqConfig.enableStreaming,
    timeoutMs: groqConfig.timeout,
    ...overrides
  }
}

// Message creation utilities
export function createUserMessage(content: string, context?: ChatContext): ChatMessage {
  return {
    id: generateMessageId(),
    content,
    sender: 'user',
    timestamp: new Date(),
    metadata: {
      context: context?.type
    }
  }
}

export function createAssistantMessage(
  content: string,
  metadata?: ChatMessage['metadata']
): ChatMessage {
  return {
    id: generateMessageId(),
    content,
    sender: 'assistant',
    timestamp: new Date(),
    metadata
  }
}

// ID generation utility
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Message formatting utilities
export function formatMessageForAPI(message: ChatMessage): {
  role: 'user' | 'assistant'
  content: string
} {
  // Filter out tool messages from API calls
  if (message.sender === 'tool') {
    throw new Error('Tool messages should not be sent to the API')
  }

  return {
    role: message.sender,
    content: message.content
  }
}

export function truncateMessage(content: string, maxLength: number = 500): string {
  if (content.length <= maxLength) return content
  return content.substring(0, maxLength - 3) + '...'
}

// Context detection utilities
export function detectMessageContext(message: string): ChatContext['type'] {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('course') || lowerMessage.includes('program') || lowerMessage.includes('curriculum')) {
    return 'course-advising'
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('problem') || lowerMessage.includes('error') ||
      lowerMessage.includes('issue') || lowerMessage.includes('login') || lowerMessage.includes('access')) {
    return 'technical-support'
  }

  if (lowerMessage.includes('learn') || lowerMessage.includes('study') || lowerMessage.includes('understand') ||
      lowerMessage.includes('explain') || lowerMessage.includes('concept')) {
    return 'learning-assistance'
  }

  return 'general-inquiry'
}

// System message builder
export function buildSystemMessage(context: ChatContext): string {
  return BASE_PROMPT + (CONTEXT_PROMPTS[context.type] || '')
}

// Enhanced error handling types (compatible with new GroqError system)
export interface ChatError {
  type: 'network' | 'api' | 'validation' | 'timeout' | 'rate-limit' | 'configuration' | 'content-filtered'
  message: string
  code?: string
  retryable: boolean
  severity?: 'low' | 'medium' | 'high' | 'critical'
  suggestedAction?: string
  userFriendlyMessage?: string
}

export function createChatError(
  type: ChatError['type'],
  message: string,
  code?: string,
  severity: ChatError['severity'] = 'medium',
  suggestedAction?: string
): ChatError {
  const retryableErrors = ['network', 'timeout', 'api', 'rate-limit']

  return {
    type,
    message,
    code,
    retryable: retryableErrors.includes(type),
    severity,
    suggestedAction,
    userFriendlyMessage: message
  }
}

/**
 * Convert a GroqApiError to a ChatError for backward compatibility
 */
export function groqErrorToChatError(groqError: any): ChatError {
  return {
    type: mapGroqErrorTypeToChatErrorType(groqError.type),
    message: groqError.message,
    code: groqError.type,
    retryable: groqError.isRetryable,
    severity: groqError.severity,
    suggestedAction: groqError.suggestedAction,
    userFriendlyMessage: groqError.userFriendlyMessage
  }
}

function mapGroqErrorTypeToChatErrorType(groqErrorType: string): ChatError['type'] {
  if (groqErrorType.includes('RATE_LIMIT')) return 'rate-limit'
  if (groqErrorType.includes('TIMEOUT')) return 'timeout'
  if (groqErrorType.includes('NETWORK') || groqErrorType.includes('CONNECTION')) return 'network'
  if (groqErrorType.includes('VALIDATION') || groqErrorType.includes('CONTENT_TOO_LONG')) return 'validation'
  if (groqErrorType.includes('CONFIGURATION')) return 'configuration'
  if (groqErrorType.includes('CONTENT_FILTERED')) return 'content-filtered'
  return 'api'
}

// Conversation analysis utilities
export function analyzeConversation(messages: ChatMessage[]): {
  messageCount: number
  userMessageCount: number
  assistantMessageCount: number
  averageMessageLength: number
  topics: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
} {
  const userMessages = messages.filter(m => m.sender === 'user')
  const assistantMessages = messages.filter(m => m.sender === 'assistant')

  const totalLength = messages.reduce((sum, m) => sum + m.content.length, 0)
  const averageLength = messages.length > 0 ? totalLength / messages.length : 0

  // Simple topic extraction (would be enhanced with NLP in production)
  const topics = Array.from(new Set(
    messages
      .map(m => m.content.toLowerCase())
      .join(' ')
      .split(/\W+/)
      .filter(word => word.length > 5)
      .slice(0, 10)
  ))

  // Simple sentiment analysis (would be enhanced with sentiment analysis in production)
  const positiveWords = ['good', 'great', 'helpful', 'thanks', 'excellent', 'amazing']
  const negativeWords = ['bad', 'terrible', 'useless', 'frustrated', 'confused', 'angry']

  const allText = messages.map(m => m.content.toLowerCase()).join(' ')
  const positiveCount = positiveWords.filter(word => allText.includes(word)).length
  const negativeCount = negativeWords.filter(word => allText.includes(word)).length

  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral'
  if (positiveCount > negativeCount) sentiment = 'positive'
  else if (negativeCount > positiveCount) sentiment = 'negative'

  return {
    messageCount: messages.length,
    userMessageCount: userMessages.length,
    assistantMessageCount: assistantMessages.length,
    averageMessageLength: averageLength,
    topics,
    sentiment
  }
}

// Storage utilities for localStorage
export const STORAGE_KEYS = {
  CHAT_SESSION: 'bespoke_chat_session',
  CHAT_HISTORY: 'bespoke_chat_history',
  CHAT_PREFERENCES: 'bespoke_chat_preferences',
  CHAT_WIDGET_STATE: 'bespoke_chat_widget_state'
}

export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error)
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn(`Failed to load ${key} from localStorage:`, error)
    return defaultValue
  }
}

// Utility for cleaning old messages
export function cleanMessageHistory(messages: ChatMessage[], maxMessages: number = 50): ChatMessage[] {
  if (messages.length <= maxMessages) return messages

  // Keep the first message (usually system message) and the most recent messages
  const firstMessage = messages[0]
  const recentMessages = messages.slice(-(maxMessages - 1))

  return firstMessage ? [firstMessage, ...recentMessages] : recentMessages
}