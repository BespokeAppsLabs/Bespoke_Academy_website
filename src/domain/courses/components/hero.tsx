"use client";

import { motion } from "framer-motion";
import { BespokeAnimation, BespokeButton } from "@/components/ui/bespoke";

export default function Hero() {
  return (
    <section className="relative min-h-[50vh] bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center overflow-hidden">
      <BespokeAnimation preset="curtain-reveal" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-emerald-100/10 to-transparent" />
      </BespokeAnimation>

      <div className="relative z-10 text-center px-4">
        <BespokeAnimation preset="slide-in-up" delay={0.2}>
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
              Grades 8-11 • Ages 13-17
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your AI & <span className="text-emerald-600">Robotics Path</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            No experience required! Join our 40-week structured curriculum with hands-on Friday sessions
            and transform from curious beginner to confident creator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BespokeButton variant="bespoke-primary" size="lg">
              View Curriculum
            </BespokeButton>
            <BespokeButton variant="bespoke-outline" size="lg">
              Parent Information
            </BespokeButton>
          </div>
        </BespokeAnimation>

        <BespokeAnimation preset="slide-in-up" delay={0.4} className="mt-12">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">🎯</span>
              <span>Grades 8-11 Focus</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">📅</span>
              <span>Friday Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">🏗️</span>
              <span>40-Week Program</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">👥</span>
              <span>Parent Engagement</span>
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