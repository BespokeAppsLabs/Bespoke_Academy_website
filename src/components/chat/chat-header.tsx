/**
 * ChatHeader component for the chat interface
 */

"use client"

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Minimize2, Maximize2, X, MessageCircle, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatHeaderProps {
  title?: string
  subtitle?: string
  isMinimized?: boolean
  onToggleMinimize?: () => void
  onClose?: () => void
  showControls?: boolean
  className?: string
}

export function ChatHeader({
  title = "Bespoke Academy Assistant",
  subtitle = "How can I help you today?",
  isMinimized = false,
  onToggleMinimize,
  onClose,
  showControls = true,
  className
}: ChatHeaderProps) {
  return (
    <div className={cn(
      "flex items-center justify-between border-b border-border bg-card px-4 py-3",
      className
    )}>
      {/* Left side - Title and status */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-primary text-primary-foreground">
          <GraduationCap className="h-4 w-4" />
        </div>

        {/* Title and subtitle */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              {title}
            </h3>
            <Badge variant="outline" className="text-xs">
              Online
            </Badge>
          </div>
          {!isMinimized && (
            <p className="text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right side - Controls */}
      {showControls && (
        <div className="flex items-center gap-1">
          {/* Minimize/Maximize */}
          {onToggleMinimize && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleMinimize}
              className="h-8 w-8"
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
          )}

          {/* Close */}
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
              title="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}