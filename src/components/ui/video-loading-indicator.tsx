"use client"

import { motion } from "framer-motion"

export function VideoLoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 text-sm text-primary/70"
    >
      <motion.div
        className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <span>Loading immersive experience...</span>
    </motion.div>
  )
}