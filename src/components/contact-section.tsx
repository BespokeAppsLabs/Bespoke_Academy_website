"use client"

import type React from "react"

import { GradientButton } from "@/components/ui/gradient-button"
import { GlassCard } from "@/components/ui/glass-card"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Phone, MessageCircle, Send, Clock, Users } from "lucide-react"
import { useState } from "react"
import { ChatInterface } from "@/components/chat"

export function ContactSection() {
  const [contactMethod, setContactMethod] = useState<'form' | 'chat'>('form')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitStatus("success")
    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitStatus("idle"), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden pt-8 pb-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-30" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Section Header */}
          <ScrollAnimation variant="fadeUp" delay={0}>
            <div className="text-center space-y-6 section-content-spacing">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
                Get In Touch
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Have questions about our programs? We'd love to hear from you.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation variant="fadeUp" delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                <GlassCard variant="elevated" className="hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyber-blue to-electric-purple flex items-center justify-center mb-4">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Email Us</h3>
                    <p className="text-body text-muted-foreground">info@bespokeacademy.edu</p>
                  </div>
                </GlassCard>

                <GlassCard variant="elevated" className="hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-electric-purple to-neon-cyan flex items-center justify-center mb-4">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Call Us</h3>
                    <p className="text-body text-muted-foreground">(555) 123-4567</p>
                  </div>
                </GlassCard>

                <GlassCard variant="elevated" className="hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-neon-cyan to-tech-green flex items-center justify-center mb-4">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Visit Us</h3>
                    <p className="text-body text-muted-foreground">123 Education Lane, Tech City</p>
                  </div>
                </GlassCard>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <GlassCard variant="elevated">
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl md:text-4xl font-semibold text-foreground">
                        Get in Touch
                      </h3>
                      <p className="text-body text-muted-foreground">
                        Choose how you'd like to reach us - we're here to help!
                      </p>
                    </div>

                    {/* Contact Method Toggle */}
                    <div className="flex gap-2 mb-6">
                      <GradientButton
                        variant={contactMethod === 'form' ? 'primary' : 'outline'}
                        onClick={() => setContactMethod('form')}
                        className="flex items-center gap-2 flex-1 justify-center"
                      >
                        <Send className="h-4 w-4" />
                        Contact Form
                      </GradientButton>
                      <GradientButton
                        variant={contactMethod === 'chat' ? 'primary' : 'outline'}
                        onClick={() => setContactMethod('chat')}
                        className="flex items-center gap-2 flex-1 justify-center"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Live Chat
                      </GradientButton>
                    </div>

                    {/* Contact Form */}
                    {contactMethod === 'form' && (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">
                            Message <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your inquiry..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full resize-none"
                          />
                        </div>

                        {submitStatus === "success" && (
                          <div className="p-4 rounded-lg bg-tech-green/10 border border-tech-green/30 text-sm text-tech-green">
                            Thank you for your message! We'll get back to you soon.
                          </div>
                        )}

                        <GradientButton type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </GradientButton>
                      </form>
                    )}

                    {/* Live Chat */}
                    {contactMethod === 'chat' && (
                      <div className="space-y-4">
                        <div className="text-center space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-tech-green animate-pulse" />
                            <span className="text-sm text-tech-green font-medium">AI Assistant Online</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Get instant answers about our programs, courses, and enrollment process.
                          </p>
                        </div>

                        <div className="h-[500px] w-full rounded-xl border border-cyber-blue/30 overflow-hidden">
                          <ChatInterface embedded={true} />
                        </div>

                        <div className="text-center text-xs text-muted-foreground">
                          <span className="text-cyber-blue">Powered by AI</span> • <span className="text-electric-purple">Available 24/7</span> • <span className="text-tech-green">Response time typically under 2 seconds</span>
                        </div>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}