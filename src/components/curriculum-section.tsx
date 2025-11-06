"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { EnhancedCurriculumOverview } from "@/components/curriculum/enhanced-curriculum-overview"

export function CurriculumSection() {
  return (
    <section id="curriculum" className="section-padding relative overflow-hidden pt-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-30" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimation variant="fadeUp" delay={0}>
            <EnhancedCurriculumOverview />
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}