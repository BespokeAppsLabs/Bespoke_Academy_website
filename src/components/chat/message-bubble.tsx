/**
 * MessageBubble component for displaying individual chat messages
 */

"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/lib/chat'

interface MessageBubbleProps {
  message: ChatMessage
  showAvatar?: boolean
  showTimestamp?: boolean
  className?: string
}

export function MessageBubble({
  message,
  showAvatar = true,
  showTimestamp = false,
  className
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy message:', error)
    }
  }

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date)
  }

  const isUser = message.sender === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group flex gap-3 max-w-full",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
      role="article"
      aria-label={`${isUser ? 'You' : 'AI Assistant'}: ${message.content.substring(0, 50)}${message.content.length > 50 ? '...' : ''}`}
    >
      {/* Avatar */}
      {showAvatar && (
        <div className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-surface text-surface-foreground"
        )}>
          {isUser ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          )}
        </div>
      )}

      {/* Message Content */}
      <div className={cn(
        "flex flex-col gap-1",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "relative rounded-lg px-4 py-2 max-w-[400px] sm:max-w-[500px] lg:max-w-[600px]",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-muted-foreground rounded-bl-sm"
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>

          {/* Copy button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            aria-label={copied ? "Copied to clipboard" : "Copy message to clipboard"}
            className={cn(
              "absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100",
              isUser
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground hover:bg-muted/90"
            )}
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>

        {/* Timestamp and metadata */}
        {(showTimestamp || message.metadata) && (
          <div className={cn(
            "flex items-center gap-2 text-xs text-muted-foreground",
            isUser ? "flex-row-reverse" : "flex-row"
          )}>
            {showTimestamp && (
              <span>{formatTimestamp(message.timestamp)}</span>
            )}

            {message.metadata?.model && (
              <span className="text-xs opacity-70">
                {message.metadata.model}
              </span>
            )}

            {message.metadata?.responseTime && (
              <span className="text-xs opacity-70">
                {message.metadata.responseTime}ms
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}