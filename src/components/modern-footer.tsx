"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LogoStacked } from "@/components/ui/logo"
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
  Award,
  Users,
  Globe
} from "lucide-react"

export function ModernFooter() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    academy: [
      { name: "About Us", href: "#about" },
      { name: "Our Mission", href: "#mission" },
      { name: "Instructors", href: "#instructors" },
      { name: "Success Stories", href: "#success" }
    ],
    programs: [
      { name: "AI & Machine Learning", href: "#ai-ml" },
      { name: "Data Science", href: "#data-science" },
      { name: "Product Management", href: "#product-mgmt" },
      { name: "Corporate Training", href: "#corporate" }
    ],
    resources: [
      { name: "Student Portal", href: "#portal" },
      { name: "Career Services", href: "#careers" },
      { name: "Blog & Resources", href: "#blog" },
      { name: "Support Center", href: "#support" }
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

  const stats = [
    { icon: <Users className="w-5 h-5" />, number: "30K+", label: "Students Worldwide" },
    { icon: <Award className="w-5 h-5" />, number: "98%", label: "Success Rate" },
    { icon: <Globe className="w-5 h-5" />, number: "150+", label: "Partner Companies" }
  ]

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-neutral-800">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Stay Ahead of the <span className="text-primary-emerald-400">AI Revolution</span>
              </h2>
              <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
                Get the latest insights on AI education, career opportunities, and exclusive course updates delivered to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-emerald-500 focus:border-transparent"
                />
                <Button className="bg-primary-emerald-500 hover:bg-primary-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                  Subscribe
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

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
                <p className="text-sm text-primary-emerald-400">Transform Your Future with AI</p>
              </div>
            </div>

            <p className="text-neutral-300 leading-relaxed max-w-sm">
              Empowering professionals and students with cutting-edge AI education.
              Join our global community of learners and transform your career with industry-recognized programs.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-primary-emerald-400 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-xs text-neutral-400">{stat.label}</div>
                </div>
              ))}
            </div>
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
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">Email</div>
                    <div className="text-sm text-neutral-300">learn@bespoke.academy</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-primary-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">Phone</div>
                    <div className="text-sm text-neutral-300">+1 (415) 555-0123</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-primary-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">Locations</div>
                    <div className="text-sm text-neutral-300">San Francisco, London, Singapore & Online</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
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
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center hover:bg-primary-emerald-500 hover:text-white hover:border-primary-emerald-500 transition-all duration-300 group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 group-hover:text-white transition-colors" />
                    </motion.a>
                  )
                })}
              </div>
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
            <div className="bg-gradient-to-r from-primary-emerald-500/20 to-primary-emerald-600/20 rounded-xl p-8 border border-primary-emerald-500/30 max-w-4xl mx-auto">
              <h4 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your AI Journey?
              </h4>
              <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
                Join our next cohort and transform your career with cutting-edge AI expertise and hands-on experience.
              </p>
              <Button className="bg-primary-emerald-500 hover:bg-primary-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto">
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-neutral-400">
              © {currentYear} Bespoke Academy. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-neutral-400 hover:text-primary-emerald-400 transition-colors duration-300"
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