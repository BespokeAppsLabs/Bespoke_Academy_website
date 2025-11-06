import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ModuleDetail } from "@/components/curriculum/module-detail"
import { phase4Data } from "@/data/curriculum"

export default function Module4Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <ModuleDetail module={phase4Data} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Phase 4: Integrated AI-Robotics Projects | Bespoke Academy",
  description: "Complete your journey with capstone projects and portfolio development in this culminating 12-week phase covering system integration, innovation, and college preparation.",
}