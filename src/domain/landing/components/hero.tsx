"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { BespokeButton } from "@/components/ui/bespoke";
import { ParallelLinesBackground } from "@/components/ui/parallel-lines-background";
import { Magnetic } from "@/components/ui/magnetic";
import { useRandomTitle } from "@/hooks/useRandomTitle";
import { ease } from "@/lib/motion";

// Fixed layout (no Math.random): server and client render the same positions.
// depth drives parallax speed: deeper logos drift less.
const floatingLogos = [
  { path: "/stack/arduino-1.svg", left: 8, top: 18, depth: 0.6 },
  { path: "/stack/expo-1.svg", left: 22, top: 72, depth: 0.3 },
  { path: "/stack/express-svgrepo-com.svg", left: 35, top: 12, depth: 0.45 },
  { path: "/stack/firebase-svgrepo-com.svg", left: 48, top: 86, depth: 0.7 },
  { path: "/stack/google-icon-logo-svgrepo-com.svg", left: 78, top: 66, depth: 0.55 },
  { path: "/stack/mongodb-icon-2.svg", left: 90, top: 30, depth: 0.25 },
  { path: "/stack/nextjs-2.svg", left: 12, top: 48, depth: 0.4 },
  { path: "/stack/react-logo-svgrepo-com.svg", left: 70, top: 44, depth: 0.2 },
  { path: "/stack/typescript-svgrepo-com.svg", left: 28, top: 38, depth: 0.5 },
  { path: "/stack/visual-studio-code-1-1.svg", left: 54, top: 58, depth: 0.3 },
];

function FloatingLogo({ logo, index, progress }: { logo: (typeof floatingLogos)[number]; index: number; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [0, -320 * logo.depth]);
  return (
    <motion.div className="absolute" style={{ left: `${logo.left}%`, top: `${logo.top}%`, y }}>
      <motion.img
        src={logo.path}
        alt=""
        className="h-10 md:h-12 w-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12 + logo.depth * 0.25, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 1.2, delay: 0.3 + index * 0.06 },
          scale: { duration: 1.2, delay: 0.3 + index * 0.06, ease: ease.outExpo },
          y: { duration: 6 + index * 0.4, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </motion.div>
  );
}

const word = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: ease.outExpo } },
};

export default function Hero() {
  const { currentTitle, fontSizeClass, cycleToNextTitle, titleIndex } = useRandomTitle();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen bg-zinc-50 text-zinc-900 overflow-hidden">
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="light" />

      {/* Gold/emerald glow that settles in behind the headline */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklch,var(--color-gold-500)_22%,transparent)_0%,_color-mix(in_oklch,var(--color-primary-emerald-500)_10%,transparent)_45%,_transparent_70%)] blur-2xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: ease.outExpo }}
      />

      {/* Tech logos: decorative, parallax on scroll */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingLogos.map((logo, index) => (
          <FloatingLogo key={logo.path} logo={logo} index={index} progress={scrollYProgress} />
        ))}
      </div>

      <div className="w-full px-6 py-16 lg:py-24 relative z-10">
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">

          {/* Centered Hero Text Content */}
          <motion.div className="max-w-4xl mx-auto text-center space-y-8" style={{ y: contentY, opacity: contentOpacity }}>
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
              className="relative z-20 space-y-6"
            >
              <motion.span
                className="text-gold-700 text-sm font-semibold tracking-wider uppercase inline-block"
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
              >
                Grades 8-11 in Lephalale • No Experience Required • Weekend Sessions
              </motion.span>

              <motion.h1
                key={titleIndex}
                className={`${fontSizeClass} font-bold leading-tight`}
                aria-label={`${currentTitle.main} ${currentTitle.subtitle}`}
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
              >
                <span aria-hidden="true">
                  {currentTitle.main.split(" ").map((w, i) => (
                    <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                      <motion.span className="inline-block" variants={word}>
                        {w}&nbsp;
                      </motion.span>
                    </span>
                  ))}
                  <span className="block overflow-hidden pb-[0.15em]">
                    <motion.span className="relative inline-block text-emerald-600" variants={word}>
                      {currentTitle.subtitle}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
                        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, delay: 0.6, ease: ease.outExpo } } }}
                      />
                    </motion.span>
                  </span>
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-zinc-600 leading-relaxed"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.outExpo } } }}
              >
                Build real robots, master AI tools, and create your future with our hands-on AI & Robotics curriculum.
                No prior knowledge needed - just bring your curiosity and creativity!
              </motion.p>

              <motion.p
                className="text-sm text-zinc-500"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.outExpo } } }}
              >
                Engineering & Media Streams • Ages 13-17 • Join Any Month
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.outExpo } } }}
              >
                <Magnetic>
                <BespokeButton
                  href="/#contact"
                  variant="bespoke-primary"
                  size="xl"
                  className="font-semibold"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  }
                >
                  Apply now
                </BespokeButton>
                </Magnetic>

                <BespokeButton
                  href="/courses"
                  variant="bespoke-outline"
                  size="xl"
                  className="font-semibold"
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
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        aria-hidden="true"
        style={{ opacity: contentOpacity }}
      >
        <div className="w-6 h-10 border-2 border-gold-400/50 rounded-full flex justify-center backdrop-blur-sm bg-gold-400/10">
          <motion.div
            className="w-1 h-3 bg-gold-400 rounded-full mt-2"
            initial={{ opacity: 0 }}
            animate={{ y: [0, 12, 0], opacity: [0.3, 1, 0.3] }}
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
