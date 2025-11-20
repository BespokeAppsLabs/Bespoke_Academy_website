"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { BespokeButton } from "./bespokeButton";
import {
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  InformationCircleIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

export interface BespokeTopNavProps {
  className?: string;
  showLogo?: boolean;
  logoVariant?: "full" | "stacked" | "icon";
  ctaButtons?: boolean;
  items?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
    description: "Start your journey"
  },
  {
    name: "Curriculum",
    href: "/curriculum",
    icon: BookOpenIcon,
    description: "40-week learning program"
  },
  {
    name: "Courses",
    href: "/courses",
    icon: AcademicCapIcon,
    description: "Available courses"
  },
  {
    name: "About",
    href: "/about",
    icon: InformationCircleIcon,
    description: "Our mission and values"
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: ChartBarIcon,
    description: "Track your progress"
  }
];

export function BespokeTopNav({
  className,
  showLogo = true,
  logoVariant = "full",
  ctaButtons = true,
  items = defaultNavItems
}: BespokeTopNavProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Handle scroll-based visibility
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined) {
      const direction = latest > previous ? "down" : "up";

      // Hide nav when scrolling down, show when scrolling up
      if (direction === "down" && latest > 100) {
        setIsVisible(false);
      } else if (direction === "up" || latest < 100) {
        setIsVisible(true);
      }
    }
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <AnimatePresence mode="wait">
        <motion.nav
          initial={{ opacity: 0, y: -100 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -100,
          }}
          exit={{ opacity: 0, y: -100 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          className={cn(
            "fixed top-4 left-1/2 transform -translate-x-1/2 z-50",
            "backdrop-blur-xl bg-emerald-800/60 dark:bg-emerald-600/10",
            "border border-white/20 dark:border-neutral-700/20",
            "rounded-full shadow-2xl shadow-black/10",
            // Layout
            "flex items-center justify-between gap-4 px-6 py-3",
            "min-h-16 lg:w-3/5 mx-4",
            // Responsive
            "hidden md:flex",
            className
          )}
        >
          {/* Logo Section */}
          {showLogo && (
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/"
                className="flex items-center space-x-3 group"
                aria-label="Bespoke Academy Home"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Logo
                    variant={logoVariant}
                    size="md"
                    className="w-8 h-8"
                  />
                </motion.div>
                {logoVariant === "full" && (
                  <motion.span
                    className="font-bold text-lg text-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Bespoke Academy
                  </motion.span>
                )}
              </Link>
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex items-center space-x-1 flex-1 justify-center">
            {items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <motion.div
                  key={item.name}
                  className="relative"
                  onHoverStart={() => {}}
                  onHoverEnd={() => {}}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      // Base styles
                      "relative flex items-center space-x-2 px-4 py-2 rounded-full",
                      "text-sm font-medium transition-all duration-200",
                      "hover:scale-105 active:scale-95",

                      // Active state
                      active
                        ? "bg-primary-emerald-500 text-black shadow-lg"
                        : "text-white hover:text-neutral-200",

                      // Hover state for non-active items
                      !active && "hover:bg-white/10"
                    )}
                    aria-label={item.description || item.name}
                  >
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>

                    <span className="hidden lg:block font-medium">
                      {item.name}
                    </span>

                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary-emerald-500/20 -z-10"
                        layoutId="activeTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>

                  {/* Tooltip on desktop */}
                  {item.description && (
                    <motion.div
                      className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs rounded-lg opacity-0 pointer-events-none whitespace-nowrap z-50"
                      initial={{ opacity: 0, y: -5 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-neutral-900 dark:bg-white rotate-45" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          {ctaButtons && (
            <div className="flex items-center space-x-3 flex-shrink-0">
              <BespokeButton
                variant="bespoke-ghost"
                size="sm"
                className="hidden lg:flex"
              >
                Login
              </BespokeButton>
              <BespokeButton
                variant="bespoke-primary"
                size="sm"
                icon={<SparklesIcon className="w-4 h-4" />}
                animation="glow"
              >
                Enroll Now
              </BespokeButton>
            </div>
          )}
        </motion.nav>
      </AnimatePresence>

      {/* Mobile Navigation */}
      <motion.div
        className={cn(
          "fixed top-4 left-4 right-4 z-50 md:hidden",
          "backdrop-blur-xl bg-white/10 dark:bg-neutral-900/10",
          "border border-white/20 dark:border-neutral-700/20",
          "rounded-full shadow-2xl shadow-black/10",
          "flex items-center justify-between px-4 py-3",
          "min-h-14"
        )}
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Mobile Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2"
          aria-label="Bespoke Academy Home"
        >
          <Logo
            variant="icon"
            size="md"
            className="w-6 h-6"
          />
          <span className="font-bold text-sm text-white">
            Bespoke Academy
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <BespokeButton
          variant="bespoke-ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="text-white"
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <XMarkIcon key="close" className="w-5 h-5" />
            ) : (
              <Bars3Icon key="menu" className="w-5 h-5" />
            )}
          </AnimatePresence>
        </BespokeButton>
      </motion.div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-20 left-4 right-4 mx-auto max-w-sm"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="backdrop-blur-xl bg-white/90 dark:bg-neutral-900/90 border border-white/20 dark:border-neutral-700/20 rounded-2xl shadow-2xl p-6">
                <nav className="space-y-2">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 w-full px-4 py-3 rounded-xl",
                          "transition-all duration-200 font-medium",
                          active
                            ? "bg-primary-emerald-500 text-black shadow-lg"
                            : "text-neutral-900 hover:bg-neutral-100"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          {item.description && (
                            <div className="text-xs opacity-70">{item.description}</div>
                          )}
                        </div>
                        {active && (
                          <div className="w-2 h-2 bg-primary-emerald-600 rounded-full" />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile CTA Buttons */}
                {ctaButtons && (
                  <div className="mt-6 space-y-3">
                    <BespokeButton
                      variant="bespoke-outline"
                      size="lg"
                      fullWidth
                      className="w-full"
                    >
                      Login
                    </BespokeButton>
                    <BespokeButton
                      variant="bespoke-primary"
                      size="lg"
                      fullWidth
                      icon={<SparklesIcon className="w-4 h-4" />}
                      animation="glow"
                    >
                      Enroll Now
                    </BespokeButton>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        </>
  );
}

