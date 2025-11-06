import { ModernHeader } from "@/components/modern-header"
import { ModernFooter } from "@/components/modern-footer"
import { EnhancedCurriculumOverview } from "@/components/curriculum/enhanced-curriculum-overview"

export default function CurriculumPage() {
  return (
    <div className="min-h-screen">
      <ModernHeader />
      <main className="pt-20 md:pt-32 pb-4">
        <div className="container mx-auto px-4">
          <EnhancedCurriculumOverview />
        </div>
      </main>
      <ModernFooter />
    </div>
  )
}

export const metadata = {
  title: "AI Career Advancement Curriculum | Bespoke Academy",
  description: "Explore our comprehensive 20-week AI Career Advancement Program with 4 modules covering AI fundamentals, advanced tools, industry specialization, and capstone projects.",
}