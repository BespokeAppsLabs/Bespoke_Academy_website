"use client"

import * as React from "react"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  variant?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleUp" | "slideDown"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  staggerChildren?: number
}

const scrollVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30, scale: 0.98 },
    visible: { opacity: 1, x: 0, scale: 1 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -30, scale: 0.98 },
    visible: { opacity: 1, x: 0, scale: 1 }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 }
  }
}

export function ScrollAnimation({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  staggerChildren = 0
}: ScrollAnimationProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: "-50px 0px -50px 0px"
  })

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren,
              delayChildren: delay,
              duration
            }
          }
        }}
      >
        <motion.div variants={scrollVariants[variant]}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  speed?: number
  offset?: number
}

export function Parallax({ children, className, speed = 0.5, offset = 0 }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + speed * 100])
  const smoothY = useSpring(y, { stiffness: 100, damping: 20, mass: 1 })

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y: smoothY }}>
        {children}
      </motion.div>
    </div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  variant?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleUp"
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  variant = "fadeUp"
}: StaggerContainerProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={scrollVariants[variant]}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export { scrollVariants }