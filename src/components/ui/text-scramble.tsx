"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TextScrambleProps {
  text: string
  className?: string
  duration?: number
  characterSet?: string
  speed?: number
  iterations?: number
  reveal?: boolean
  onComplete?: () => void
}

export function TextScramble({
  text,
  className,
  duration = 2000,
  characterSet = "!<>-_\\/[]{}—=+*^?#________",
  speed = 30,
  iterations = 1,
  reveal = true,
  onComplete
}: TextScrambleProps) {
  const [displayText, setDisplayText] = React.useState("")
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    let iterationCount = 0
    let currentIndex = 0
    let intervalId: NodeJS.Timeout | null = null

    const startAnimation = () => {
      setIsAnimating(true)
      iterationCount++

      intervalId = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < currentIndex) {
                return text[index]
              }

              if (letter === " ") {
                return " "
              }

              return characterSet[Math.floor(Math.random() * characterSet.length)]
            })
            .join("")
        )

        if (currentIndex >= text.length) {
          if (intervalId) clearInterval(intervalId)
          setIsAnimating(false)
          onComplete?.()

          if (iterationCount < iterations) {
            setTimeout(() => {
              currentIndex = -1
              startAnimation()
            }, 500)
          }
        }

        currentIndex += 1 / 3
      }, speed)
    }

    startAnimation()

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, characterSet, speed, iterations, reveal, onComplete])

  React.useEffect(() => {
    if (!reveal) {
      setDisplayText(text)
    }
  }, [text, reveal])

  return (
    <span className={cn("font-mono", className)}>
      {displayText}
    </span>
  )
}

interface TypewriterProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  cursor?: boolean
  onComplete?: () => void
}

export function Typewriter({
  text,
  className,
  speed = 100,
  delay = 0,
  cursor = true,
  onComplete
}: TypewriterProps) {
  const [displayText, setDisplayText] = React.useState("")
  const [showCursor, setShowCursor] = React.useState(true)

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      let currentIndex = 0
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(intervalId)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(intervalId)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [text, speed, delay, onComplete])

  React.useEffect(() => {
    if (!cursor) return

    const intervalId = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(intervalId)
  }, [cursor])

  return (
    <span className={cn("font-mono", className)}>
      {displayText}
      {cursor && (
        <span className={cn("inline-block w-0.5 h-5 bg-current ml-1", showCursor ? "opacity-100" : "opacity-0")} />
      )}
    </span>
  )
}

interface GlitchTextProps {
  text: string
  className?: string
  intensity?: "low" | "medium" | "high"
  onHover?: boolean
}

export function GlitchText({ text, className, intensity = "medium", onHover = true }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = React.useState(false)

  const intensityConfig = {
    low: { skew: 1, translate: 1, duration: 100 },
    medium: { skew: 2, translate: 2, duration: 200 },
    high: { skew: 3, translate: 3, duration: 300 }
  }

  const config = intensityConfig[intensity]

  const handleMouseEnter = () => {
    if (onHover) {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), config.duration)
    }
  }

  return (
    <span
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
    >
      {/* Main text */}
      <span className={cn(isGlitching && "relative")}>
        {text}
      </span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 w-full text-cyber-blue opacity-70"
            style={{
              transform: `skewX(${config.skew}deg) translate(${config.translate}px, 0)`,
              animation: "glitch 0.3s infinite"
            }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 w-full text-electric-purple opacity-70"
            style={{
              transform: `skewX(-${config.skew}deg) translate(-${config.translate}px, 0)`,
              animation: "glitch 0.3s infinite reverse"
            }}
          >
            {text}
          </span>
        </>
      )}

      <style jsx>{`
        @keyframes glitch {
          0%, 100% { clip-path: inset(0 0 0 0); }
          20% { clip-path: inset(20% 0 30% 0); }
          40% { clip-path: inset(50% 0 20% 0); }
          60% { clip-path: inset(10% 0 60% 0); }
          80% { clip-path: inset(80% 0 5% 0); }
        }
      `}</style>
    </span>
  )
}