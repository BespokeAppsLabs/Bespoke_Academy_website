"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { getAcademicStats, formatStatValue, getStatColor } from "@/data/statistics"
import { cn } from "@/lib/utils"
import {
  Users,
  Target,
  Clock,
  TrendingUp,
  Trophy,
  Shield
} from "lucide-react"

export interface AcademicStatsProps {
  title?: string
  subtitle?: string
  className?: string
}

export function AcademicStats({ 
  title = "ACADEMIC EXCELLENCE",
  subtitle = "Trusted by thousands of students worldwide with proven results",
  className 
}: AcademicStatsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const stats = getAcademicStats()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const statCards = [
    {
      ...stats.students,
      icon: Users,
      color: getStatColor(stats.students.color)
    },
    {
      ...stats.successRate,
      icon: Target,
      color: getStatColor(stats.successRate.color)
    },
    {
      ...stats.programDuration,
      icon: Clock,
      color: getStatColor(stats.programDuration.color)
    },
    {
      ...stats.hiringPartners,
      icon: TrendingUp,
      color: getStatColor(stats.hiringPartners.color)
    },
    {
      ...stats.projects,
      icon: Trophy,
      color: getStatColor(stats.projects.color)
    },
    {
      ...stats.support,
      icon: Shield,
      color: getStatColor(stats.support.color)
    }
  ]

  return (
    <section className={cn("section-padding relative overflow-hidden", className)}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-30" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 section-content-spacing"
        >
          <h2 className="text-display-lg md:text-display-xl font-bold leading-tight text-foreground">
            {title}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12"
        >
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + index * 0.1 
                }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <GlassCard
                  variant="elevated"
                  className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center space-y-4">
                    {/* Icon */}
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center opacity-20",
                      stat.color.includes('cyber-blue') && "bg-gradient-to-br from-cyber-blue to-blue-600",
                      stat.color.includes('electric-purple') && "bg-gradient-to-br from-electric-purple to-purple-600",
                      stat.color.includes('neon-cyan') && "bg-gradient-to-br from-neon-cyan to-cyan-600",
                      stat.color.includes('tech-green') && "bg-gradient-to-br from-tech-green to-green-600"
                    )}>
                      <Icon className={cn("w-6 h-6", stat.color)} />
                    </div>

                    {/* Value */}
                    <div className="space-y-2">
                      <div className={cn("text-2xl font-bold text-foreground", stat.color)}>
                        {isVisible && (
                          <AnimatedCounter
                            end={typeof stat.value === 'number' ? stat.value : 0}
                            suffix={stat.suffix || ''}
                            duration={2000}
                            delay={500 + index * 200}
                          />
                        )}
                        {typeof stat.value === 'string' && stat.value}
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                    </div>

                    {/* Trend */}
                    {stat.trend && (
                      <div className="flex items-center justify-center space-x-1">
                        <motion.div
                          animate={{ rotate: stat.trend.direction === 'up' ? 0 : 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <TrendingUp className={cn("w-4 h-4", 
                            stat.trend.direction === 'up' ? 'text-tech-green' : 'text-red-500'
                          )} />
                        </motion.div>
                        <span className={cn("text-xs font-medium",
                          stat.trend.direction === 'up' ? 'text-tech-green' : 'text-red-500'
                        )}>
                          {stat.trend.value > 0 && '+'}{stat.trend.value}%
                        </span>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <GlassCard
            variant="glow"
            glowColor="electric-purple"
            className="p-8 max-w-md mx-auto"
          >
            <h3 className="text-h3 font-semibold text-foreground mb-4">
              View All Success Metrics
            </h3>
            <p className="text-body-sm text-muted-foreground mb-6">
              Explore our complete performance metrics and see how Bespoke Academy transforms careers.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-cyber-blue to-electric-purple text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
              onClick={() => {
                // Navigate to detailed stats page or about page
                window.location.href = '/about#metrics'
              }}
            >
              Explore Detailed Metrics
            </motion.button>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}