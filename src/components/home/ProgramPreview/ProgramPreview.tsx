"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { getAllPrograms, getProgramLevelColor, getDifficultyStars } from "@/data/programs"
import { cn } from "@/lib/utils"
import {
  Monitor,
  Cpu,
  Camera,
  Trophy,
  ChevronRight,
  Clock,
  Users,
  Star
} from "lucide-react"

export interface ProgramPreviewProps {
  title?: string
  subtitle?: string
  description?: string
  className?: string
}

export function ProgramPreview({ 
  title = "COMPREHENSIVE PROGRAMS",
  subtitle = "Four progressive modules designed to transform you from beginner to AI expert in 40 weeks",
  description = "Each program builds upon the previous, creating a complete learning journey with hands-on projects and real-world applications.",
  className 
}: ProgramPreviewProps) {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null)
  const programs = getAllPrograms()

  const getModuleIcon = (moduleId: string) => {
    const icons = {
      'ai-fundamentals': Monitor,
      'advanced-tools': Cpu,
      'specialized-applications': Camera,
      'capstone-portfolio': Trophy
    }
    return icons[moduleId as keyof typeof icons] || Monitor
  }

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
          className="text-center space-y-6 section-content-spacing"
        >
          <h2 className="text-display-lg md:text-display-xl font-bold leading-tight text-foreground">
            {title}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Module Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {programs.map((program, index) => {
            const Icon = getModuleIcon(program.id)
            const isHovered = hoveredModule === program.id
            
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + index * 0.1 
                }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredModule(program.id)}
                onHoverEnd={() => setHoveredModule(null)}
                className="group"
              >
                <GlassCard
                  variant={isHovered ? "elevated" : "default"}
                  glowColor={program.glowColor}
                  className="h-full cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  {/* Module Header */}
                  <div className="relative h-32 overflow-hidden">
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity duration-300",
                      program.gradient
                    )} />
                    
                    {/* Module Icon */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Module Number Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/30">
                        Module {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Module Content */}
                  <div className="p-6 space-y-4">
                    {/* Title and Duration */}
                    <div className="space-y-2">
                      <h3 className="text-h4 font-semibold text-foreground group-hover:text-cyber-blue transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-sm text-cyber-blue font-medium">
                        {program.weeks}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-body-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {program.shortDescription}
                    </p>

                    {/* Level and Difficulty */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={cn("text-xs font-medium px-2 py-1 rounded-full", 
                          getProgramLevelColor(program.level)
                        )}>
                          {program.level}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {getDifficultyStars(program.difficulty)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {program.duration}
                        </span>
                      </div>
                    </div>

                    {/* Key Skills Preview */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-foreground mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {program.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-xs bg-surface-elevated/50 px-2 py-1 rounded-full border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                        {program.skills.length > 3 && (
                          <span className="text-xs bg-cyber-blue/10 text-cyber-blue px-2 py-1 rounded-full border border-cyber-blue/30">
                            +{program.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Students and Rating */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {program.students.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground">
                          {program.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-30 flex items-end justify-center pb-6"
                    >
                      <Link href={`/programs/${program.id}`}>
                        <GradientButton
                          variant="primary"
                          size="sm"
                          className="group/btn border-white text-white hover:bg-white hover:text-cyber-blue"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </GradientButton>
                      </Link>
                    </motion.div>
                  )}
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
          className="text-center mt-16"
        >
          <GlassCard
            variant="glow"
            glowColor="electric-purple"
            className="p-12 max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <h3 className="text-h2 font-semibold text-foreground">
                Choose Your Learning Path
              </h3>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're starting from scratch or looking to advance your skills, 
                we have the right program for your AI journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/curriculum">
                  <GradientButton
                    variant="primary"
                    size="lg"
                    className="group shadow-lg shadow-cyber-blue/25 hover:shadow-xl hover:shadow-cyber-blue/40"
                  >
                    Explore Full Curriculum
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </GradientButton>
                </Link>
                
                <Link href="/programs">
                  <GradientButton
                    variant="secondary"
                    size="lg"
                    className="group shadow-lg shadow-electric-purple/25 hover:shadow-xl hover:shadow-electric-purple/40"
                  >
                    Download Program Guide
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </GradientButton>
                </Link>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}