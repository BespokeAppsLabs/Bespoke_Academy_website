/**
 * Chat components exports for Bespoke Academy
 */

export { ChatWidget } from './chat-widget'
export { ChatInterface } from './chat-interface'
export { MessageBubble } from './message-bubble'
export { ChatInput } from './chat-input'
export { ChatHeader } from './chat-header'
export { TypingIndicator } from './typing-indicator'

// Types and utilities
export type {
  ChatMessage,
  ChatState,
  ChatContext,
  ChatConfig,
  ChatRequest,
  ChatResponse,
  StreamingChunk,
  ChatSession,
  ChatAnalytics,
  ChatWidgetState,
  ChatError
} from '@/lib/chat'

// Client-safe Groq utilities (these work in the browser)
export {
  sendChatMessage,
  sendNonStreamingChatMessage,
  testChatConnection,
  getAvailableModels,
  getClientGroqConfigSummary,
  handleChatError
} from '@/lib/utils/chat-client'

// Server-side only exports (for API routes and server components)
// These should only be imported in server-side code
export type { GroqClient } from '@/lib/groq'

export {
  createUserMessage,
  createAssistantMessage,
  generateMessageId,
  generateSessionId,
  detectMessageContext,
  buildSystemMessage,
  isValidMessage,
  isValidChatContext,
  createChatConfig,
  saveToLocalStorage,
  loadFromLocalStorage,
  cleanMessageHistory
} from '@/lib/chat'

export { useChatWidget } from './chat-widget'