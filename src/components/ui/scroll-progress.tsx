"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgress() {
  const { progress, isVisible } = useScrollProgress();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Vertical Progress Bar Container - Dark Hero Theme */}
          <div className="relative">
            {/* Background Track - Dark theme matching hero section */}
            <div className="w-4 h-48 bg-zinc-800/80 rounded-full backdrop-blur-md border border-zinc-700 shadow-lg" />

            {/* Progress Fill - Direct height calculation for better rendering */}
            <div className="absolute top-0 left-0 w-4 h-48 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/20"
                style={{ height: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>

            {/* Progress Percentage Indicator - Dark theme */}
            <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
              <div className="bg-zinc-900/90 backdrop-blur-sm text-emerald-400 text-xs font-semibold px-2 py-1 rounded-lg border border-zinc-700 shadow-lg">
                {progress}%
              </div>
            </div>

            {/* Top and Bottom Indicators - Enhanced visibility */}
            <div className="absolute -left-1 top-0 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
            </div>
            <div className="absolute -left-1 bottom-0 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-zinc-600 rounded-full" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mobile version - Dark theme optimized
export function ScrollProgressMobile() {
  const { progress, isVisible } = useScrollProgress();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Mobile Horizontal Progress Bar - Dark theme */}
          <div className="relative w-32 h-2 bg-zinc-800/80 backdrop-blur-md rounded-full border border-zinc-700 shadow-lg">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full shadow-md shadow-emerald-500/20"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-emerald-400 text-xs font-semibold bg-zinc-900/90 px-2 py-1 rounded border border-zinc-700">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}