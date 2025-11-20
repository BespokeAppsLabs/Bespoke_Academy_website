"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  speed?: number;
  className?: string;
  gap?: string;
}

export default function Marquee({ children, pauseOnHover = false, speed = 30, className = "", gap = "1rem" }: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return;

    const scroller = scrollerRef.current;
    const container = containerRef.current;

    // Clone children for infinite scroll
    const originalContent = scroller.innerHTML;
    scroller.innerHTML = originalContent + originalContent;

    // Set CSS variables
    container.style.setProperty('--marquee-gap', gap);

    const animationDuration = scroller.scrollWidth / speed;
    scroller.style.animationDuration = `${animationDuration}s`;

    // Handle pause on hover
    const handleMouseEnter = () => {
      if (pauseOnHover) {
        setIsPaused(true);
        scroller.style.animationPlayState = 'paused';
      }
    };

    const handleMouseLeave = () => {
      if (pauseOnHover) {
        setIsPaused(false);
        scroller.style.animationPlayState = 'running';
      }
    };

    if (pauseOnHover) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (pauseOnHover) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [pauseOnHover, speed, gap]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--marquee-gap': gap,
      } as React.CSSProperties}
    >
      <div
        ref={scrollerRef}
        className="flex w-max animate-scroll"
        style={{
          animation: `scroll linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll > * {
          margin-right: var(--marquee-gap);
        }
      `}</style>
    </div>
  );
}