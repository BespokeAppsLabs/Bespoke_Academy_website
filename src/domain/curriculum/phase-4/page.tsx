import { ModernHeader } from "@/components/modern-header"
import { ModernFooter } from "@/components/modern-footer"
import { BespokeCard, BespokeAnimation, BespokeBadge, BespokeButton } from "@/components/ui/bespoke"
import { Award, Clock, Users, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Phase4Page() {
  return (
    <div className="min-h-screen">
      <ModernHeader />
      <main className="pt-20 md:pt-32 pb-4">
        <div className="container mx-auto px-4">
          <Link href="/curriculum">
            <BespokeButton variant="bespoke-outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Curriculum
            </BespokeButton>
          </Link>

          <BespokeAnimation preset="slide-in-up">
            <div className="text-center mb-12">
              <BespokeBadge variant="level-badge" className="mb-4">
                Phase 4 • Weeks 29-40
              </BespokeBadge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-emerald-600 mb-6">
                Advanced AI-Robotics Projects
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Combine all your skills to create unique AI-assisted robotic prototypes.
                Design, build, and program your own innovations for the final showcase.
              </p>
            </div>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-up" delay={0.3}>
            <BespokeCard variant="premium-card" className="p-8 text-center">
              <Award className="h-16 w-16 text-primary-emerald-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Phase 4 Coming Soon</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                The capstone phase will bring together all learning from the previous phases
                as students create their own AI-assisted robotics projects and portfolios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/curriculum/phase-3">
                  <BespokeButton variant="bespoke-outline" size="lg">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Phase 3
                  </BespokeButton>
                </Link>
              </div>
            </BespokeCard>
          </BespokeAnimation>
        </div>
      </main>
      <ModernFooter />
    </div>
  )
}

export const metadata = {
  title: "Phase 4: Advanced Projects | Bespoke Academy",
  description: "Create advanced AI-robotics projects in this 12-week capstone phase for Grades 8-11. Build your portfolio and showcase your innovations.",
}