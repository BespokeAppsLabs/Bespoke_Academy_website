"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BespokeCard } from "@/components/ui/bespoke/bespokeCard";
import { BespokeButton } from "@/components/ui/bespoke/bespokeButton";
import { ParallelLinesBackground } from "@/components/ui/parallel-lines-background";
import { Mail, Send, UserCheck, MessageCircle, Calendar } from "lucide-react";
import { site } from "@/config/site";
import { ease } from "@/lib/motion";
import { GoldUnderline } from "@/components/ui/gold-underline";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="contact" className="py-24 scroll-mt-20 bg-zinc-50 text-zinc-900 relative overflow-hidden">
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="light" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-10 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-gold-700 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Connect With Us
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-zinc-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Shape Your Teen&apos;s
            <span className="text-primary-emerald-600 block"><GoldUnderline>AI Future.</GoldUnderline></span>
          </motion.h2>

          <motion.p
            className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Applications are open, and students can join any month. Send us your details or a question
            and we&apos;ll get back to you about the {site.program.grades} programme.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            className="order-last lg:order-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <BespokeCard variant="course-card" size="default" className="p-5 lg:p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-emerald-50 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900">WhatsApp</h3>
                  <p className="text-zinc-500 text-sm">Fastest response</p>
                </div>
              </div>
              <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-primary-emerald-600">
                {site.whatsapp.display}
              </a>
            </BespokeCard>

            <BespokeCard variant="course-card" size="default" className="p-5 lg:p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-emerald-50 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900">Email</h3>
                  <p className="text-zinc-500 text-sm">General enquiries</p>
                </div>
              </div>
              <a href={`mailto:${site.email}`} className="text-zinc-600 hover:text-primary-emerald-600">
                {site.email}
              </a>
            </BespokeCard>

            <BespokeCard variant="course-card" size="default" className="p-5 lg:p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-emerald-50 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900">Class Schedule</h3>
                  <p className="text-zinc-500 text-sm">{site.program.start}</p>
                </div>
              </div>
              <p className="text-zinc-600">{site.program.schedule} in {site.program.location}, mixed-level classes</p>
            </BespokeCard>

            <BespokeCard variant="course-card" size="default" className="p-5 lg:p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-emerald-50 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-primary-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900">Parent Questions</h3>
                  <p className="text-zinc-500 text-sm">Before you apply</p>
                </div>
              </div>
              <p className="text-zinc-600">
                Ask us anything about the curriculum, equipment or fees before applying.
              </p>
            </BespokeCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <BespokeCard
              variant="course-card"
              size="lg"
              className="p-5 sm:p-8 hover:scale-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot, hidden from people */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <Input
                      type="text"
                      name="parentName" required
                      aria-label="Parent/Guardian Name"
                      placeholder="Parent/Guardian Name"
                      className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-500 focus:border-primary-emerald-500 focus:ring-primary-emerald-500/20 h-12"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input
                      type="email"
                      name="email" required
                      aria-label="Email Address"
                      placeholder="Email Address"
                      className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-500 focus:border-primary-emerald-500 focus:ring-primary-emerald-500/20 h-12"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input
                      type="tel"
                      name="phone"
                      aria-label="Phone Number"
                      placeholder="Phone Number"
                      className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-500 focus:border-primary-emerald-500 focus:ring-primary-emerald-500/20 h-12"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input
                      type="text"
                      name="studentName"
                      aria-label="Student's Name"
                      placeholder="Student's Name"
                      className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-500 focus:border-primary-emerald-500 focus:ring-primary-emerald-500/20 h-12"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input
                      type="text"
                      name="grade"
                      aria-label="Student's Grade Level"
                      placeholder="Student's Grade Level"
                      className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-500 focus:border-primary-emerald-500 focus:ring-primary-emerald-500/20 h-12"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Select name="tier" defaultValue="unsure">
                      <SelectTrigger aria-label="Programme" className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-500 focus:border-primary-emerald-500 focus:ring-primary-emerald-500/20 h-12">
                        <SelectValue placeholder="Programme" />
                      </SelectTrigger>
                      <SelectContent>
                        {site.tiers.map((tier) => (
                          <SelectItem key={tier.id} value={tier.id}>
                            {tier.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="unsure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <Select name="intent" defaultValue="apply">
                    <SelectTrigger aria-label="I would like to..." className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-500 focus:border-primary-emerald-500 focus:ring-primary-emerald-500/20 h-12">
                      <SelectValue placeholder="I would like to..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apply">Apply now</SelectItem>
                      <SelectItem value="question">General question</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Textarea
                    name="message"
                    aria-label="Message"
                    placeholder="Tell us about your teen's interests and learning goals..."
                    className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-500 focus:border-primary-emerald-500 focus:ring-primary-emerald-500/20 min-h-[120px] resize-none"
                    rows={4}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <BespokeButton
                      variant="bespoke-premium"
                      size="lg"
                      type="submit"
                      disabled={status === "sending"}
                      className={`font-semibold transition-[opacity,transform] duration-300 ${status === "sending" ? "opacity-70 scale-[0.98]" : ""}`}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </BespokeButton>
                  </div>
                  <p role="status" aria-live="polite" className="mt-4 text-sm">
                    {status === "sent" && (
                      <motion.span
                        className="inline-flex items-center gap-3 text-gold-700"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                          <motion.circle
                            cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, ease: ease.outExpo }}
                          />
                          <motion.path
                            d="M7.5 12.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.35, ease: ease.outExpo }}
                          />
                        </svg>
                        Thank you. We&apos;ll be in touch soon.
                      </motion.span>
                    )}
                    {status === "error" && (
                      <motion.span className="inline-block text-red-600" initial={{ x: -6 }} animate={{ x: [6, -4, 2, 0] }} transition={{ duration: 0.4 }}>
                        Something went wrong. Please email {site.email} or WhatsApp {site.whatsapp.display}.
                      </motion.span>
                    )}
                  </p>
                </motion.div>

              </form>
            </BespokeCard>
          </motion.div>
        </div>

      </div>
    </section>
  );
}