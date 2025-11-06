import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ModuleDetail } from "@/components/curriculum/module-detail"
import { phase1Data } from "@/data/curriculum"

export default function Module1Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <ModuleDetail module={phase1Data} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Phase 1: Digital Foundations | Bespoke Academy",
  description: "Build computer confidence and basic programming skills in this comprehensive 8-week phase covering digital literacy, visual programming, and problem-solving.",
}