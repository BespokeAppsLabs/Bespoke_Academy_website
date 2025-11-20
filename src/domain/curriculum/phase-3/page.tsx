import { ModernHeader } from "@/components/modern-header"
import { ModernFooter } from "@/components/modern-footer"
import { BespokeCard, BespokeAnimation, BespokeBadge, BespokeButton } from "@/components/ui/bespoke"
import { Globe, Clock, Users, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Phase3Page() {
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
                Phase 3 • Weeks 17-28
              </BespokeBadge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-emerald-600 mb-6">
                AI Concepts & Tools
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Understand and use AI as a creative assistant. Learn computer vision,
                voice recognition, and how to train your own AI models.
              </p>
            </div>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-up" delay={0.3}>
            <BespokeCard variant="premium-card" className="p-8 text-center">
              <Globe className="h-16 w-16 text-primary-emerald-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Phase 3 Coming Soon</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're developing our comprehensive AI curriculum that will teach students
                to use AI as a creative assistant while understanding its capabilities and limitations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/curriculum/phase-2">
                  <BespokeButton variant="bespoke-outline" size="lg">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Phase 2
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
  title: "Phase 3: AI Concepts & Tools | Bespoke Academy",
  description: "Learn AI concepts and tools in this 12-week advanced phase for Grades 8-11. Master computer vision, voice recognition, and AI model training.",
}