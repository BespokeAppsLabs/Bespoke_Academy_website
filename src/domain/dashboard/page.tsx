"use client";

import { ModernHeader } from "@/components/modern-header";
import { ModernFooter } from "@/components/modern-footer";
import {
  Welcome,
  ProgressOverview,
  CurrentCourses,
  Achievements,
  Schedule,
  QuickActions,
  Stats
} from './components';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ModernHeader />
      <main className="pt-16">
        <Welcome />

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              <ProgressOverview />
              <CurrentCourses />
              <Schedule />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Stats />
              <Achievements />
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
      <ModernFooter />
    </div>
  );
}