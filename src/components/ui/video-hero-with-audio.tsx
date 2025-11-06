"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { InteractiveVolumeSphere } from "./interactive-volume-sphere"

interface VideoHeroWithAudioControlProps {
  scrambledText: string
  finalHeading: string
}

export function VideoHeroWithAudioControl({
  scrambledText,
  finalHeading,
}: VideoHeroWithAudioControlProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0)
  const [isInteracted, setIsInteracted] = useState(false)
  const [showPoster, setShowPoster] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  // Initialize audio context and analyser
  const initializeAudio = useCallback(() => {
    if (!audioContextRef.current && videoRef.current) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaElementSource(videoRef.current)

      analyser.fftSize = 256
      source.connect(analyser)
      analyser.connect(audioContext.destination)

      audioContextRef.current = audioContext
      analyserRef.current = analyser
      sourceRef.current = source
    }
  }, [])

  // Handle video load
  const handleVideoLoadedData = useCallback(() => {
    setIsVideoLoaded(true)
  }, [])

  // Handle play/pause
  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return

    if (!isInteracted) {
      // First interaction - initialize audio
      initializeAudio()
      setIsInteracted(true)
    }

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().catch(error => {
        console.log('Video play failed:', error)
      })
      setIsPlaying(true)
    }
  }, [isPlaying, isInteracted, initializeAudio])

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }, [])

  // Start video playback when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isVideoLoaded && !isInteracted) {
        // Start muted playback when page becomes visible
        if (videoRef.current) {
          videoRef.current.muted = true
          videoRef.current.play().then(() => {
            setIsPlaying(true)
          }).catch(error => {
            console.log('Autoplay failed:', error)
          })
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isVideoLoaded, isInteracted])

  // Start video playback when loaded
  useEffect(() => {
    if (isVideoLoaded && !isInteracted) {
      // Start muted playback
      if (videoRef.current) {
        videoRef.current.muted = true
        videoRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.log('Autoplay failed:', error)
        })
      }
    }
  }, [isVideoLoaded, isInteracted])

  // Handle first user interaction to enable audio
  const handleFirstInteraction = useCallback(() => {
    if (!isInteracted && videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.volume = volume
      initializeAudio()
      setIsInteracted(true)
    }
  }, [isInteracted, volume, initializeAudio])

  // Auto-start video when ready
  useEffect(() => {
    if (isVideoLoaded && videoRef.current && !isPlaying) {
      videoRef.current.muted = true
      videoRef.current.play().then(() => {
        setIsPlaying(true)
        // Fade out poster after video starts
        setTimeout(() => setShowPoster(false), 500)
      }).catch(error => {
        console.log('Autoplay failed:', error)
      })
    }
  }, [isVideoLoaded, isPlaying])

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background Video with Fallback Image */}
      <div className="absolute inset-0 z-0">
        {/* Static poster image */}
        <motion.div
          animate={{
            opacity: isVideoLoaded && !showPoster ? 0 : 1,
          }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero/ai-robotics-hero.jpg"
            alt="AI and Robotics Education"
            fill
            className="object-cover"
            priority
            quality={85}
          />
        </motion.div>

        {/* Video element */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={handleVideoLoadedData}
          onCanPlay={() => setIsVideoLoaded(true)}
          playsInline
          loop
          muted
          style={{
            opacity: isVideoLoaded ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
          onClick={handleFirstInteraction}
        >
          <source src="/images/hero/Seamless_Looping_Animation_Creation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-background/20" />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-20 container mx-auto px-4 py-20 text-center"
      >
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6">
            {/* Scrambled heading while animating, then final text */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-primary">
              <span aria-label={finalHeading} className="block leading-tight">
                {scrambledText}
                <span className="inline-block w-1 h-full bg-primary animate-blink ml-1">&nbsp;</span>
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-secondary-foreground sm:text-xl md:text-2xl leading-relaxed mt-2">
              40-Week Hands-On Learning Journey for Grades 8-11
            </p>

            <p className="mx-auto max-w-3xl text-base text-muted-foreground leading-relaxed mt-2">
              From complete beginner to technology creator. Your child will build their own AI-powered robots
              while developing confidence, problem-solving skills, and future-ready capabilities in a safe,
              supervised environment with all equipment included.
            </p>

            {!isInteracted && isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20"
              >
                <p className="text-sm text-primary">
                  🎵 Click anywhere to enable audio and control volume
                </p>
              </motion.div>
            )}
          </div>

          {/* Key Value Propositions */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 mb-6">
            <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-primary">Zero Prior Knowledge</p>
              <p className="text-xs text-muted-foreground">Perfect for beginners</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-primary">All Equipment Included</p>
              <p className="text-xs text-muted-foreground">R5000+ value</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-primary">Safe Environment</p>
              <p className="text-xs text-muted-foreground">Professional supervision</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-primary">Friday Schedule</p>
              <p className="text-xs text-muted-foreground">Fits with school</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-primary">Portfolio Development</p>
              <p className="text-xs text-muted-foreground">College applications</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button asChild size="lg" className="w-full sm:w-auto group">
                <Link href="#enrollment">
                  Enroll Your Child Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto group">
                <Link href="#contact">
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                  Download Parent Information Kit
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Volume Sphere */}
      {(isInteracted || isPlaying) && (
        <InteractiveVolumeSphere
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isPlaying={isPlaying}
          onTogglePlay={handlePlayPause}
        />
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-primary flex items-start justify-center p-1">
          <div className="h-2 w-1 rounded-full bg-primary" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center z-10">Scroll to Explore</p>
    </section>
  )
}