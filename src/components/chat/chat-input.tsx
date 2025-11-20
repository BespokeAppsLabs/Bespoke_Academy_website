/**
 * ChatInput component for message composition and sending
 */

"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Send, Mic, MicOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  maxLength?: number
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = "Type your message...",
  className,
  maxLength = 2000
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<any>(null)

  // Fixed 2-line height - no auto-resize needed
  // Textarea is set to h-[88px] (approximately 2 lines)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('')

        setMessage(transcript)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedMessage = message.trim()
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const toggleListening = () => {
    if (!recognitionRef.current) {
      console.warn('Speech recognition not supported')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const charCount = message.length
  const isNearLimit = charCount > maxLength * 0.9
  const isAtLimit = charCount >= maxLength

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-2 group", className)}>
      <div className="flex items-center gap-2 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="flex-1 relative z-10">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            className={cn(
              "w-full resize-none rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-zinc-100",
              "placeholder:text-zinc-400 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "h-[88px] relative z-10 overflow-y-auto",
              "scrollbar-hide",
              "focus:bg-zinc-750 transition-all duration-200",
              "shadow-sm focus:shadow-lg focus:shadow-primary/10",
              disabled && "cursor-not-allowed"
            )}
                      />

          {/* Character count */}
          {isNearLimit && (
            <div className={cn(
              "absolute bottom-1 right-2 text-xs",
              isAtLimit ? "text-destructive" : "text-muted-foreground"
            )}>
              {charCount}/{maxLength}
            </div>
          )}
        </div>

        {/* Voice input button */}
        {typeof window !== 'undefined' && 'webkitSpeechRecognition' in (window as any) && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleListening}
            disabled={disabled}
            className={cn(
              "shrink-0 transition-all duration-200 border border-zinc-600 hover:border-primary/50 relative z-10",
              "hover:bg-zinc-700 hover:shadow-md hover:shadow-primary/10",
              "focus:border-primary focus:bg-zinc-700 focus:shadow-md focus:shadow-primary/10",
              "flex items-center justify-center",
              isListening && "bg-red-950/30 text-red-400 border-red-800/50 hover:bg-red-950/50 hover:border-red-700 animate-pulse"
            )}
            title={isListening ? "Stop recording" : "Start voice input"}
          >
            {isListening ? (
              <MicOff className="h-4 w-4 stroke-red-400 fill-red-400/20" strokeWidth="1.5" />
            ) : (
              <Mic className="h-4 w-4 stroke-emerald-400 fill-emerald-400/10" strokeWidth="1.5" />
            )}
          </Button>
        )}

        {/* Send button */}
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || disabled || isAtLimit}
          className={cn(
            "shrink-0 relative z-10 transition-all duration-200",
            "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
            "border-2 border-emerald-400/50 hover:border-emerald-300",
            "shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40",
            "hover:scale-105 active:scale-95",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
            "flex items-center justify-center"
          )}
        >
          <Send className="h-4 w-4 stroke-white fill-white/20" strokeWidth="1.5" />
        </Button>
      </div>

      {/* Voice listening indicator */}
      {isListening && (
        <div className="flex items-center gap-2 text-sm text-red-400">
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="h-2 w-2 rounded-full bg-red-400 animate-pulse"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              />
            ))}
          </div>
          <span>Listening...</span>
        </div>
      )}

      {/* Help text */}
      <div className="text-xs text-zinc-400">
        Press Enter to send, Shift+Enter for new line
      </div>
    </form>
  )
}