import { ModernHeader } from "@/components/modern-header"
import { ModernFooter } from "@/components/modern-footer"
import { EnhancedCurriculumOverview } from "./curriculum-overview"

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
  title: "AI & Robotics Curriculum | Bespoke Academy",
  description: "Explore our comprehensive 40-week AI & Robotics program for Grades 8-11. Master digital foundations, electronics, AI concepts, and advanced robotics through hands-on Friday sessions.",
}