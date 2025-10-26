"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "High School Teacher",
    school: "Lincoln High School",
    image: "/images/testimonials/female-teacher.jpg",
    quote:
      "The Bespoke Academy curriculum has transformed how I teach technology. My students are more engaged than ever, and I've seen remarkable growth in their problem-solving skills and confidence.",
    initials: "SJ",
  },
  {
    name: "Marcus Chen",
    role: "11th Grade Student",
    school: "Roosevelt Academy",
    image: "/images/testimonials/male-student.jpg",
    quote:
      "Learning AI and robotics through Bespoke Academy opened my eyes to what's possible. I went from knowing nothing about programming to building my own autonomous robot in just 8 weeks!",
    initials: "MC",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "STEM Coordinator",
    school: "Washington School District",
    image: "/images/testimonials/female-coordinator.jpg",
    quote:
      "We've implemented Bespoke Academy across our district, and the results speak for themselves. Student interest in STEM careers has increased by 40%, and teachers feel empowered with excellent resources.",
    initials: "ER",
  },
  {
    name: "James Patterson",
    role: "12th Grade Student",
    school: "Jefferson High School",
    image: "/images/testimonials/male-student-glasses.jpg",
    quote:
      "The hands-on projects made all the difference. I'm now pursuing computer science in college, and I feel so much more prepared than my peers thanks to this program.",
    initials: "JP",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isPaused])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              What People Are <span className="text-primary">Saying</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Hear from teachers and students who have experienced the impact of our programs
            </p>
          </div>

          {/* Carousel */}
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <Card className="border-2 border-border/50 shadow-lg">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  {/* Quote Icon */}
                  <Quote className="h-12 w-12 text-primary/20" />

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90 italic">
                    "{currentTestimonial.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
                      <AvatarImage src={currentTestimonial.image || "/placeholder.svg"} alt={currentTestimonial.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {currentTestimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{currentTestimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{currentTestimonial.role}</div>
                      <div className="text-sm text-muted-foreground">{currentTestimonial.school}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                aria-label="Previous testimonial"
                className="rounded-full bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex ? "w-8 bg-primary" : "w-2 bg-border"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                aria-label="Next testimonial"
                className="rounded-full bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
