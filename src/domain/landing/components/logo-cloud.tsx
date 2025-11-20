"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { BespokeCard } from "@/components/ui/bespoke/bespokeCard";
import { BespokeButton } from "@/components/ui/bespoke/bespokeButton";
import { ParallelLinesBackground } from "@/components/ui/parallel-lines-background";
import { Sparkles } from "lucide-react";

// AI Robotics curriculum technologies - real-world tools teens will learn
const curriculumTech = [
  // Programming Languages & Frameworks
  { name: "Python", logo: "/stack/typescript-svgrepo-com.svg", category: "Programming" },
  { name: "Next.js", logo: "/stack/nextjs-2.svg", category: "Framework" },
  { name: "React", logo: "/stack/react-1-logo-svgrepo-com.svg", category: "Framework" },
  { name: "TypeScript", logo: "/stack/typescript-svgrepo-com.svg", category: "Programming" },

  // AI/ML Platforms
  { name: "OpenAI", logo: "/stack/openai-svgrepo-com.svg", category: "AI Platform" },
  { name: "Google AI", logo: "/stack/gemini-ai.svg", category: "AI Platform" },

  // Robotics & Hardware
  { name: "Arduino", logo: "/stack/arduino-1.svg", category: "Hardware" },

  // Development Tools
  { name: "VS Code", logo: "/stack/visual-studio-code-1-1.svg", category: "IDE" },
  { name: "Firebase", logo: "/stack/firebase-svgrepo-com.svg", category: "Database" },
  { name: "MongoDB", logo: "/stack/mongodb-icon-2.svg", category: "Database" },
  { name: "Express", logo: "/stack/express-svgrepo-com.svg", category: "Backend" },

  // Mobile Development
  { name: "Expo", logo: "/stack/expo-1.svg", category: "Mobile" },

  // Cloud & Infrastructure
  { name: "Google", logo: "/stack/google-icon-logo-svgrepo-com.svg", category: "Cloud" },
  { name: "Hostinger", logo: "/stack/hostinger.svg", category: "Hosting" },

  // Additional Technologies
  { name: "React Native", logo: "/stack/react-logo-svgrepo-com.svg", category: "Mobile" },
  { name: "Firebase Extended", logo: "/stack/firebase-svgrepo-com (1).svg", category: "Database" }
];

const skillsStats = [
  { number: 16, suffix: "+", label: "Technologies Mastered" },
  { number: 85, suffix: "%", label: "Hands-On Projects" },
  { number: 4.8, suffix: "/5", label: "Student Engagement" },
  // { number: 40, suffix: "+", label: "Practical Labs" }
];

export default function LogoCloudSection() {
  return (
    <section className="py-20 bg-zinc-900 text-white relative overflow-hidden">
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="dark" />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 rounded-full bg-emerald-500/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
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
            className="text-emerald-500 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Industry-Standard Curriculum
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Master <span className="text-emerald-400">16+</span> Technologies
          </motion.h2>

          <motion.p
            className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Your child will learn the cutting-edge tools and frameworks powering today's AI revolution.
            Our 40-week curriculum covers everything from programming fundamentals to advanced AI applications.
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
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 25s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="relative overflow-hidden">
            {/* Gradient Fade Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-zinc-900 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-zinc-900 to-transparent z-10" />

            <div className="flex animate-scroll py-8" style={{ gap: '2rem' }}>
              {/* First set of tech cards */}
              {curriculumTech.map((tech) => (
                <BespokeCard
                  key={`first-${tech.name}`}
                  variant="glass-card"
                  size="default"
                  animation="scale"
                  className="flex items-center justify-center px-8 opacity-80 hover:opacity-100 transition-all duration-300 shrink-0"
                >
                  <div className="flex flex-col items-center gap-3">
                    {/* Tech Logo */}
                    <div className="flex items-center justify-center h-12 w-12 transition-all duration-300 group-hover:scale-110">
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="h-full w-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-zinc-200 whitespace-nowrap block">
                        {tech.name}
                      </span>
                      <span className="text-xs text-emerald-400/70 whitespace-nowrap">
                        {tech.category}
                      </span>
                    </div>
                  </div>
                </BespokeCard>
              ))}

              {/* Duplicate set for infinite scroll */}
              {curriculumTech.map((tech) => (
                <BespokeCard
                  key={`second-${tech.name}`}
                  variant="glass-card"
                  size="default"
                  animation="scale"
                  className="flex items-center justify-center px-8 opacity-80 hover:opacity-100 transition-all duration-300 shrink-0"
                >
                  <div className="flex flex-col items-center gap-3">
                    {/* Tech Logo */}
                    <div className="flex items-center justify-center h-12 w-12 transition-all duration-300 group-hover:scale-110">
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="h-full w-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-zinc-200 whitespace-nowrap block">
                        {tech.name}
                      </span>
                      <span className="text-xs text-emerald-400/70 whitespace-nowrap">
                        {tech.category}
                      </span>
                    </div>
                  </div>
                </BespokeCard>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-zinc-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {skillsStats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-emerald-500 mb-1">
                <AnimatedCounter
                  end={stat.number}
                  suffix={stat.suffix}
                  duration={2000}
                  delay={800 + i * 200}
                />
              </div>
              <div className="text-sm text-zinc-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
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
            className="inline-flex items-center gap-3 bg-emerald-900/50 text-emerald-300 px-8 py-4 rounded-full border border-emerald-600/30 shadow-lg"
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
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Build the Future?
          </h3>
          <p className="text-xl text-zinc-300 mb-8 max-w-3xl mx-auto">
            Give your child the competitive edge they need for tomorrow's tech careers.
            Our hands-on approach ensures they build real AI projects with industry-standard tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BespokeButton
              variant="bespoke-primary"
              size="lg"
              animation="glow"
              className="font-semibold"
            >
              Explore Full Curriculum
            </BespokeButton>
            <BespokeButton
              variant="bespoke-outline"
              size="lg"
              className="font-semibold"
            >
              View Tech Stack Details
            </BespokeButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}