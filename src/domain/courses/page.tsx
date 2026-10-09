"use client";

import { ModernHeader } from "@/components/modern-header";
import { ModernFooter } from "@/components/modern-footer";
import {
  Hero,
  FeaturedCourses,
  Pricing,
  EnrollmentCTA
} from './components';

export default function CoursesPage({ country }: { country: string | null }) {
  return (
    <div className="min-h-screen bg-white">
      <ModernHeader />
      <main className="pt-16">
        <Hero />
        <FeaturedCourses />
        <Pricing country={country} />
        <EnrollmentCTA />
      </main>
      <ModernFooter />
    </div>
  );
}
