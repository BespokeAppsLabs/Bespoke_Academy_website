/**
 * ChatHeader component for the chat interface
 */

"use client"

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Minimize2, Maximize2, X, GraduationCap } from 'lucide-react'
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
      "flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-3",
      "shadow-sm relative overflow-hidden",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:via-transparent before:to-transparent before:pointer-events-none",
      className
    )}>
      {/* Left side - Title and status */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Avatar */}
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border border-emerald-400/50 shadow-lg shadow-emerald-500/25">
          <GraduationCap className="h-4 w-4 fill-current" />
        </div>

        {/* Title and subtitle */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-emerald-500">
              {title}
            </h3>
            <Badge variant="outline" className="text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              Online
            </Badge>
          </div>
          {!isMinimized && (
            <p className="text-xs text-zinc-300">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right side - Controls */}
      {showControls && (
        <div className="flex items-center gap-1 relative z-10">
          {/* Minimize/Maximize */}
          {onToggleMinimize && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleMinimize}
              className="h-8 w-8 hover:bg-zinc-700 border border-transparent hover:border-zinc-600 text-zinc-300 hover:text-white transition-colors duration-200"
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4 stroke-emerald-400 fill-none" />
              ) : (
                <Minimize2 className="h-4 w-4 stroke-emerald-400 fill-none" />
              )}
            </Button>
          )}

          {/* Close */}
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:bg-red-950/50 hover:text-red-400 border border-transparent hover:border-red-800/50 text-zinc-300 transition-colors duration-200"
              title="Close chat"
            >
              <X className="h-4 w-4 stroke-red-400 fill-red-400/20" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}