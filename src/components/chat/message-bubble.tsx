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
      const content = message.content || ''
      await navigator.clipboard.writeText(content)
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
      aria-label={`${isUser ? 'You' : 'AI Assistant'}: ${(message.content || '').substring(0, 50)}${(message.content || '').length > 50 ? '...' : ''}`}
    >
      {/* Avatar */}
      {showAvatar && (
        <div className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border",
          isUser
            ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-400/50 shadow-md shadow-emerald-500/25"
            : "bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-400/40 shadow-md"
        )}>
          {isUser ? (
            <svg className="h-4 w-4 fill-white stroke-emerald-300" strokeWidth="0.5" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-4 w-4 stroke-emerald-400 fill-emerald-400/10" strokeWidth="1.5" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" fill="none" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" fill="none" />
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
          "relative rounded-lg px-4 py-2 max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] border shadow-md",
          "overflow-hidden",
          isUser
            ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-br-sm border-emerald-400/60 shadow-lg shadow-emerald-500/30"
            : "bg-zinc-800 text-zinc-100 rounded-bl-sm border-zinc-700",
          !isUser && "before:absolute before:inset-0 before:bg-gradient-to-br before:from-emerald-500/8 before:via-emerald-500/4 before:to-transparent before:pointer-events-none"
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content || ''}
          </p>

          {/* Copy button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            aria-label={copied ? "Copied to clipboard" : "Copy message to clipboard"}
            className={cn(
              "absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100",
              "border shadow-md hover:shadow-lg transition-all duration-200",
              isUser
                ? "bg-white/90 text-emerald-600 hover:bg-white hover:scale-110 border-emerald-400/60 hover:border-emerald-400"
                : "bg-zinc-700 text-zinc-100 hover:bg-gradient-to-br hover:from-emerald-500/90 hover:to-emerald-600/90 hover:text-white hover:border-emerald-400 hover:scale-110 border-zinc-600"
            )}
          >
            {copied ? (
              <Check className="h-3 w-3 stroke-current fill-current" />
            ) : (
              <Copy className="h-3 w-3 stroke-current fill-current" />
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