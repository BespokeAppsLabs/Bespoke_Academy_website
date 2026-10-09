"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Marquee } from "@/components/ui/marquee";
import { BespokeCard } from "@/components/ui/bespoke/bespokeCard";
import { BespokeButton } from "@/components/ui/bespoke/bespokeButton";
import { ParallelLinesBackground } from "@/components/ui/parallel-lines-background";
import { Sparkles } from "lucide-react";

// AI Robotics curriculum technologies - real-world tools teens will learn
const curriculumTech = [
  { name: "Python", logo: "/stack/python.svg", category: "Programming" },
  { name: "TypeScript", logo: "/stack/typescript-svgrepo-com.svg", category: "Programming" },
  { name: "React", logo: "/stack/react-1-logo-svgrepo-com.svg", category: "Framework" },
  { name: "Next.js", logo: "/stack/nextjs-2.svg", category: "Framework" },
  { name: "Arduino", logo: "/stack/arduino-1.svg", category: "Hardware" },
  { name: "VS Code", logo: "/stack/visual-studio-code-1-1.svg", category: "Editor" },
  { name: "Firebase", logo: "/stack/firebase-svgrepo-com.svg", category: "Database" },
  { name: "MongoDB", logo: "/stack/mongodb-icon-2.svg", category: "Database" },
  { name: "Express", logo: "/stack/express-svgrepo-com.svg", category: "Backend" },
  { name: "Expo", logo: "/stack/expo-1.svg", category: "Mobile" },
];


export default function LogoCloudSection() {
  return (
    <section className="py-20 bg-white text-zinc-900 relative overflow-hidden">
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="light" />

      {/* Floating Elements (fixed positions, decorative) */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {[
          { left: 8, top: 20 },
          { left: 82, top: 12 },
          { left: 70, top: 78 },
          { left: 18, top: 70 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 rounded-full bg-gold-500/10"
            style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-gold-700 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Industry-Standard Curriculum
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-zinc-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Learn <span className="text-emerald-600">{curriculumTech.length}</span> Real-World Tools
          </motion.h2>

          <motion.p
            className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Your child will learn the cutting-edge tools and frameworks powering today&apos;s AI revolution.
            Our curriculum covers everything from programming fundamentals to advanced AI applications.
          </motion.p>
        </motion.div>

        {/* Tech Logo Infinite Scroll */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Marquee duration={45} className="py-8">
            {curriculumTech.map((tech) => (
              <div
                key={tech.name}
                className="group flex w-36 shrink-0 flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm transition-colors duration-300 hover:border-gold-500/50 hover:bg-zinc-50"
              >
                <Image
                  src={tech.logo}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain opacity-80 transition duration-300 group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="text-center">
                  <span className="block whitespace-nowrap text-sm font-medium text-zinc-800">{tech.name}</span>
                  <span className="whitespace-nowrap text-xs text-gold-700">{tech.category}</span>
                </div>
              </div>
            ))}
          </Marquee>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
        >
          <BespokeCard
            variant="premium-card"
            size="lg"
            className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-700 px-8 py-4 rounded-full border border-emerald-200 shadow-lg"
          >
            <Sparkles className="w-6 h-6" strokeWidth={1.5} />
            <span className="font-semibold text-lg">
              Technologies used by leading tech companies and universities
            </span>
          </BespokeCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-3xl font-bold text-zinc-900 mb-4">
            Ready to Build the Future?
          </h3>
          <p className="text-xl text-zinc-600 mb-8 max-w-3xl mx-auto">
            Give your child the competitive edge they need for tomorrow&apos;s tech careers.
            Our hands-on approach ensures they build real AI projects with industry-standard tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BespokeButton href="/curriculum" variant="bespoke-primary" size="lg" className="font-semibold">
              Explore Full Curriculum
            </BespokeButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}