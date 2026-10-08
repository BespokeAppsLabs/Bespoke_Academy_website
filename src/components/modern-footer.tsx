"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { BespokeButton } from "@/components/ui/bespoke/bespokeButton"
import { Magnetic } from "@/components/ui/magnetic"
import { LogoStacked } from "@/components/ui/logo"
import { Mail, MessageCircle, ArrowRight, ExternalLink } from "lucide-react"
import { site } from "@/config/site"

export function ModernFooter() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    academy: [
      { name: "About", href: "/about" },
      { name: "Curriculum", href: "/curriculum" },
      { name: "Programme & Fees", href: "/courses" },
      { name: "Apply for 2027", href: "/#contact" }
    ],
    programs: [
      { name: "Phase 1: Digital Foundations", href: "/curriculum/module-1" },
      { name: "Phase 2: Electronics & Robotics", href: "/curriculum/module-2" },
      { name: "Phase 3: AI Concepts & Tools", href: "/curriculum/module-3" },
      { name: "Phase 4: AI-Robotics Projects", href: "/curriculum/module-4" }
    ]
  }

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-6">
        {/* Main Footer Content - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12 py-16 w-full">

          {/* Column 1: Brand Section - Spans 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 xl:col-span-2 space-y-6"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                <LogoStacked size="lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Bespoke Academy</h3>
                <p className="text-sm text-primary-emerald-400">AI & Robotics for Grades 8–11</p>
              </div>
            </div>

            <p className="text-neutral-300 leading-relaxed max-w-sm">
              A {site.program.weeks}-week, hands-on AI and robotics programme for {site.program.grades} learners.
              Applications for the {site.intakeYear} intake are open.
            </p>
          </motion.div>

          {/* Column 2: Academy Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Academy</h4>
            <ul className="space-y-3">
              {footerLinks.academy.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 hover:text-primary-emerald-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Programs Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 hover:text-primary-emerald-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact & Resources - Spans 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 xl:col-span-1 space-y-8"
          >
            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-primary-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">Email</div>
                    <div className="text-sm text-neutral-300 group-hover:text-primary-emerald-400">{site.email}</div>
                  </div>
                </a>
                <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-primary-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-primary-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">WhatsApp</div>
                    <div className="text-sm text-neutral-300 group-hover:text-primary-emerald-400">{site.whatsapp.display}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Bespoke Apps</h4>
              <div className="flex flex-wrap gap-3">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 h-9 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center text-sm hover:bg-primary-emerald-500 hover:border-primary-emerald-500 transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Related sites */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Also by Bespoke</h4>
              <ul className="space-y-3">
                {site.related.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-300 hover:text-primary-emerald-400 transition-colors inline-flex items-center gap-2"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-neutral-800 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-primary-emerald-500/15 via-gold-500/10 to-primary-emerald-600/15 rounded-xl p-8 border border-gold-500/30 max-w-4xl mx-auto">
              <h4 className="text-2xl font-bold text-white mb-4">
                Applications for {site.intakeYear} are open
              </h4>
              <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
                Places are limited. Apply now and we&apos;ll be in touch.
              </p>
              <Magnetic>
                <BespokeButton href="/#contact" variant="bespoke-primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Apply for {site.intakeYear}
                </BespokeButton>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-neutral-400">
              © {currentYear} Bespoke Academy. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </footer>
  )
}