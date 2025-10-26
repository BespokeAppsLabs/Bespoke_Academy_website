"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 5000)
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">Bespoke Academy</h3>
              <p className="text-sm text-primary-foreground/80">Innovate. Educate. Empower.</p>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Empowering the next generation with cutting-edge AI and Robotics education.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary-foreground/10 hover:text-secondary"
                asChild
              >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary-foreground/10 hover:text-secondary"
                asChild
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary-foreground/10 hover:text-secondary"
                asChild
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary-foreground/10 hover:text-secondary"
                asChild
              >
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary-foreground/10 hover:text-secondary"
                asChild
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                About Us
              </Link>
              <Link
                href="#curriculum"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                Curriculum
              </Link>
              <Link
                href="#programs"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                Programs
              </Link>
              <Link
                href="#contact"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Resources</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="#faq"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                FAQ
              </Link>
              <Link
                href="#download"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                Download Curriculum
              </Link>
              <Link
                href="#teacher-training"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                Teacher Training
              </Link>
              <Link
                href="#student-resources"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                Student Resources
              </Link>
              <Link
                href="#blog"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-primary-foreground/70">
              Subscribe to our newsletter for the latest updates and resources.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-secondary"
              />
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                size="sm"
              >
                Subscribe
              </Button>
              {subscribed && <p className="text-xs text-secondary">Thank you for subscribing!</p>}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} Bespoke Academy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#privacy"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors hover:underline"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
