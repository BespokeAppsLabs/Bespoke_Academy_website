"use client";

import { BespokeCard, BespokeAnimation } from "@/components/ui/bespoke";
import { GoldUnderline } from "@/components/ui/gold-underline";

export default function Story() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <BespokeAnimation preset="slide-in-left" className="order-2 lg:order-1">
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-lg p-8 border border-neutral-200/50">
                <div className="aspect-video bg-zinc-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <p className="text-gray-600 font-medium">Founded in 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-right" delay={0.2} className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-emerald-600"><GoldUnderline>Story</GoldUnderline></span>
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Bespoke Academy was founded with a clear mission: to prepare Grades 8-11 students for a future where AI and robotics are part of everyday life. We noticed that teens were falling behind in technological literacy, despite living in an increasingly digital world.
              </p>
              <p>
                Traditional schools struggle to keep pace with rapid technological advancement, leaving curious teens without proper guidance to explore AI and robotics. We created a program that transforms computer anxiety into confidence through hands-on, project-based learning.
              </p>
              <p>
                Our programme meets every weekend in Lephalale, Limpopo, for learners from Lephalale, Onverwacht, Marapong and the surrounding Waterberg area. Students join any month and move up a level when they pass its checkpoint, progressing from complete beginners to confident creators. We combine engaging projects, AI-powered learning assistance, and a supportive environment where mistakes are celebrated as learning opportunities.
              </p>
            </div>
            <BespokeCard variant="course-card" className="mt-8 p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Vision</h3>
                  <p className="text-gray-600">Empowering every Grades 8-11 student to thrive in an AI-driven future through confidence-building, hands-on technology education.</p>
                </div>
              </div>
            </BespokeCard>
          </BespokeAnimation>
        </div>
      </div>
    </section>
  );
}