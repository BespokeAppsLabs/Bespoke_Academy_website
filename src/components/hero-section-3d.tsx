"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GradientButton } from "@/components/ui/gradient-button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { TextScramble } from "@/components/ui/text-scramble"
import { cn } from "@/lib/utils"

// Particle System Component
function ParticleSystem() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!particlesRef.current) return

    const particleCount = 15 // Further reduced for better performance
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute rounded-full bg-cyber-blue/30"

      // Random size
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Random animation duration and delay
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5

      particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`

      particlesRef.current.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [])

  return (
    <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
  )
}

// Grid Background Component
function GridBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface opacity-90">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 128, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 128, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}

export function HeroSection3D() {
  const [scrambledText, setScrambledText] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const finalText = "Transform Your Career with AI Education"

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <GridBackground />
      <ParticleSystem />

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-cyber-blue/20 rounded-lg"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Hero Title with Text Scramble */}
          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <TextScramble
                text={finalText}
                duration={2500}
                className="text-cyber-blue font-bold"
              />
            </motion.h1>

            <motion.p
              className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Master cutting-edge AI technologies and advance your career with our comprehensive,
              project-based learning programs designed for the future workforce.
            </motion.p>

            <motion.p
              className="text-body text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              40-Week Hands-On Learning Journey • Zero Prior Knowledge Required • Industry-Recognized Certification
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <GradientButton
              size="lg"
              variant="primary"
              className="group shadow-lg shadow-cyber-blue/25 hover:shadow-xl hover:shadow-cyber-blue/40"
            >
              Start Your AI Journey
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </GradientButton>

            <GradientButton
              size="lg"
              variant="secondary"
              className="shadow-lg shadow-electric-purple/25 hover:shadow-xl hover:shadow-electric-purple/40"
            >
              Explore Curriculum
            </GradientButton>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 scroll-scale-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {[
              {
                value: 50000,
                suffix: "+",
                label: "Students Enrolled",
                color: "text-cyber-blue",
                borderColor: "border-cyber-blue/30"
              },
              {
                value: 95,
                suffix: "%",
                label: "Career Success Rate",
                color: "text-electric-purple",
                borderColor: "border-electric-purple/30"
              },
              {
                value: 40,
                suffix: "+",
                label: "Expert Instructors",
                color: "text-neon-cyan",
                borderColor: "border-neon-cyan/30"
              },
              {
                value: 1000,
                suffix: "+",
                label: "Hiring Partners",
                color: "text-tech-green",
                borderColor: "border-tech-green/30"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-morphism rounded-xl p-6 border hover:border-white/20 transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={cn("text-3xl font-bold mb-2", stat.color)}>
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                    delay={1000 + index * 200}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Key Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 scroll-scale-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {[
              {
                title: "Zero Prior Knowledge",
                description: "Perfect for beginners - start from scratch and build your AI expertise",
                icon: "🚀"
              },
              {
                title: "Project-Based Learning",
                description: "Build real AI applications and create your professional portfolio",
                icon: "💡"
              },
              {
                title: "Career Support",
                description: "Get job placement assistance and connect with top tech companies",
                icon: "🎯"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-morphism rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-h4 font-semibold mb-2">{feature.title}</h3>
                <p className="text-body-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-cyber-blue/50 rounded-full flex justify-center backdrop-blur-sm bg-cyber-blue/10">
          <motion.div
            className="w-1 h-3 bg-cyber-blue rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

// Add the floating animation to the page
export function HeroSection() {
  return <HeroSection3D />
}