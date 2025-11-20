"use client";

import { motion } from "framer-motion";

interface ParallelLinesBackgroundProps {
  theme?: "dark" | "light" | "gradient";
  className?: string;
}

export function ParallelLinesBackground({
  theme = "light",
  className = ""
}: ParallelLinesBackgroundProps) {
  // Define opacity based on theme
  const getOpacity = () => {
    switch (theme) {
      case "dark":
        return 0.1;
      case "gradient":
        return 0.07;
      case "light":
      default:
        return 0.05;
    }
  };

  // Get fill color for the SVG pattern
  const getFillColor = () => {
    return "%2310b981"; // Emerald color #10b981 URL-encoded
  };

  const opacity = getOpacity();
  const fillColor = getFillColor();

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${fillColor}' fill-opacity='${opacity}'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
}