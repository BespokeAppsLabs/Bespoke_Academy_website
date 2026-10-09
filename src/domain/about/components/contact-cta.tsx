"use client";

import { BespokeButton, BespokeAnimation } from "@/components/ui/bespoke";
import { site } from "@/config/site";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-zinc-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <BespokeAnimation preset="slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
              Applications are open
            </h2>
            <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
              Places are limited. Apply now, or ask us anything about the programme first.
            </p>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BespokeButton href="/#contact" variant="bespoke-primary" size="lg">
                Apply now
              </BespokeButton>
              <BespokeButton href={site.whatsapp.href} variant="bespoke-outline" size="lg">
                WhatsApp Us
              </BespokeButton>
            </div>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-up" delay={0.3} className="mt-12">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-600">
              <a href={`mailto:${site.email}`} className="hover:text-primary-emerald-600">📧 {site.email}</a>
              <a href={site.whatsapp.href} className="hover:text-primary-emerald-600">💬 {site.whatsapp.display}</a>
            </div>
          </BespokeAnimation>
        </div>
      </div>
    </section>
  );
}
