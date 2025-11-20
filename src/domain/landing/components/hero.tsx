"use client";

import { motion } from "framer-motion";
import { BespokeButton } from "@/components/ui/bespoke";
import { ParallelLinesBackground } from "@/components/ui/parallel-lines-background";
import { useRandomTitle } from "@/hooks/useRandomTitle";


export default function Hero() {
  const { currentTitle, fontSizeClass, cycleToNextTitle } = useRandomTitle();

  // All tech stack logos for floating animation
  const floatingLogos = [
    { path: "/stack/arduino-1.svg", delay: 0 },
    { path: "/stack/expo-1.svg", delay: 0.5 },
    { path: "/stack/express-svgrepo-com.svg", delay: 1.0 },
    { path: "/stack/firebase-svgrepo-com.svg", delay: 1.5 },
    { path: "/stack/firebase-svgrepo-com (1).svg", delay: 2.0 },
    { path: "/stack/gemini-ai.svg", delay: 2.5 },
    { path: "/stack/google-icon-logo-svgrepo-com.svg", delay: 3.0 },
    { path: "/stack/hostinger.svg", delay: 3.5 },
    { path: "/stack/mongodb-icon-2.svg", delay: 4.0 },
    { path: "/stack/nextjs-2.svg", delay: 4.5 },
    { path: "/stack/openai-svgrepo-com.svg", delay: 5.0 },
    { path: "/stack/react-1-logo-svgrepo-com.svg", delay: 5.5 },
    { path: "/stack/react-logo-svgrepo-com.svg", delay: 6.0 },
    { path: "/stack/typescript-svgrepo-com.svg", delay: 6.5 },
    { path: "/stack/visual-studio-code-1-1.svg", delay: 7.0 }
  ];

  return (
    <section className="relative min-h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="dark" />

      {/* Floating Tech Logos Background Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingLogos.map((logo, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 30, -30, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.15, 0.4, 0.15],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: logo.delay,
            }}
          >
            <img
              src={logo.path}
              alt="Tech Logo"
              className="h-12 w-auto"
            />
          </motion.div>
        ))}
      </div>

      <div className="w-full px-6 py-16 lg:py-24 relative z-10">
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">

          {/* Centered Hero Text Content */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Page Load Animation Curtain */}
            <motion.div
              className="absolute top-0 left-0 h-full w-full bg-zinc-900 z-10"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Animated Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="relative z-20 space-y-6"
            >
              <motion.span
                className="text-emerald-400 text-sm font-semibold tracking-wider uppercase inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Perfect for Grades 8-11 • No Experience Required • Friday Sessions
              </motion.span>

              <motion.h1
                className={`${fontSizeClass} font-bold leading-tight`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                {currentTitle.main}
                <span className="text-emerald-400 block">{currentTitle.subtitle}</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-zinc-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                Build real robots, master AI tools, and create your future with our hands-on AI & Robotics curriculum.
                No prior knowledge needed - just bring your curiosity and creativity!
              </motion.p>

              <motion.p
                className="text-sm text-zinc-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
              >
                40-Week AI Robotics Curriculum • Perfect for Ages 13-17 • Parent-Approved Learning
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <BespokeButton
                  variant="bespoke-primary"
                  size="xl"
                  className="font-semibold"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  }
                >
                  Start Creating with AI
                </BespokeButton>

                <BespokeButton
                  variant="bespoke-secondary"
                  size="xl"
                  className="font-semibold border-2 border-zinc-600 hover:border-zinc-500"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                >
                  Parents: Learn More
                </BespokeButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0], opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.0 }}
        initial={{ opacity: 0 }}
      >
        <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center backdrop-blur-sm bg-emerald-400/10">
          <motion.div
            className="w-1 h-3 bg-emerald-400 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Development Testing Button */}
      {process.env.NODE_ENV === 'development' && (
        <motion.button
          onClick={cycleToNextTitle}
          className="fixed top-4 right-4 z-50 bg-emerald-600/80 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg backdrop-blur-sm border border-emerald-500/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.0, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎲 Next Title
        </motion.button>
      )}
    </section>
  );
}

export type HeroProps = {};