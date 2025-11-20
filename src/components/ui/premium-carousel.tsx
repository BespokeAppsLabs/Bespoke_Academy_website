"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumCarouselProps {
  children: React.ReactNode;
  className?: string;
  itemsPerView?: number;
  gap?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
}

export default function PremiumCarousel({
  children,
  className = "",
  itemsPerView = 3,
  gap = "1.5rem",
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
}: PremiumCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const itemCount = React.Children.count(children);
  const maxIndex = Math.max(0, itemCount - itemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || itemCount <= itemsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, maxIndex, itemCount, itemsPerView]);

  const scrollToItem = (index: number) => {
    if (containerRef.current && itemsRef.current[index]) {
      const container = containerRef.current;
      const item = itemsRef.current[index];
      const containerScrollWidth = container.scrollWidth;
      const containerWidth = container.clientWidth;

      // Calculate scroll position to center the item
      const itemLeft = item.offsetLeft;
      const itemWidth = item.offsetWidth;
      const scrollPosition = itemLeft - (containerWidth - itemWidth) / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });

      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
    scrollToItem(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    scrollToItem(newIndex);
  };

  const handleDotClick = (index: number) => {
    scrollToItem(index);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Items Container */}
      <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory" style={{ gap }}>
        {React.Children.map(children, (child, index) => (
          <div
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className={cn(
              "flex-shrink-0 snap-center",
              getItemsPerViewClass(itemsPerView)
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Gradient Fade Effects */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-850 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-850 to-transparent z-10 pointer-events-none" />

      {/* Navigation Arrows */}
      {showArrows && itemCount > itemsPerView && (
        <>
          <motion.button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-neutral-800/90 hover:bg-neutral-700 text-white border border-neutral-600 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            aria-label="Previous"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-neutral-800/90 hover:bg-neutral-700 text-white border border-neutral-600 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            aria-label="Next"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && itemCount > itemsPerView && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "w-8 bg-primary-emerald-400"
                  : "w-2 bg-neutral-600 hover:bg-neutral-500"
              )}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const PremiumCarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    />
  )
})
PremiumCarouselContent.displayName = "PremiumCarouselContent";

export const PremiumCarouselItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("h-full", className)}
      {...props}
    />
  )
})
PremiumCarouselItem.displayName = "PremiumCarouselItem";

// Helper function to get responsive classes based on items per view
function getItemsPerViewClass(itemsPerView: number): string {
  switch (itemsPerView) {
    case 1:
      return "w-full";
    case 2:
      return "w-full md:w-1/2";
    case 3:
      return "w-full md:w-1/2 lg:w-1/3";
    case 4:
      return "w-full md:w-1/2 lg:w-1/3 xl:w-1/4";
    default:
      return "w-full";
  }
}