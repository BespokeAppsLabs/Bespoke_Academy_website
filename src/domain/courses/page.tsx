"use client";

import { ModernHeader } from "@/components/modern-header";
import { ModernFooter } from "@/components/modern-footer";
import {
  Hero,
  Catalog,
  Filters,
  FeaturedCourses,
  EnrollmentCTA
} from './components';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white">
      <ModernHeader />
      <main className="pt-16">
        <Hero />
        <FeaturedCourses />
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Filters />
            </div>
            <div className="lg:col-span-3">
              <Catalog />
            </div>
          </div>
        </div>
        <EnrollmentCTA />
      </main>
      <ModernFooter />
    </div>
  );
}