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
      { name: "Apply now", href: "/#contact" }
    ],
    programs: [
      { name: "Engineering Stream", href: "/curriculum" },
      { name: "Media Stream", href: "/curriculum" },
      { name: "Fees & Tiers", href: "/courses#fees" },
      { name: "Laptop Requirements", href: "/courses#laptop" }
    ]
  }

  return (
    <footer className="bg-zinc-50 text-zinc-900 border-t border-zinc-200">
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
                <h3 className="text-xl font-bold text-zinc-900">Bespoke Academy</h3>
                <p className="text-sm text-primary-emerald-600">AI Engineering & Media for Grades 8–11</p>
              </div>
            </div>

            <p className="text-zinc-600 leading-relaxed max-w-sm">
              A hands-on AI programme for {site.program.grades} learners in {site.program.location}, with Engineering and Media streams.
              Applications are open. {site.program.start}.
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
            <h4 className="text-lg font-semibold text-zinc-900 mb-4">Academy</h4>
            <ul className="space-y-3">
              {footerLinks.academy.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-primary-emerald-600 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
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
            <h4 className="text-lg font-semibold text-zinc-900 mb-4">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-primary-emerald-600 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
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
              <h4 className="text-lg font-semibold text-zinc-900 mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-primary-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-900">Email</div>
                    <div className="text-sm text-zinc-600 group-hover:text-primary-emerald-600">{site.email}</div>
                  </div>
                </a>
                <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-primary-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-primary-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-900">WhatsApp</div>
                    <div className="text-sm text-zinc-600 group-hover:text-primary-emerald-600">{site.whatsapp.display}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-zinc-900 mb-4">Follow Bespoke Apps</h4>
              <div className="flex flex-wrap gap-3">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 h-9 rounded-lg bg-white border border-zinc-200 flex items-center text-sm hover:bg-primary-emerald-500 hover:border-primary-emerald-500 hover:text-white transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Related sites */}
            <div>
              <h4 className="text-lg font-semibold text-zinc-900 mb-4">Also by Bespoke</h4>
              <ul className="space-y-3">
                {site.related.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-600 hover:text-primary-emerald-600 transition-colors inline-flex items-center gap-2"
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
        <div className="border-t border-zinc-200 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-primary-emerald-50 via-gold-50 to-primary-emerald-50 rounded-xl p-8 border border-gold-500/30 max-w-4xl mx-auto">
              <h4 className="text-2xl font-bold text-zinc-900 mb-4">
                Applications are open
              </h4>
              <p className="text-zinc-600 mb-6 max-w-2xl mx-auto">
                Places are limited. Apply now and we&apos;ll be in touch.
              </p>
              <Magnetic>
                <BespokeButton href="/#contact" variant="bespoke-primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Apply now
                </BespokeButton>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-zinc-500">
              © {currentYear} Bespoke Academy. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </footer>
  )
}