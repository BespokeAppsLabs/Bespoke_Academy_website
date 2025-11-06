import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ModuleDetail } from "@/components/curriculum/module-detail"
import { phase3Data } from "@/data/curriculum"

export default function Module3Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <ModuleDetail module={phase3Data} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Phase 3: AI Concepts & Tools | Bespoke Academy",
  description: "Integrate artificial intelligence and advanced sensors in this transformative 12-week phase covering computer vision, voice recognition, and AI-robotics integration.",
}