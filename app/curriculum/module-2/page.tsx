import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ModuleDetail } from "@/components/curriculum/module-detail"
import { phase2Data } from "@/data/curriculum"

export default function Module2Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <ModuleDetail module={phase2Data} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Phase 2: Electronics & Robotics Basics | Bespoke Academy",
  description: "Build first robots and understand electronics in this exciting 8-week phase covering circuit design, Raspberry Pi programming, and sensor integration.",
}