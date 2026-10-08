"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin gold reading-progress bar pinned to the top of the viewport.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 shadow-[0_0_12px_var(--color-gold-500)]"
      style={{ scaleX }}
    />
  );
}
