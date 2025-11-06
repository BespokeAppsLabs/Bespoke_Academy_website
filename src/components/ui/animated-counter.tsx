"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  suffix?: string
  prefix?: string
  className?: string
  decimalPlaces?: number
  separator?: boolean
  triggerOnce?: boolean
}

const AnimatedCounter = React.forwardRef<HTMLSpanElement, AnimatedCounterProps>(
  ({
    end,
    start = 0,
    duration = 2000,
    delay = 0,
    suffix = "",
    prefix = "",
    className,
    decimalPlaces = 0,
    separator = true,
    triggerOnce = true,
    ...props
  }, ref) => {
    const [count, setCount] = React.useState(start)
    const [hasStarted, setHasStarted] = React.useState(false)
    const { ref: inViewRef, inView } = useInView({
      triggerOnce,
      threshold: 0.1,
    })

    const setRefs = React.useCallback(
      (node: HTMLSpanElement | null) => {
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
        inViewRef(node)
      },
      [ref, inViewRef]
    )

    React.useEffect(() => {
      if (!inView || hasStarted) return

      const timer = setTimeout(() => {
        setHasStarted(true)
      }, delay)

      return () => clearTimeout(timer)
    }, [inView, hasStarted, delay])

    React.useEffect(() => {
      if (!hasStarted) return

      let startTime: number | null = null
      const animationDuration = duration

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / animationDuration, 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = start + (end - start) * easeOutQuart

        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }

      requestAnimationFrame(animate)
    }, [start, end, duration, hasStarted])

    const formatNumber = (num: number) => {
      const rounded = decimalPlaces > 0 ? num.toFixed(decimalPlaces) : Math.floor(num).toString()

      if (separator) {
        return rounded.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }

      return rounded
    }

    return (
      <span
        ref={setRefs}
        className={cn("font-mono tabular-nums", className)}
        {...props}
      >
        {prefix}{formatNumber(count)}{suffix}
      </span>
    )
  }
)
AnimatedCounter.displayName = "AnimatedCounter"

export { AnimatedCounter }