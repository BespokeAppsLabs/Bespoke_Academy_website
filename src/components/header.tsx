"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Curriculum", href: "/curriculum" },
    { name: "Programs", href: "#programs" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Style Guide", href: "/ui" }
  ]

  const dropdownVariants = {
    initial: { opacity: 0, y: -10, height: 0 },
    animate: { opacity: 1, y: 0, height: "auto" },
    exit: { opacity: 0, y: -10, height: 0 }
  }

  const navItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="w-10 h-10 bg-cyber-blue rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">
                Bespoke Academy
              </span>
              <span className="text-xs text-muted-foreground">
                Innovate. Educate. Empower.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-blue group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* Sign In button */}
            <GradientButton
              variant="outline"
              size="sm"
              className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white"
            >
              Sign In
            </GradientButton>
          </nav>

          {/* Mobile Menu Button with animation */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-cyber-blue hover:bg-cyber-blue/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation with slide animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-white/10 glass-morphism"
              variants={dropdownVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <nav className="py-4 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-elevated/50 rounded-lg transition-all duration-200 mx-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: navigation.length * 0.05 }}
                  className="px-2 pt-2"
                >
                  <GradientButton
                    variant="outline"
                    className="w-full border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white"
                  >
                    Sign In
                  </GradientButton>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </header>
  )
}
