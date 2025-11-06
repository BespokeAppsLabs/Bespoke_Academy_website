"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GradientButton } from "@/components/ui/gradient-button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import { ArrowRight, Play, Sparkles, Zap, Shield, Target, Users } from "lucide-react"
import Image from "next/image"

export function HeroSectionSplit() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const words = ["Create", "Innovate", "Transform", "Build", "Design"]
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { value: 10000, suffix: "+", label: "Students", icon: Users },
    { value: 95, suffix: "%", label: "Success Rate", icon: Target },
    { value: 40, suffix: "+", label: "AI Courses", icon: Zap },
    { value: 24, suffix: "/7", label: "Support", icon: Shield },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-surface to-background pb-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/ai-education-hero.jpg"
          alt="AI Education Background"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/40 to-background/70" />
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-cyber-blue/5 via-transparent to-electric-purple/5" />

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">

          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Main Badge */}
            <div className="inline-flex">
              <GlassCard variant="bordered" className="px-4 py-2 rounded-full">
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-tech-green" />
                  <span className="text-tech-green font-medium">AI-Powered Education</span>
                </div>
              </GlassCard>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
                Transform Your Future with AI
              </h1>

              <div className="text-3xl md:text-4xl lg:text-5xl">
                <span className="text-muted-foreground">
                  We help you{" "}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWordIndex}
                      className="text-electric-purple font-semibold"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {words[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>{" "}
                  amazing AI experiences
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-body-lg text-muted-foreground leading-relaxed max-w-lg">
              Master cutting-edge AI technologies through hands-on learning. Build real projects,
                  develop practical skills, and launch your career in the AI revolution.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <GradientButton variant="primary" size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </GradientButton>

              <GradientButton variant="outline" size="lg">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </GradientButton>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4 text-cyber-blue mr-1" />
                      <span className="text-2xl font-bold text-foreground">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Side - Visual Elements */}
          <div className="relative h-[600px] lg:h-auto">
            {/* Main Visual Card */}
            <GlassCard variant="elevated" className="h-full p-8 flex items-center justify-center">
              <div className="space-y-8 text-center">
                {/* Icon Display */}
                <div className="w-48 h-48 mx-auto relative flex items-center justify-center">
                  <div className="w-32 h-32 bg-cyber-blue/10 rounded-2xl border border-cyber-blue/20 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-cyber-blue" />
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Expert Instructors", value: "50+" },
                    { label: "AI Projects", value: "100+" },
                    { label: "Career Support", value: "24/7" },
                    { label: "Success Rate", value: "95%" },
                  ].map((item, index) => (
                    <div key={index}>
                      <GlassCard variant="elevated" className="p-4">
                        <div className="text-2xl font-bold text-cyber-blue mb-1">{item.value}</div>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                      </GlassCard>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-60">
        <div className="w-6 h-10 border-2 border-cyber-blue/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyber-blue rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}