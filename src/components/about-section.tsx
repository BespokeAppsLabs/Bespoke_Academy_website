"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { cn } from "@/lib/utils"

export function AboutSection() {
  const values = [
    {
      number: "01",
      title: "Safety First",
      description: "Professional supervision, age-appropriate content, and protected learning environment",
      color: "cyber-blue",
      icon: "🛡️"
    },
    {
      number: "02",
      title: "Hands-On Learning",
      description: "Real projects every week with equipment students build and keep as their own",
      color: "electric-purple",
      icon: "🔧"
    },
    {
      number: "03",
      title: "Future Ready",
      description: "Building confidence, creativity, and problem-solving skills for tomorrow's careers",
      color: "neon-cyan",
      icon: "🚀"
    }
  ]

  const stats = [
    { value: 40, suffix: "+", label: "Weeks Curriculum", icon: "📚" },
    { value: 5000, suffix: "+", label: "Equipment Value", icon: "💰" },
    { value: 8, suffix: "-11", label: "Grade Levels", icon: "🎓" },
    { value: 100, suffix: "%", label: "Project-Based", icon: "🎯" }
  ]

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-50" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollAnimation variant="fadeUp" delay={0}>
          <div className="mx-auto max-w-4xl space-y-8 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
              About Bespoke Academy
            </h2>

            <p className="text-body-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Transform your career from technology user to confident creator through our comprehensive
              AI education programs. We provide an innovative learning environment where students develop
              essential technical skills while building confidence, problem-solving abilities, and future-ready capabilities.
            </p>
          </div>
        </ScrollAnimation>

        {/* Stats Section */}
        <ScrollAnimation variant="fadeUp" delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index}>
                <GlassCard variant="elevated" className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-2xl font-bold text-cyber-blue mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </GlassCard>
              </div>
            ))}
          </div>
        </ScrollAnimation>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <ScrollAnimation variant="slideLeft" delay={0.5}>
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-semibold text-foreground">
                Learning by Creating
              </h3>
              <p className="text-body text-muted-foreground leading-relaxed">
                Our program combines hands-on learning with practical applications, ensuring each student builds
                their personal AI toolkit worth thousands. We believe in learning by creating, not memorizing, with
                challenges that inspire curiosity and innovation while maintaining the highest standards of excellence.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                From complete beginner to AI expert, our curriculum is designed to take you on a transformative journey
                where you'll build real AI applications, create your portfolio, and develop the confidence to tackle
                complex technological challenges.
              </p>

              <div className="pt-4">
                <GradientButton variant="primary" size="lg">
                  Explore Our Approach
                </GradientButton>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation variant="slideRight" delay={0.6}>
            <GlassCard variant="glow" glowColor="cyber-blue" className="p-8">
              <div className="space-y-6">
                <h4 className="text-h3 font-semibold text-center">What Makes Us Different</h4>

                <div className="space-y-4">
                    {[
                    "Industry-aligned curriculum updated quarterly",
                    "Expert instructors from top tech companies",
                    "Personalized learning paths and mentorship",
                    "Career support and job placement assistance"
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-surface-elevated/50 hover:bg-surface-elevated/70 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-tech-green" />
                      <span className="text-body-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </ScrollAnimation>
        </div>

        {/* Mission Values */}
        <ScrollAnimation variant="fadeUp" delay={0.8}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-semibold mb-8 text-foreground">
              Our Core Values
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
                <GlassCard
                  key={index}
                  variant="elevated"
                  className="group hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="space-y-4 p-6">
                    <div
                      className="w-16 h-16 mx-auto rounded-2xl bg-cyber-blue/10 flex items-center justify-center text-2xl border border-cyber-blue/20"
                    >
                      {value.icon}
                    </div>

                    <div className="text-3xl font-bold text-cyber-blue">
                      {value.number}
                    </div>

                    <h4 className="text-h4 font-semibold">{value.title}</h4>

                    <p className="text-body-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </ScrollAnimation>

        {/* CTA Section */}
        <ScrollAnimation variant="fadeUp" delay={1}>
          <div className="text-center mt-16">
            <GlassCard variant="glow" glowColor="electric-purple" className="p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-foreground">
                Ready to Transform Your Future?
              </h3>
              <p className="text-body text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students who have already transformed their careers with our
                comprehensive AI education programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GradientButton variant="primary" size="lg">
                  Start Your Journey
                </GradientButton>
                <GradientButton variant="secondary" size="lg">
                  Download Brochure
                </GradientButton>
              </div>
            </GlassCard>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
