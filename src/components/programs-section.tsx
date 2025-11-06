"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { motion } from "framer-motion"
import { Monitor, Cpu, Camera, Trophy, ArrowRight, Zap, Users, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const programs = [
  {
    icon: Monitor,
    title: "AI Fundamentals",
    subtitle: "Module 1: Weeks 1-10",
    description:
      "Master AI fundamentals and build your career foundation. Learn core AI/ML concepts, career planning, and technical skills assessment.",
    gradient: "from-cyber-blue to-electric-purple",
    glowColor: "cyber-blue",
    image: "/images/ai-fundamentals.jpg",
    duration: "10 weeks",
    level: "Beginner",
    difficulty: "Easy",
    skills: ["Python Basics", "AI Concepts", "Career Planning"],
    students: 1500,
    rating: 4.9,
    price: "R12,000"
  },
  {
    icon: Cpu,
    title: "Advanced Tools",
    subtitle: "Module 2: Weeks 11-20",
    description:
      "Master advanced AI tools and workflow optimization. Learn advanced prompt engineering, AI tools integration, and workflow automation.",
    gradient: "from-electric-purple to-neon-cyan",
    glowColor: "electric-purple",
    image: "/images/advanced-tools.jpg",
    duration: "10 weeks",
    level: "Intermediate",
    difficulty: "Medium",
    skills: ["Prompt Engineering", "Tool Integration", "Automation"],
    students: 1200,
    rating: 4.8,
    price: "R15,000"
  },
  {
    icon: Camera,
    title: "Specialized Apps",
    subtitle: "Module 3: Weeks 21-35",
    description:
      "Apply AI to specialized industry applications. Learn industry-specific AI, case studies, and project development.",
    gradient: "from-neon-cyan to-tech-green",
    glowColor: "neon-cyan",
    image: "/images/specialized-apps.jpg",
    duration: "15 weeks",
    level: "Advanced",
    difficulty: "Hard",
    skills: ["Industry AI", "Case Studies", "Project Dev"],
    students: 800,
    rating: 4.9,
    price: "R20,000"
  },
  {
    icon: Trophy,
    title: "Capstone & Portfolio",
    subtitle: "Module 4: Weeks 36-40",
    description:
      "Complete your capstone project and build your portfolio. Focus on capstone project, portfolio building, and career preparation.",
    gradient: "from-tech-green to-ai-orange",
    glowColor: "tech-green",
    image: "/images/capstone-portfolio.jpg",
    duration: "5 weeks",
    level: "Expert",
    difficulty: "Expert",
    skills: ["Capstone Project", "Portfolio", "Career Prep"],
    students: 500,
    rating: 5.0,
    price: "R8,000"
  },
]

export function ProgramsSection() {
  return (
    <section id="programs" className="section-padding relative overflow-hidden pt-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-30" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollAnimation variant="fadeUp" delay={0}>
          <div className="text-center space-y-6 section-content-spacing">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
              Learning Programs
            </h2>

            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Four comprehensive modules designed to transform you from AI beginner to expert.
              Each program builds upon the previous, creating a complete learning journey.
            </p>
          </div>
        </ScrollAnimation>

        {/* Program Stats */}
        <ScrollAnimation variant="fadeUp" delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Users, value: "4000+", label: "Active Students" },
              { icon: Award, value: "95%", label: "Success Rate" },
              { icon: Zap, value: "40", label: "Total Weeks" },
              { icon: Trophy, value: "500+", label: "Projects" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="glass-morphism rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-cyber-blue" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>

        {/* Interactive Program Cards */}
        <ScrollAnimation variant="fadeUp" delay={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon
              return (
                <div key={index}>
                  <GlassCard
                    variant="elevated"
                    className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Program Header with Image */}
                    <div className="relative h-48 rounded-t-xl overflow-hidden">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAD/8QAFhABQAD/2wBAAQEAABAAAAEAIAAAAAEAQAAAAAAAAEAAAAAAQAA//8AAAFhAAQEAAP//AfABQAD//8QAJhAAQD/2wBAAgEAAgEAAgIAAgIAAAAAA//8A"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent z-10" />
                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-6 flex items-center justify-center z-20">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Floating badges */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/30">
                          {program.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Program Content */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-h4 font-semibold group-hover:text-cyber-blue transition-colors">
                          {program.title}
                        </h3>
                        <p className="text-sm text-cyber-blue font-medium">{program.subtitle}</p>
                      </div>

                      <p className="text-body-sm text-muted-foreground leading-relaxed">
                        {program.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {program.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-xs bg-surface-elevated/50 px-2 py-1 rounded-full border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Program Stats */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Students</div>
                          <div className="text-sm font-semibold text-cyber-blue">{program.students}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Rating</div>
                          <div className="text-sm font-semibold text-electric-purple">⭐ {program.rating}</div>
                        </div>
                      </div>

                      {/* Duration and Price */}
                      <div className="pt-2 border-t border-white/10">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs text-muted-foreground">{program.duration}</span>
                          <span className="text-sm font-bold text-tech-green">{program.price}</span>
                        </div>

                        <GradientButton
                          variant="outline"
                          size="sm"
                          className="w-full group/btn"
                        >
                          Explore Program
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </GradientButton>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )
            })}
          </div>
        </ScrollAnimation>

        {/* CTA Section */}
        <ScrollAnimation variant="fadeUp" delay={1}>
          <div className="text-center mt-20">
            <GlassCard variant="glow" glowColor="electric-purple" className="p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-foreground">
                Not Sure Which Program to Choose?
              </h3>
              <p className="text-body text-muted-foreground mb-8 max-w-2xl mx-auto">
                Take our free assessment test and get personalized recommendations based on your skills and career goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GradientButton variant="primary" size="lg">
                  Take Assessment Test
                </GradientButton>
                <GradientButton variant="secondary" size="lg">
                  Talk to Advisor
                </GradientButton>
              </div>
            </GlassCard>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
