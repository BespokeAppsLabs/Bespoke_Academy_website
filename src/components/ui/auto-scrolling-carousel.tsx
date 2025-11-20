"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutoScrollingCarouselProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  speed?: number;
  showArrows?: boolean;
}

export default function AutoScrollingCarousel({
  children,
  className = "",
  gap = "1rem",
  speed = 30,
  showArrows = false
}: AutoScrollingCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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
      setIsPaused(true);
      scroller.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = () => {
      setIsPaused(false);
      scroller.style.animationPlayState = 'running';
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [speed, gap]);

  const scrollLeft = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({
        left: -scrollerRef.current.offsetWidth / 3,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({
        left: scrollerRef.current.offsetWidth / 3,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
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

      {/* Gradient Fade Effects */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-850 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-850 to-transparent z-10 pointer-events-none" />

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-neutral-700/80 hover:bg-neutral-600 text-white border border-neutral-600 backdrop-blur-sm transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-neutral-700/80 hover:bg-neutral-600 text-white border border-neutral-600 backdrop-blur-sm transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

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

export const AutoScrollingCarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex", className)}
      {...props}
    />
  )
})
AutoScrollingCarouselContent.displayName = "AutoScrollingCarouselContent";

export const AutoScrollingCarouselItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0", className)}
      style={{
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
      }}
      {...props}
    />
  )
})
AutoScrollingCarouselItem.displayName = "AutoScrollingCarouselItem";