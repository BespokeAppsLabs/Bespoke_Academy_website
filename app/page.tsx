import { ModernHeader } from "@/components/modern-header"
import { HeroSection3D } from "@/components/hero-section-3d"
import { AboutSectionBento } from "@/components/about-section-bento"
import { ProgramsSection } from "@/components/programs-section"
import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel"
import { ContactSection } from "@/components/contact-section"
import { ModernFooter } from "@/components/modern-footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      <ModernHeader />
      <main className="pt-16">
        <HeroSection3D />
        <AboutSectionBento />
        <ProgramsSection />
        <TestimonialsCarousel />

        {/* Curriculum Overview CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Ready to Master AI?
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Explore our comprehensive 20-week AI Career Advancement Program with hands-on learning, expert instruction, and industry-recognized certification.
              </p>
              <Link href="/curriculum">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full">
                  Explore Curriculum
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <ModernFooter />
    </div>
  )
}
