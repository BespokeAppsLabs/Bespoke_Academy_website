"use client";

import { ModernHeader } from "@/components/modern-header";
import { ModernFooter } from "@/components/modern-footer";
import {
  Hero,
  Story,
  Values,
  ContactCTA
} from './components';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <ModernHeader />
      <main className="pt-16">
        <Hero />
        <Story />
        <Values />
        <ContactCTA />
      </main>
      <ModernFooter />
    </div>
  );
}