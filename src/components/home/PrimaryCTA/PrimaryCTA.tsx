"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { cn } from "@/lib/utils"
import { Rocket, Calendar, Shield, CheckCircle } from "lucide-react"

export interface PrimaryCTAProps {
  title?: string
  subtitle?: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
    variant?: 'primary' | 'secondary'
  }
  secondaryCTA?: {
    text: string
    href: string
    variant?: 'primary' | 'secondary'
  }
  reassurancePoints?: string[]
  nextCohortDate?: string
  className?: string
}

export function PrimaryCTA({ 
  title = "READY TO TRANSFORM YOUR FUTURE?",
  subtitle = "Join thousands of students who have already launched their AI careers with our comprehensive programs.",
  description = "From complete beginner to AI expert with industry-recognized certification and career support.",
  primaryCTA = {
    text: "Start Your AI Journey Today",
    href: "/curriculum",
    variant: "primary"
  },
  secondaryCTA = {
    text: "Talk to Admissions Advisor",
    href: "/contact/admissions",
    variant: "secondary"
  },
  reassurancePoints = [
    "No experience required - perfect for beginners",
    "Flexible payment options available",
    "Industry-recognized certification",
    "Career support and job placement assistance"
  ],
  nextCohortDate = "February 1, 2024",
  className 
}: PrimaryCTAProps) {
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
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-display-lg md:text-display-xl font-bold leading-tight text-foreground bg-gradient-to-r from-cyber-blue via-electric-purple to-neon-cyan bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <GlassCard
            variant="glow"
            glowColor="electric-purple"
            className="p-12 max-w-4xl mx-auto text-center"
          >
            <div className="space-y-8">
              {/* Main CTA */}
              <div className="space-y-4">
                <motion.h3
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-h2 font-semibold text-foreground"
                >
                  {title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-body text-muted-foreground leading-relaxed"
                >
                  {description}
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GradientButton
                    variant={primaryCTA?.variant || "primary"}
                    size="lg"
                    className="group shadow-lg shadow-cyber-blue/25 hover:shadow-xl hover:shadow-cyber-blue/40 w-full sm:w-auto"
                    onClick={() => {
                      window.location.href = primaryCTA?.href || "/curriculum"
                    }}
                  >
                    {primaryCTA?.text || "Start Your AI Journey Today"}
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </GradientButton>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GradientButton
                    variant={secondaryCTA?.variant || "secondary"}
                    size="lg"
                    className="group shadow-lg shadow-electric-purple/25 hover:shadow-xl hover:shadow-electric-purple/40 w-full sm:w-auto"
                    onClick={() => {
                      window.location.href = secondaryCTA?.href || "/contact/admissions"
                    }}
                  >
                    {secondaryCTA?.text || "Talk to Admissions Advisor"}
                  </GradientButton>
                </motion.div>
              </motion.div>
            </div>

            {/* Reassurance Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="border-t border-white/10 pt-8"
            >
              <h4 className="text-h4 font-semibold text-foreground mb-6 text-center">
                Why Choose Bespoke Academy?
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reassurancePoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.7 + index * 0.1 
                    }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyber-blue to-electric-purple rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-body-sm text-muted-foreground leading-relaxed">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Urgency Element */}
            {nextCohortDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 text-center"
              >
                <div className="inline-flex items-center space-x-2 bg-cyber-blue/10 px-4 py-2 rounded-full">
                  <Calendar className="w-4 h-4 text-cyber-blue" />
                  <span className="text-sm font-medium text-cyber-blue">
                    Next cohort starts: {nextCohortDate}
                  </span>
                </div>
              </motion.div>
            )}
        </GlassCard>
      </motion.div>
    </div>
    </section>
  )
}