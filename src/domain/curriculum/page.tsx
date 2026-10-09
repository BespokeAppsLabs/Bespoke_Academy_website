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
  title: "Engineering & Media Curriculum",
  description: "Explore the Engineering and Media streams for Grades 8-11: coding, AI, electronics and robotics, or AI images, video and Blender 3D. Weekend classes in Lephalale, Limpopo. Join any month.",
  alternates: { canonical: "/curriculum" },
}