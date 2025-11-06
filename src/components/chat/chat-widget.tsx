/**
 * ChatWidget component for the floating chat bubble
 */

"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatInterface } from './chat-interface'
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ChatMessage, ChatWidgetState } from '@/lib/chat'
import { STORAGE_KEYS, loadFromLocalStorage, saveToLocalStorage } from '@/lib/chat'

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  autoOpen?: boolean
  className?: string
}

export function ChatWidget({
  position = 'bottom-right',
  autoOpen = false,
  className
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const chatRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<string>('')

  // Load widget state from localStorage
  useEffect(() => {
    const savedState = loadFromLocalStorage<Partial<ChatWidgetState>>(
      STORAGE_KEYS.CHAT_WIDGET_STATE,
      {}
    )

    // Restore state
    if (savedState.isOpen !== undefined) {
      setIsOpen(savedState.isOpen)
    }
    if (savedState.isMinimized !== undefined) {
      setIsMinimized(savedState.isMinimized)
    }
    if (savedState.notificationCount !== undefined) {
      setUnreadCount(savedState.notificationCount)
    }

    // Load message history
    const savedMessages = loadFromLocalStorage<ChatMessage[]>(
      STORAGE_KEYS.CHAT_HISTORY,
      []
    )
    setMessages(savedMessages)

    // Auto-open if enabled
    if (autoOpen && !savedState.isOpen) {
      setTimeout(() => setIsOpen(true), 2000)
    }
  }, [autoOpen])

  // Save widget state to localStorage
  useEffect(() => {
    const state: Partial<ChatWidgetState> = {
      isOpen,
      isMinimized,
      notificationCount: unreadCount,
      position
    }

    saveToLocalStorage(STORAGE_KEYS.CHAT_WIDGET_STATE, state)
  }, [isOpen, isMinimized, unreadCount, position])

  // Save messages to localStorage
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.CHAT_HISTORY, messages)
  }, [messages])

  // Handle message notifications
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]

      // If chat is closed/minimized and new assistant message arrives, increment unread count
      if ((!isOpen || isMinimized) && lastMessage.sender === 'assistant') {
        if (lastMessage.id !== lastMessageRef.current) {
          setUnreadCount(prev => prev + 1)
          lastMessageRef.current = lastMessage.id
        }
      } else if (isOpen && !isMinimized) {
        // Reset unread count when chat is open and not minimized
        setUnreadCount(0)
      }
    }
  }, [messages, isOpen, isMinimized])

  // Handle visibility on scroll (optional)
  useEffect(() => {
    const handleScroll = () => {
      if (chatRef.current) {
        const rect = chatRef.current.getBoundingClientRect()
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
        setIsVisible(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleToggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setUnreadCount(0)
    }
  }

  const handleCloseChat = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  const handleMinimizeChat = () => {
    setIsMinimized(!isMinimized)
  }

  const handleMessageSent = (message: string) => {
    // Update last message ref to prevent notification for user's own message triggering
    lastMessageRef.current = `user_${Date.now()}`
  }

  const handleMessagesUpdate = (newMessages: ChatMessage[]) => {
    setMessages(newMessages)
  }

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  }[position]

  // Floating bubble animations
  const bubbleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  }

  return (
    <div
      ref={chatRef}
      className={cn(
        "fixed z-50",
        positionClasses,
        className
      )}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "mb-4",
              position.includes('bottom') ? "mb-4" : "mt-4"
            )}
          >
            <ChatInterface
              initialMessages={messages}
              onClose={handleCloseChat}
              onMessageSent={handleMessageSent}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating chat bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            variants={bubbleVariants}
            initial="hidden"
            animate={unreadCount > 0 ? "pulse" : "visible"}
            exit="hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleToggleChat}
              size="lg"
              className={cn(
                "relative h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow",
                "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              aria-label="Open chat"
            >
              <MessageCircle className="h-6 w-6" />

              {/* Unread count badge */}
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold animate-bounce"
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Badge>
              )}

              {/* Pulsing ring effect for new messages */}
              {unreadCount > 0 && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.7, 0, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized state (if needed in future) */}
      <AnimatePresence>
        {isMinimized && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex items-center gap-2 bg-background border border-border rounded-lg shadow-lg px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">Chat is active</span>
            </div>

            <div className="flex items-center gap-1 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMinimizeChat}
                className="h-6 w-6 p-0"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseChat}
                className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Hook for programmatic chat control
export function useChatWidget() {
  const [widgetState, setWidgetState] = useState<{
    isOpen: boolean
    unreadCount: number
  }>({
    isOpen: false,
    unreadCount: 0
  })

  const openChat = () => {
    // This would trigger the chat to open
    const event = new CustomEvent('open-chat')
    window.dispatchEvent(event)
  }

  const closeChat = () => {
    const event = new CustomEvent('close-chat')
    window.dispatchEvent(event)
  }

  const sendMessage = (message: string) => {
    const event = new CustomEvent('send-chat-message', { detail: message })
    window.dispatchEvent(event)
  }

  return {
    ...widgetState,
    openChat,
    closeChat,
    sendMessage
  }
}