"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BespokeCard } from "@/components/ui/bespoke/bespokeCard";
import { BespokeButton } from "@/components/ui/bespoke/bespokeButton";
import { ParallelLinesBackground } from "@/components/ui/parallel-lines-background";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Users,
  Globe,
  Award,
  Headphones,
  GraduationCap,
  UserCheck,
  MessageCircle,
  Calendar
} from "lucide-react";

export default function ContactSection() {
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
    <section className="py-24 bg-neutral-850 text-white relative overflow-hidden">
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="dark" />

      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-900 opacity-95" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-primary-emerald-400 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Connect With Us
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Shape Your Teen's
            <span className="text-primary-emerald-400 block">AI Future.</span>
          </motion.h2>

          <motion.p
            className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Ready to give your child the competitive edge in AI and robotics? Our education specialists
            are here to answer your questions and guide you through enrollment for our Grade 8-11 program.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Parent Consultation */}
            <BespokeCard
              variant="glass-card"
              size="default"
              className="p-6 hover:bg-white/5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-emerald-500/20 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-primary-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Parent Consultation</h3>
                  <p className="text-neutral-400 text-sm">Personal Guidance</p>
                </div>
              </div>
              <p className="text-neutral-300">
                Schedule a 1-on-1 session with our education advisors to discuss your teen's learning journey.
              </p>
            </BespokeCard>

            {/* Campus Locations */}
            <BespokeCard
              variant="glass-card"
              size="default"
              className="p-6 hover:bg-white/5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-emerald-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Learning Centers</h3>
                  <p className="text-neutral-400 text-sm">In-Person & Online</p>
                </div>
              </div>
              <p className="text-neutral-300">
                San Francisco • New York • Los Angeles • Chicago • Houston • Online Programs
              </p>
            </BespokeCard>

            {/* Class Schedule */}
            <BespokeCard
              variant="glass-card"
              size="default"
              className="p-6 hover:bg-white/5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Class Schedule</h3>
                  <p className="text-neutral-400 text-sm">Friday Sessions</p>
                </div>
              </div>
              <p className="text-neutral-300">
                Weekly Classes: Fridays 4:00 PM - 7:00 PM<br />
                Weekend Workshops: Saturday Mornings
              </p>
            </BespokeCard>

            {/* Quick Contact */}
            <BespokeCard
              variant="glass-card"
              size="default"
              className="p-6 hover:bg-white/5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-emerald-500/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Quick Questions?</h3>
                  <p className="text-neutral-400 text-sm">We're here to help</p>
                </div>
              </div>
              <p className="text-neutral-300 text-sm mb-3">
                Get instant answers about curriculum, pricing, and enrollment.
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <p className="text-neutral-300">
                  <Phone className="inline w-4 h-4 mr-2" />
                  1-888-TEEN-AI-EDU
                </p>
                <p className="text-neutral-300">
                  <Mail className="inline w-4 h-4 mr-2" />
                  parents@bespoke.academy
                </p>
              </div>
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
              variant="glass-card"
              size="lg"
              className="p-8"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <Input
                      type="text"
                      placeholder="Parent/Guardian Name"
                      className="bg-neutral-900/50 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-emerald-400 focus:ring-primary-emerald-400/20 h-12"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="bg-neutral-900/50 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-emerald-400 focus:ring-primary-emerald-400/20 h-12"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      className="bg-neutral-900/50 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-emerald-400 focus:ring-primary-emerald-400/20 h-12"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input
                      type="text"
                      placeholder="Student's Grade Level"
                      className="bg-neutral-900/50 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-emerald-400 focus:ring-primary-emerald-400/20 h-12"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <Select>
                    <SelectTrigger className="bg-neutral-900/50 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-emerald-400 focus:ring-primary-emerald-400/20 h-12">
                      <SelectValue placeholder="Program Interest..." />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-600">
                      <SelectItem value="ai-robotics">AI & Robotics (Grades 8-11)</SelectItem>
                      <SelectItem value="machine-learning">Machine Learning Fundamentals</SelectItem>
                      <SelectItem value="coding-python">Python Programming</SelectItem>
                      <SelectItem value="computer-vision">Computer Vision & AI</SelectItem>
                      <SelectItem value="robotics-hardware">Robotics Hardware</SelectItem>
                      <SelectItem value="weekend-workshop">Weekend Workshops</SelectItem>
                      <SelectItem value="summer-camp">Summer Camp Programs</SelectItem>
                      <SelectItem value="parent-info">Parent Information Session</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Textarea
                    placeholder="Tell us about your teen's interests and learning goals..."
                    className="bg-neutral-900/50 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-emerald-400 focus:ring-primary-emerald-400/20 min-h-[120px] resize-none"
                    rows={4}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <BespokeButton
                      variant="bespoke-premium"
                      size="lg"
                      type="submit"
                      className="font-semibold"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </BespokeButton>
                    <BespokeButton
                      variant="bespoke-outline"
                      size="lg"
                      type="button"
                      className="font-semibold"
                    >
                      Schedule Call
                    </BespokeButton>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2 text-neutral-400 text-sm"
                >
                  <Clock className="w-4 h-4" />
                  <span>We respond within 24 hours (usually much faster!)</span>
                </motion.div>
              </form>
            </BespokeCard>
          </motion.div>
        </div>

        {/* Bottom Trust Indicators */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-primary-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">500+ Teens Enrolled</h3>
            <p className="text-neutral-400 text-sm">Building tomorrow's tech leaders</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">12:1 Student Ratio</h3>
            <p className="text-neutral-400 text-sm">Personalized attention for every teen</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Parent Approved</h3>
            <p className="text-neutral-400 text-sm">4.9/5 parent satisfaction rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}