"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { getFeaturedTestimonials, getRatingStars, formatTestimonialRole, formatTestimonialDate } from "@/data/testimonials"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

export interface SuccessStoriesProps {
  title?: string
  subtitle?: string
  className?: string
  autoPlay?: boolean
  showIndicators?: boolean
}

export function SuccessStories({ 
  title = "STUDENT SUCCESS STORIES",
  subtitle = "Hear from our graduates about their transformation and career success",
  className,
  autoPlay = true,
  showIndicators = true
}: SuccessStoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(!autoPlay)
  const testimonials = getFeaturedTestimonials(5)

  useEffect(() => {
    if (!autoPlay || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, isPaused, testimonials.length])

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsPaused(true)
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className={cn("section-padding relative overflow-hidden", className)}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-30" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 section-content-spacing"
        >
          <h2 className="text-display-lg md:text-display-xl font-bold leading-tight text-foreground">
            {title}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <GlassCard variant="elevated" className="p-8 relative overflow-hidden">
            {/* Testimonial Display */}
            <div className="relative min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div className="text-center space-y-6">
                    {/* Quote Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="w-16 h-16 bg-gradient-to-br from-cyber-blue to-electric-purple rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <Quote className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Testimonial Content */}
                    <div className="space-y-4">
                      <blockquote className="text-body-lg text-muted-foreground leading-relaxed italic">
                        "{currentTestimonial.quote}"
                      </blockquote>
                      
                      <div className="flex items-center justify-center space-x-2">
                        {[...Array(currentTestimonial.rating)].map((_, index) => (
                          <Star
                            key={index}
                            className={cn(
                              "w-5 h-5 transition-colors duration-300",
                              index < currentTestimonial.rating
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                          <img
                            src={currentTestimonial.image}
                            alt={currentTestimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="text-h4 font-semibold text-foreground">
                            {currentTestimonial.name}
                          </h4>
                          <p className="text-body-sm text-cyber-blue font-medium">
                            {formatTestimonialRole(currentTestimonial)}
                          </p>
                        </div>
                      </div>
                      
                      {currentTestimonial.graduationYear && (
                        <p className="text-sm text-muted-foreground">
                          {formatTestimonialDate(currentTestimonial)}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors duration-300 z-20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors duration-300 z-20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </GlassCard>

          {/* Carousel Indicators */}
          {showIndicators && (
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-cyber-blue scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <GlassCard
              variant="glow"
              glowColor="electric-purple"
              className="p-8 max-w-md mx-auto"
            >
              <h3 className="text-h3 font-semibold text-foreground mb-4">
                Read All Success Stories
              </h3>
              <p className="text-body-sm text-muted-foreground mb-6">
                Explore more student journeys and discover how Bespoke Academy 
                transforms careers across different backgrounds and goals.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-cyber-blue to-electric-purple text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                onClick={() => {
                  // Navigate to extended testimonials page
                  window.location.href = '/success-stories'
                }}
              >
                View All Stories
                <ChevronRight className="ml-2 w-4 h-4" />
              </motion.button>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}