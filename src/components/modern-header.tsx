"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    { name: "Contact", href: "#contact" }
  ]

  return (
    <motion.header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-cyber-blue to-electric-purple rounded-lg"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            />
            <span className="text-xl font-bold text-cyber-blue">
              Bespoke Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group py-2 focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:ring-offset-2"
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyber-blue to-electric-purple group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Button
              variant="outline"
              className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:ring-offset-2"
              aria-label="Sign in to your account"
            >
              Sign In
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:ring-offset-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <X key="close" className="h-5 w-5" />
              ) : (
                <Menu key="menu" className="h-5 w-5" />
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="py-4 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-2">
                  <Button variant="outline" className="w-full border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white">
                    Sign In
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}