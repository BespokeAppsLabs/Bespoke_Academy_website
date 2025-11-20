"use client";

import { useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculate progress (0 to 100)
    const currentProgress = Math.round(latest * 100);
    setProgress(currentProgress);

    // Show progress bar when scrolling starts
    if (currentProgress > 0) {
      setIsVisible(true);
      setLastScrollTime(Date.now());
    } else {
      // Hide when at top
      setIsVisible(false);
    }
  });

  // Auto-hide after 1.5 seconds of inactivity
  useEffect(() => {
    const hideTimeout = setInterval(() => {
      if (Date.now() - lastScrollTime > 1500 && progress > 0) {
        setIsVisible(false);
      }
    }, 100);

    return () => clearInterval(hideTimeout);
  }, [lastScrollTime, progress]);

  return { progress, isVisible };
}