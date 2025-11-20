"use client";

import { motion } from "framer-motion";
import { BespokeButton, BespokeAnimation, BespokeCard } from "@/components/ui/bespoke";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
      <BespokeAnimation preset="curtain-reveal" className="absolute inset-0">
        <div className="absolute inset-0 bg-black/10" />
      </BespokeAnimation>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <BespokeAnimation preset="slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful career changers who have already transformed their lives through our personalized learning approach.
            </p>
          </BespokeAnimation>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <BespokeAnimation preset="slide-in-up" delay={0.2}>
              <BespokeCard variant="stats-card" className="text-center p-6">
                <div className="text-4xl font-bold text-emerald-700 mb-2">10,000+</div>
                <div className="text-emerald-600 font-medium">Students Transformed</div>
              </BespokeCard>
            </BespokeAnimation>

            <BespokeAnimation preset="slide-in-up" delay={0.3}>
              <BespokeCard variant="stats-card" className="text-center p-6">
                <div className="text-4xl font-bold text-emerald-700 mb-2">95%</div>
                <div className="text-emerald-600 font-medium">Career Placement</div>
              </BespokeCard>
            </BespokeAnimation>

            <BespokeAnimation preset="slide-in-up" delay={0.4}>
              <BespokeCard variant="stats-card" className="text-center p-6">
                <div className="text-4xl font-bold text-emerald-700 mb-2">4.9/5</div>
                <div className="text-emerald-600 font-medium">Student Rating</div>
              </BespokeCard>
            </BespokeAnimation>
          </div>

          <BespokeAnimation preset="slide-in-up" delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BespokeButton variant="bespoke-primary" size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                Start Your Journey
              </BespokeButton>
              <BespokeButton variant="bespoke-outline" size="lg" className="border-white text-white hover:bg-white hover:text-emerald-600">
                Schedule a Call
              </BespokeButton>
            </div>
          </BespokeAnimation>

          <BespokeAnimation preset="slide-in-up" delay={0.6} className="mt-12">
            <div className="text-emerald-100">
              <p className="mb-2">Questions? We're here to help.</p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <span>📧 hello@bespoke-academy.com</span>
                <span>📱 +1 (555) 123-4567</span>
                <span>💬 Live Chat Available</span>
              </div>
            </div>
          </BespokeAnimation>
        </div>
      </div>
    </section>
  );
}