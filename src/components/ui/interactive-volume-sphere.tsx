"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"
import { Volume2, Volume1, VolumeX } from "lucide-react"

interface InteractiveVolumeSphereProps {
  volume: number
  onVolumeChange: (volume: number) => void
  isPlaying: boolean
  onTogglePlay: () => void
}

export function InteractiveVolumeSphere({
  volume,
  onVolumeChange,
  isPlaying,
  onTogglePlay,
}: InteractiveVolumeSphereProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const sphereStartPos = useRef({ x: 0, y: 0 })
  const animationControls = useAnimation()

  // Calculate sphere visual properties based on volume
  const sphereScale = 1 + (volume * 0.3) // Scale from 1.0 to 1.3
  const sphereOpacity = 0.3 + (volume * 0.7) // Opacity from 0.3 to 1.0
  const pulseIntensity = volume > 0 ? 1 + Math.sin(Date.now() * 0.003) * volume * 0.1 : 1

  // Get volume icon based on level
  const getVolumeIcon = () => {
    if (volume === 0) return VolumeX
    if (volume < 0.5) return Volume1
    return Volume2
  }

  // Handle mouse down on sphere
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    sphereStartPos.current = { ...position }
  }, [position])

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - dragStartPos.current.x
      const deltaY = e.clientY - dragStartPos.current.y

      const newX = Math.max(-200, Math.min(200, sphereStartPos.current.x + deltaX))
      const newY = Math.max(-200, Math.min(200, sphereStartPos.current.y + deltaY))

      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  // Handle click on sphere (when not dragging)
  const handleSphereClick = useCallback((e: React.MouseEvent) => {
    if (Math.abs(position.x) < 5 && Math.abs(position.y) < 5) {
      // Not dragging, treat as click
      onTogglePlay()
    }
  }, [position, onTogglePlay])

  // Handle wheel for volume control
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newVolume = Math.max(0, Math.min(1, volume + delta))
    onVolumeChange(newVolume)
  }, [volume, onVolumeChange])

  // Animate sphere based on audio and interaction
  useEffect(() => {
    if (isPlaying && volume > 0) {
      animationControls.start({
        scale: sphereScale * pulseIntensity,
        opacity: sphereOpacity,
        transition: { duration: 0.3 }
      })
    } else {
      animationControls.start({
        scale: sphereScale,
        opacity: sphereOpacity,
        transition: { duration: 0.3 }
      })
    }
  }, [volume, isPlaying, sphereScale, sphereOpacity, pulseIntensity, animationControls])

  const VolumeIcon = getVolumeIcon()

  return (
    <div ref={containerRef} className="fixed bottom-8 right-8 z-50">
      <motion.div
        ref={sphereRef}
        className="relative cursor-move select-none"
        style={{
          x: position.x,
          y: position.y,
        }}
        animate={animationControls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseDown={handleMouseDown}
        onClick={handleSphereClick}
        onWheel={handleWheel}
        onMouseEnter={() => {
          setIsHovered(true)
          setShowTooltip(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          setTimeout(() => setShowTooltip(false), 100)
        }}
      >
        {/* Outer glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
          animate={{
            scale: isPlaying && volume > 0 ? [1, 1.2, 1] : 1,
            opacity: volume * 0.5,
          }}
          transition={{
            duration: 2,
            repeat: isPlaying && volume > 0 ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Main sphere */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl border border-primary/30 backdrop-blur-sm">
          {/* Animated inner core */}
          <motion.div
            className="absolute inset-2 rounded-full bg-background/50"
            animate={{
              scale: isPlaying && volume > 0 ? [1, 1.3, 1] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: isPlaying && volume > 0 ? Infinity : 0,
              ease: "easeInOut"
            }}
          />

          {/* Sound waves */}
          {isPlaying && volume > 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-primary/30"
                  animate={{
                    scale: [1, 2, 3],
                    opacity: [0.6, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut"
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                />
              ))}
            </div>
          )}

          {/* Volume icon */}
          <motion.div
            animate={{
              rotate: isDragging ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <VolumeIcon
              className="w-6 h-6 text-primary-foreground relative z-10"
              strokeWidth={2}
            />
          </motion.div>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-background border border-border rounded-md text-xs text-foreground whitespace-nowrap shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span>{isPlaying ? 'Playing' : 'Paused'}</span>
              <span>•</span>
              <span>Volume: {Math.round(volume * 100)}%</span>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background" />
          </motion.div>
        )}

        {/* Hover hint */}
        {isHovered && !showTooltip && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
            {isDragging ? 'Drag to move' : 'Click to play • Scroll to adjust volume'}
          </div>
        )}
      </motion.div>
    </div>
  )
}