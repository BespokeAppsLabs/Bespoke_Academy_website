/**
 * TypingIndicator component for showing when the assistant is typing
 */

"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TypingIndicatorProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function TypingIndicator({ className, size = 'md' }: TypingIndicatorProps) {
  const dotSize = {
    sm: 'h-1 w-1',
    md: 'h-1.5 w-1.5',
    lg: 'h-2 w-2'
  }[size]

  const containerSize = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3'
  }[size]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "flex items-center",
        containerSize,
        className
      )}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-surface text-surface-foreground">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      </div>

      <div className="flex items-center gap-1">
        <div className="flex gap-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={cn(
                "rounded-full bg-muted-foreground",
                dotSize
              )}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <span className="text-sm text-muted-foreground">AI is typing</span>
      </div>
    </motion.div>
  )
}