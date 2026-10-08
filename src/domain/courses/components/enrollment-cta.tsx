"use client";

import { BespokeButton, BespokeAnimation, BespokeCard } from "@/components/ui/bespoke";
import { site } from "@/config/site";

export default function EnrollmentCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-emerald-600 relative overflow-hidden">
      <BespokeAnimation preset="curtain-reveal" className="absolute inset-0">
        <div className="absolute inset-0 bg-black/10" />
      </BespokeAnimation>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <BespokeAnimation preset="slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Teen's Future?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Applications for the {site.intakeYear} intake are open for Grades 8-11 learners
            </p>
          </BespokeAnimation>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <BespokeAnimation preset="slide-in-up" delay={0.2}>
              <BespokeCard variant="stats-card" className="text-center p-6">
                <div className="text-4xl font-bold text-blue-700 mb-2">Grades</div>
                <div className="text-blue-600 font-medium">8-11 Focus</div>
              </BespokeCard>
            </BespokeAnimation>

            <BespokeAnimation preset="slide-in-up" delay={0.3}>
              <BespokeCard variant="stats-card" className="text-center p-6">
                <div className="text-4xl font-bold text-blue-700 mb-2">40-Week</div>
                <div className="text-blue-600 font-medium">Structured Program</div>
              </BespokeCard>
            </BespokeAnimation>

            <BespokeAnimation preset="slide-in-up" delay={0.4}>
              <BespokeCard variant="stats-card" className="text-center p-6">
                <div className="text-4xl font-bold text-blue-700 mb-2">Friday</div>
                <div className="text-blue-600 font-medium">Sessions</div>
              </BespokeCard>
            </BespokeAnimation>
          </div>

          <BespokeAnimation preset="slide-in-up" delay={0.5}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Why Parents Choose Bespoke Academy?
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold mb-1">Age-Appropriate</h4>
                  <p className="text-sm text-blue-100">Designed for teens</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <h4 className="font-semibold mb-1">Hands-On</h4>
                  <p className="text-sm text-blue-100">Real hardware every week</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                  <h4 className="font-semibold mb-1">Parent Updates</h4>
                  <p className="text-sm text-blue-100">Regular progress updates</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <h4 className="font-semibold mb-1">Portfolio Ready</h4>
                  <p className="text-sm text-blue-100">Real project experience</p>
                </div>
              </div>
            </div>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-up" delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BespokeButton href="/#contact" variant="bespoke-primary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Apply for {site.intakeYear}
              </BespokeButton>
              <BespokeButton href={site.whatsapp.href} variant="bespoke-outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                WhatsApp Us
              </BespokeButton>
            </div>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-up" delay={0.7} className="mt-12">
            <div className="text-blue-100">
              <p className="mb-2 font-medium">Questions about our program?</p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href={`mailto:${site.email}`} className="hover:text-white">📧 {site.email}</a>
                <a href={site.whatsapp.href} className="hover:text-white">💬 {site.whatsapp.display}</a>
              </div>
            </div>
          </BespokeAnimation>
        </div>
      </div>
    </section>
  );
}