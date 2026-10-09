"use client";

import { BespokeAnimation, BespokeButton } from "@/components/ui/bespoke";
import { GoldUnderline } from "@/components/ui/gold-underline";

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] bg-white flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4">
        <BespokeAnimation preset="slide-in-up" delay={0.2}>
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
              Designed for Grades 8-11 • Ages 13-17
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-emerald-600"><GoldUnderline>Bespoke Academy</GoldUnderline></span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transforming teens from curious beginners to confident AI & robotics creators
            through our hands-on, level-by-level curriculum and supportive weekend learning sessions in Lephalale, Limpopo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BespokeButton href="/curriculum" variant="bespoke-primary" size="lg">
              View Curriculum
            </BespokeButton>
            <BespokeButton href="/#contact" variant="bespoke-outline" size="lg">
              Apply now
            </BespokeButton>
          </div>
        </BespokeAnimation>

        <BespokeAnimation preset="slide-in-up" delay={0.4} className="mt-12">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">🎓</span>
              <span>Engineering & Media Streams</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">👨‍👩‍👧‍👦</span>
              <span>Parent Engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">📅</span>
              <span>Weekend Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">🤖</span>
              <span>AI & Robotics Focus</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">🚀</span>
              <span>No Experience Required</span>
            </div>
          </div>
        </BespokeAnimation>
      </div>
    </section>
  );
}