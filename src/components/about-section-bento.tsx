"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { cn } from "@/lib/utils"
import {
  Users,
  Award,
  BookOpen,
  Target,
  Zap,
  Shield,
  Code,
  Rocket,
  TrendingUp,
  Lightbulb,
  ChevronRight,
  Play,
  Sparkles
} from "lucide-react"

// Bento card component with reveal animation
function BentoCard({
  children,
  className,
  size = "medium",
  delay = 0,
  revealOnHover = false,
  ...props
}: {
  children: React.ReactNode
  className?: string
  size?: "small" | "medium" | "large" | "wide" | "tall"
  delay?: number
  revealOnHover?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-2 md:col-span-2 md:row-span-1",
    large: "col-span-1 row-span-2 md:col-span-2 md:row-span-2",
    wide: "col-span-1 row-span-1 md:col-span-2",
    tall: "col-span-1 row-span-2",
  }

  return (
    <motion.div
      className={cn(sizeClasses[size], "relative")}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassCard
        variant="elevated"
        className={cn(
          "h-full transition-all duration-300",
          isHovered && "shadow-lg shadow-cyber-blue/10",
          className
        )}
        {...props}
      >
        <div className="h-full p-6 relative overflow-hidden">
          <div className="relative z-10 h-full">
            {children}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

// Parallax background element
function ParallaxElement({ children, speed = 0.5 }: { children: React.ReactNode, speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <div ref={ref} className="absolute">
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

export function AboutSectionBento() {
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Helper function to get proper color classes
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, text: string }> = {
      "cyber-blue": { bg: "from-cyber-blue to-electric-purple", text: "text-cyber-blue" },
      "electric-purple": { bg: "from-electric-purple to-neon-cyan", text: "text-electric-purple" },
      "neon-cyan": { bg: "from-neon-cyan to-tech-green", text: "text-neon-cyan" },
      "tech-green": { bg: "from-tech-green to-cyber-blue", text: "text-tech-green" }
    }
    return colorMap[color] || colorMap["cyber-blue"]
  }

  // Core data
  const stats = [
    { value: 10000, suffix: "+", label: "Students", icon: Users, color: "cyber-blue" },
    { value: 95, suffix: "%", label: "Success Rate", icon: Target, color: "electric-purple" },
    { value: 40, suffix: "+", label: "AI Courses", icon: BookOpen, color: "neon-cyan" },
    { value: 24, suffix: "/7", label: "Support", icon: Shield, color: "tech-green" },
  ]

  const features = [
    {
      title: "Expert Instructors",
      description: "Learn from industry professionals with real-world experience",
      icon: Award,
      gradient: "from-cyber-blue to-electric-purple",
    },
    {
      title: "Hands-On Projects",
      description: "Build real AI applications that showcase your skills",
      icon: Code,
      gradient: "from-electric-purple to-neon-cyan",
    },
    {
      title: "Career Support",
      description: "Get job placement assistance and career guidance",
      icon: Rocket,
      gradient: "from-neon-cyan to-tech-green",
    },
    {
      title: "Innovation Focus",
      description: "Stay ahead with cutting-edge AI technologies",
      icon: Lightbulb,
      gradient: "from-tech-green to-cyber-blue",
    },
  ]

  const values = [
    {
      number: "01",
      title: "Safety First",
      description: "Professional supervision and protected learning environment",
      icon: "🛡️",
      color: "cyber-blue",
    },
    {
      number: "02",
      title: "Hands-On Learning",
      description: "Real projects every week with practical applications",
      icon: "🔧",
      color: "electric-purple",
    },
    {
      number: "03",
      title: "Future Ready",
      description: "Building skills for tomorrow's AI-powered careers",
      icon: "🚀",
      color: "neon-cyan",
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-50" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      {/* Floating Parallax Elements */}
      <ParallaxElement speed={0.3}>
        <div className="top-20 right-10 w-32 h-32 bg-gradient-to-br from-cyber-blue/20 to-electric-purple/20 rounded-full blur-3xl" />
      </ParallaxElement>
      <ParallaxElement speed={0.5}>
        <div className="bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-neon-cyan/20 to-tech-green/20 rounded-full blur-3xl" />
      </ParallaxElement>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6 section-content-spacing scroll-reveal">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <GlassCard variant="elevated" className="px-6 py-3 rounded-full">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-tech-green" />
                <span className="text-tech-green font-semibold">About Bespoke Academy</span>
              </div>
            </GlassCard>
          </motion.div>

          <h2 className="text-display-2xl md:text-display-xl font-bold leading-tight text-foreground">
            Transform Your Career with AI Excellence
          </h2>

          <p className="text-body-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            We bridge the gap between ambition and achievement through comprehensive AI education.
            Our programs combine cutting-edge curriculum with hands-on experience, preparing you
            for the future of technology.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[200px]">
          {/* Hero Card - Large */}
          <BentoCard size="large" delay={0.1} revealOnHover>
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyber-blue to-electric-purple rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-h3 font-semibold">Mission Driven</h3>
                    <p className="text-sm text-muted-foreground">Our core purpose</p>
                  </div>
                </div>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Empowering the next generation of AI professionals through innovative education
                  and real-world application. We believe in learning by creating, not just consuming.
                </p>
              </div>

              <GradientButton variant="outline" size="sm" className="w-fit group">
                Learn More
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </GradientButton>
            </div>
          </BentoCard>

          {/* Stats Cards */}
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <BentoCard key={index} size="small" delay={0.2 + index * 0.1} revealOnHover>
                <div className="text-center h-full flex flex-col justify-center items-center space-y-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getColorClasses(stat.color).bg} rounded-lg flex items-center justify-center opacity-20`}>
                    <Icon className={`w-5 h-5 ${getColorClasses(stat.color).text}`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </BentoCard>
            )
          })}

          {/* Values Cards */}
          {values.map((value, index) => (
            <BentoCard key={index} size="medium" delay={0.4 + index * 0.1} revealOnHover>
              <div className="flex flex-col h-full justify-center">
                <div className="flex items-start gap-4">
                  <div className={`text-3xl font-bold ${getColorClasses(value.color).text}`}>
                    {value.number}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-h4 font-semibold">{value.title}</h4>
                    <p className="text-body-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            </BentoCard>
          ))}

          {/* Feature Cards */}
          {features.map((feature, index) => (
            <BentoCard key={index} size="wide" delay={0.6 + index * 0.1} revealOnHover>
              <div className="flex items-center gap-4 h-full">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-h4 font-semibold mb-2">{feature.title}</h4>
                  <p className="text-body-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </BentoCard>
          ))}

          {/* Video/CTA Card - Tall */}
          <BentoCard size="tall" delay={0.8} revealOnHover>
            <div className="h-full flex flex-col justify-between items-center text-center space-y-6">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-electric-purple to-neon-cyan rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-h3 font-semibold mb-2">See Our Impact</h3>
                <p className="text-body-sm text-muted-foreground">
                  Watch how our students are transforming their careers with AI
                </p>
              </div>

              <GradientButton variant="primary" size="sm" className="group">
                Watch Video
                <Play className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </GradientButton>
            </div>
          </BentoCard>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center scroll-reveal">
          <GlassCard variant="elevated" glowColor="electric-purple" className="p-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-display-lg font-semibold text-foreground">
                Ready to Transform Your Future?
              </h3>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of students who have already launched their AI careers with our comprehensive programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GradientButton variant="primary" size="lg" className="group">
                  Start Your Journey
                  <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </GradientButton>
                <GradientButton variant="outline" size="lg">
                  Download Curriculum
                </GradientButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}