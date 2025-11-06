"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { GradientButton } from "@/components/ui/gradient-button"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from "lucide-react"

export function ModernFooter() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" },
      { name: "Blog", href: "#blog" }
    ],
    resources: [
      { name: "Documentation", href: "#docs" },
      { name: "Tutorials", href: "#tutorials" },
      { name: "Community", href: "#community" },
      { name: "Support", href: "#support" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "Accessibility", href: "#accessibility" }
    ]
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/bespoke-academy", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/bespokeacademy", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/bespoke-academy", label: "LinkedIn" },
    { icon: Mail, href: "mailto:info@bespokeacademy.com", label: "Email" }
  ]

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyber-blue to-electric-purple rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Bespoke Academy</h3>
                <p className="text-sm text-muted-foreground">Innovate. Educate. Empower.</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              Transform your career with cutting-edge AI education. 
              Join thousands of students who have already launched their tech careers with our comprehensive programs.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <GradientButton variant="primary" size="sm" className="group">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </GradientButton>
              <GradientButton variant="outline" size="sm">
                Download Brochure
              </GradientButton>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-h4 font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-cyber-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-h4 font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-cyber-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="border-t border-border py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-h4 font-semibold text-foreground">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyber-blue" />
                  <span className="text-sm text-muted-foreground">info@bespokeacademy.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyber-blue" />
                  <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyber-blue" />
                  <span className="text-sm text-muted-foreground">San Francisco, CA & Online</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-h4 font-semibold text-foreground">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-lg bg-surface-elevated border border-border flex items-center justify-center hover:bg-cyber-blue hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Bespoke Academy. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-cyber-blue transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}