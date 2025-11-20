"use client";

import { BespokeAnimation, BespokeButton } from "@/components/ui/bespoke";

export default function Welcome() {
  const currentHour = new Date().getHours();
  let greeting = "Hey there";
  if (currentHour >= 12 && currentHour < 17) greeting = "Good afternoon";
  else if (currentHour >= 17) greeting = "Good evening";

  return (
    <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <BespokeAnimation preset="slide-in-left">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                  Grades 8-11 Student
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {greeting}, Alex! 🚀
              </h1>
              <p className="text-emerald-100 text-lg">
                Ready for another awesome Friday session? Let's build something cool!
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <span>3 Friday sessions completed!</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  <span>Currently: Phase 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span>Robot builder in training</span>
                </div>
              </div>
            </BespokeAnimation>
          </div>

          <BespokeAnimation preset="slide-in-right" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3">
              <BespokeButton
                variant="bespoke-primary"
                className="bg-white text-emerald-600 hover:bg-emerald-50"
              >
                Today's Project
              </BespokeButton>
              <BespokeButton
                variant="bespoke-outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600"
              >
                My Creations
              </BespokeButton>
            </div>
          </BespokeAnimation>
        </div>

        {/* Parent Access Notice */}
        <BespokeAnimation preset="slide-in-up" delay={0.4} className="mt-8 pt-8 border-t border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <div>
                <p className="text-sm font-semibold">Parent Dashboard Available</p>
                <p className="text-emerald-100 text-sm">Your parents can view your progress and achievements</p>
              </div>
            </div>
            <BespokeButton
              variant="bespoke-outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600 text-sm"
            >
              Invite Parents
            </BespokeButton>
          </div>
        </BespokeAnimation>
      </div>
    </section>
  );
}