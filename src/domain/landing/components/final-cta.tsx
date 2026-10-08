"use client";

import { motion } from "motion/react";
import { BespokeButton } from "@/components/ui/bespoke/bespokeButton";
import { BespokeCard } from "@/components/ui/bespoke/bespokeCard";
import { Magnetic } from "@/components/ui/magnetic";
import { StaggerContainer } from "@/components/ui/bespoke/bespokeAnimation";
import { ParallelLinesBackground } from "@/components/ui/parallel-lines-background";
import {
  ArrowRight
} from "lucide-react";
import { GoldUnderline } from "@/components/ui/gold-underline";

export default function FinalCTA() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="gradient" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold-700 text-sm font-semibold tracking-wider uppercase">
              Ready to Build Your Future?
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-zinc-900">
              Start Your AI & Robotics
              <span className="text-emerald-500 block"><GoldUnderline>Journey Today.</GoldUnderline></span>
            </h2>

            <p className="text-xl text-zinc-600 mb-8 leading-relaxed">
              Applications are open for the 2027 intake. Our 40-week curriculum takes Grades 8-11 learners
              from complete beginner to building AI-powered robots. Build real projects, develop critical thinking skills, and prepare for
              the technology-driven future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Magnetic>
              <BespokeButton
                href="/#contact"
                variant="bespoke-primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                animation="scale"
              >
                Apply for 2027
              </BespokeButton>
              </Magnetic>

              <BespokeButton
                href="/#contact"
                variant="bespoke-outline"
                size="lg"
                animation="scale"
              >
                Ask a Question
              </BespokeButton>
            </div>

          </motion.div>

          {/* Right Content - Feature Cards */}
          <StaggerContainer className="space-y-6" staggerDelay={0.12}>
            <BespokeCard
              variant="premium-card"
              animation="float"
              delay={0.2}
              className="group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src="/stack/firebase-svgrepo-com.svg"
                    alt="Learning Platform"
                    className="w-8 h-8 object-contain opacity-80"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                    Friday Sessions
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    Weekly Friday classes designed for teen schedules. Perfect for after-school learning
                    with hands-on AI and Robotics projects.
                  </p>
                </div>
              </div>
            </BespokeCard>

            <BespokeCard
              variant="premium-card"
              animation="float"
              delay={0.3}
              className="group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src="/stack/openai-svgrepo-com.svg"
                    alt="AI Projects"
                    className="w-8 h-8 object-contain opacity-80"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                    Project-Based Learning
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    Build real AI applications and robots. Create your portfolio while mastering
                    Python, Machine Learning, and Hardware Integration.
                  </p>
                </div>
              </div>
            </BespokeCard>

            <BespokeCard
              variant="premium-card"
              animation="float"
              delay={0.4}
              className="group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src="/stack/google-icon-logo-svgrepo-com.svg"
                    alt="Career Preparation"
                    className="w-8 h-8 object-contain opacity-80"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                    College & Career Prep
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    Gain skills that impress colleges and future employers. Perfect foundation for
                    computer science degrees and tech careers.
                  </p>
                </div>
              </div>
            </BespokeCard>
          </StaggerContainer>
        </div>

        {/* Bottom Stats/Features */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <BespokeCard
            variant="feature-card"
            size="lg"
            className="bg-white/80 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-zinc-900 mb-6">
              Why Parents Choose Bespoke Academy?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img
                    src="/stack/arduino-1.svg"
                    alt=""
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h4 className="font-semibold text-zinc-900 mb-2">Hands-On Hardware</h4>
                <p className="text-sm text-zinc-600">Learners build with real electronics, sensors and microcontrollers every week</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img
                    src="/stack/visual-studio-code-1-1.svg"
                    alt=""
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h4 className="font-semibold text-zinc-900 mb-2">Portfolio of Real Projects</h4>
                <p className="text-sm text-zinc-600">Every phase ends in a project learners can show schools and future employers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img
                    src="/stack/hostinger.svg"
                    alt=""
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h4 className="font-semibold text-zinc-900 mb-2">Safe Learning Environment</h4>
                <p className="text-sm text-zinc-600">Small, supervised Friday sessions with progress updates for parents</p>
              </div>
            </div>
          </BespokeCard>
        </motion.div>
      </div>
    </section>
  );
}

export type FinalCTAProps = {};