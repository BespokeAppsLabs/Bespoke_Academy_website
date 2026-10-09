"use client";

import { BespokeButton, BespokeAnimation, BespokeCard } from "@/components/ui/bespoke";
import { site } from "@/config/site";

export default function EnrollmentCTA() {
  return (
    <section className="py-20 bg-zinc-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <BespokeAnimation preset="slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
              Ready to Transform Your Teen's Future?
            </h2>
            <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
              Applications are open for Grades 8-11 learners. {site.program.start}.
            </p>
          </BespokeAnimation>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <BespokeAnimation preset="slide-in-up" delay={0.2}>
              <BespokeCard variant="stats-card" className="text-center p-6">
                <div className="text-4xl font-bold text-primary-emerald-600 mb-2">Grades</div>
                <div className="text-zinc-600 font-medium">8-11 Focus</div>
              </BespokeCard>
            </BespokeAnimation>

            <BespokeAnimation preset="slide-in-up" delay={0.3}>
              <BespokeCard variant="stats-card" className="text-center p-6">
                <div className="text-4xl font-bold text-primary-emerald-600 mb-2">2 Streams</div>
                <div className="text-zinc-600 font-medium">Engineering & Media</div>
              </BespokeCard>
            </BespokeAnimation>

            <BespokeAnimation preset="slide-in-up" delay={0.4}>
              <BespokeCard variant="stats-card" className="text-center p-6">
                <div className="text-4xl font-bold text-primary-emerald-600 mb-2">Weekend</div>
                <div className="text-zinc-600 font-medium">Sessions</div>
              </BespokeCard>
            </BespokeAnimation>
          </div>

          <BespokeAnimation preset="slide-in-up" delay={0.5}>
            <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-semibold text-zinc-900 mb-6">
                Why Parents Choose Bespoke Academy?
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-zinc-900">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold mb-1">Age-Appropriate</h4>
                  <p className="text-sm text-zinc-600">Designed for teens</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <h4 className="font-semibold mb-1">Hands-On</h4>
                  <p className="text-sm text-zinc-600">Real hardware every week</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                  <h4 className="font-semibold mb-1">Parent Updates</h4>
                  <p className="text-sm text-zinc-600">Regular progress updates</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <h4 className="font-semibold mb-1">Portfolio Ready</h4>
                  <p className="text-sm text-zinc-600">Real project experience</p>
                </div>
              </div>
            </div>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-up" delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BespokeButton href="/#contact" variant="bespoke-primary" size="lg">
                Apply now
              </BespokeButton>
              <BespokeButton href={site.whatsapp.href} variant="bespoke-outline" size="lg">
                WhatsApp Us
              </BespokeButton>
            </div>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-up" delay={0.7} className="mt-12">
            <div className="text-zinc-600">
              <p className="mb-2 font-medium">Questions about our program?</p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href={`mailto:${site.email}`} className="hover:text-primary-emerald-600">📧 {site.email}</a>
                <a href={site.whatsapp.href} className="hover:text-primary-emerald-600">💬 {site.whatsapp.display}</a>
              </div>
            </div>
          </BespokeAnimation>
        </div>
      </div>
    </section>
  );
}