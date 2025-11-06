"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "AI Engineer",
    company: "Tech Corp",
    content: "Bespoke Academy transformed my career. The hands-on projects and expert mentorship helped me land my dream job in AI.",
    avatar: "/images/testimonials/sarah.jpg",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Data Scientist",
    company: "DataWorks",
    content: "The curriculum is cutting-edge and perfectly aligned with industry needs. I felt confident and prepared for real-world challenges.",
    avatar: "/images/testimonials/michael.jpg",
    rating: 5
  },
  {
    name: "Emily Johnson",
    role: "ML Researcher",
    company: "AI Labs",
    content: "The personalized learning approach and expert instructors made all the difference. Highly recommend for anyone serious about AI.",
    avatar: "/images/testimonials/emily.jpg",
    rating: 5
  },
  {
    name: "David Kim",
    role: "AI Product Manager",
    company: "InnovateTech",
    content: "From zero knowledge to leading AI projects in just 20 weeks. The career support team helped me transition seamlessly.",
    avatar: "/images/testimonials/david.jpg",
    rating: 5
  },
  {
    name: "Aisha Patel",
    role: "AI Consultant",
    company: "Digital Future",
    content: "The practical approach and real-world case studies gave me the confidence to consult on enterprise AI implementations.",
    avatar: "/images/testimonials/aisha.jpg",
    rating: 5
  }
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 relative overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold mb-4 text-cyber-blue">
            Student Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from our graduates who have transformed their careers with AI education
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-background/40 backdrop-blur-md border border-white/10 shadow-xl">
                  <CardContent className="p-8 md:p-12">
                    <Quote className="w-12 h-12 text-cyber-blue/20 mb-6" />

                    <blockquote className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                      "{testimonials[currentIndex].content}"
                    </blockquote>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-blue to-electric-purple p-0.5">
                          <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
                            <span className="text-lg font-bold text-white">
                              {testimonials[currentIndex].name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{testimonials[currentIndex].name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:ring-offset-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => goToSlide(index)}
                     className={cn(
                       "h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:ring-offset-2",
                       index === currentIndex
                         ? "w-8 bg-cyber-blue"
                         : "bg-white/30 hover:bg-white/50"
                     )}
                     aria-label={`Go to testimonial ${index + 1}`}
                     aria-current={index === currentIndex ? "true" : "false"}
                   />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:ring-offset-2"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(1).map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="glass-morphism rounded-xl p-6 cursor-pointer hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => goToSlide(testimonials.indexOf(testimonial))}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-blue to-electric-purple p-0.5">
                  <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}