"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale'
  delay?: number
}

export function ScrollAnimation({ children, className = "", variant = "fadeUp", delay = 0 }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const getAnimationClass = () => {
    switch (variant) {
      case 'fadeUp':
        return 'scroll-fade-up'
      case 'fadeIn':
        return 'scroll-fade-in'
      case 'slideLeft':
        return 'scroll-slide-left'
      case 'slideRight':
        return 'scroll-slide-right'
      case 'scale':
        return 'scroll-scale'
      default:
        return 'scroll-fade-up'
    }
  }

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
