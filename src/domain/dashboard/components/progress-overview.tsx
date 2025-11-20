"use client";

import { BespokeCard, BespokeAnimation, AnimatedCounter } from "@/components/ui/bespoke";

export default function ProgressOverview() {
  const overallProgress = 37; // 3 out of 8 weeks completed in Phase 1

  return (
    <BespokeCard variant="premium-card" className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Learning Journey 🚀</h2>
        <span className="text-sm text-gray-500">Last Friday session</span>
      </div>

      <BespokeAnimation preset="slide-in-up">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Phase 1 Progress</span>
            <span className="text-sm font-semibold text-emerald-600">
              <AnimatedCounter to={overallProgress} duration={2000} />%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
              style={{ width: `${overallProgress}%` }}
            >
              <span className="text-xs text-white font-semibold">Week 3 of 8</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-3xl font-bold text-emerald-700 mb-1">
              <AnimatedCounter to={3} duration={1500} />
            </div>
            <div className="text-sm text-emerald-600">Projects Built 🤖</div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-700 mb-1">
              <AnimatedCounter to={7} duration={1500} />
            </div>
            <div className="text-sm text-blue-600">Skills Learned ⚡</div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-700 mb-1">
              <AnimatedCounter to={92} duration={1500} />%
            </div>
            <div className="text-sm text-purple-600">Fun Level! 🎉</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Next Friday's Project</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <p className="font-medium text-gray-900">Build a Personal Calculator</p>
                <p className="text-sm text-gray-600">Learn Python input/output</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-emerald-600">Ready!</p>
              <p className="text-xs text-gray-500">Week 4</p>
            </div>
          </div>
        </div>

        {/* Parent Connection */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-lg border-2 border-emerald-200">
          <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
            <span>👨‍👩‍👧‍👦</span> Parent Connection
          </h4>
          <p className="text-sm text-emerald-700 mb-3">
            Your parents can see your amazing progress and photos of your creations!
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-emerald-600">3</div>
              <div className="text-xs text-emerald-600">Projects shared</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-600">2</div>
              <div className="text-xs text-emerald-600">Parent views</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-600">5</div>
              <div className="text-xs text-emerald-600">Achievements</div>
            </div>
          </div>
        </div>
      </BespokeAnimation>
    </BespokeCard>
  );
}