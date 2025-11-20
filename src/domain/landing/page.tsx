"use client";


import { ModernFooter } from "@/components/modern-footer";
import {
  Hero,
  Features,
  LogoCloud,
  StickyScroll,
  Stats,
  Contact,
  FinalCTA
} from './components';
import { BespokeTopNav } from "@/components/ui/bespoke";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <BespokeTopNav />
      <main>
        <Hero />
        <Features />
        <LogoCloud />
        <StickyScroll />
        <Stats />
        <Contact />
        <FinalCTA />
      </main>
      <ModernFooter />
    </div>
  );
}