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

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }, [message])

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

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
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
    <form onSubmit={handleSubmit} className={cn("space-y-2", className)}>
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            className={cn(
              "w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm",
              "placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "min-h-[44px] max-h-[120px]",
              disabled && "cursor-not-allowed"
            )}
            rows={1}
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
              "shrink-0 transition-colors",
              isListening && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            )}
            title={isListening ? "Stop recording" : "Start voice input"}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
        )}

        {/* Send button */}
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || disabled || isAtLimit}
          className="shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Voice listening indicator */}
      {isListening && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="h-2 w-2 rounded-full bg-destructive animate-pulse"
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
      <div className="text-xs text-muted-foreground">
        Press Enter to send, Shift+Enter for new line
      </div>
    </form>
  )
}