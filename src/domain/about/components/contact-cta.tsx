"use client";

import { BespokeButton, BespokeAnimation } from "@/components/ui/bespoke";
import { site } from "@/config/site";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
      <BespokeAnimation preset="curtain-reveal" className="absolute inset-0">
        <div className="absolute inset-0 bg-black/10" />
      </BespokeAnimation>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <BespokeAnimation preset="slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Applications for {site.intakeYear} are open
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Places are limited. Apply now, or ask us anything about the programme first.
            </p>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BespokeButton href="/#contact" variant="bespoke-primary" size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                Apply for {site.intakeYear}
              </BespokeButton>
              <BespokeButton href={site.whatsapp.href} variant="bespoke-outline" size="lg" className="border-white text-white hover:bg-white hover:text-emerald-600">
                WhatsApp Us
              </BespokeButton>
            </div>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-up" delay={0.3} className="mt-12">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-100">
              <a href={`mailto:${site.email}`} className="hover:text-white">📧 {site.email}</a>
              <a href={site.whatsapp.href} className="hover:text-white">💬 {site.whatsapp.display}</a>
            </div>
          </BespokeAnimation>
        </div>
      </div>
    </section>
  );
}
