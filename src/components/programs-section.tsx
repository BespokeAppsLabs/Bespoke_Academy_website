import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScrollAnimation } from "@/components/scroll-animation"

const programs = [
  {
    icon: BookOpen,
    title: "AI Fundamentals",
    description:
      "Master the foundations of artificial intelligence, from machine learning basics to neural networks. Perfect for beginners looking to enter the world of AI.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    image: "/images/courses/ai-fundamentals.jpg",
    duration: "8 weeks",
    level: "Beginner",
  },
  {
    icon: Users,
    title: "Robotics Engineering",
    description:
      "Learn to design, build, and program robots using modern hardware and software. From basic circuits to autonomous navigation systems.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    image: "/images/courses/robotics-engineering.jpg",
    duration: "12 weeks",
    level: "Intermediate",
  },
  {
    icon: Lightbulb,
    title: "Teacher Training",
    description:
      "Specialized training for educators to effectively deliver our AI and Robotics curriculum. Includes teaching strategies and assessment tools.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    image: "/images/courses/teacher-training.jpg",
    duration: "4 weeks",
    level: "Professional",
  },
]

export function ProgramsSection() {
  return (
    <section id="programs" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <div className="mx-auto max-w-6xl space-y-12">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Our <span className="text-primary">Programs</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Comprehensive educational solutions designed to empower both students and educators
              </p>
            </div>

            {/* Program Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {programs.map((program, index) => {
                const Icon = program.icon
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden"
                  >
                    {/* Course Image */}
                    {program.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg ${program.bgColor} flex items-center justify-center`}>
                              <Icon className={`h-4 w-4 ${program.color}`} />
                            </div>
                            <div className="flex gap-2 text-xs">
                              <span className="bg-primary/20 text-primary px-2 py-1 rounded">{program.level}</span>
                              <span className="bg-secondary/20 text-secondary px-2 py-1 rounded">{program.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <CardHeader className={program.image ? "pt-4" : ""}>
                      {!program.image && (
                        <div className={`w-12 h-12 rounded-lg ${program.bgColor} flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${program.color}`} />
                        </div>
                      )}
                      <CardTitle className="text-xl">{program.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-base leading-relaxed">{program.description}</CardDescription>
                      <Button variant="link" className="p-0 h-auto group/link" asChild>
                        <Link href={`#${program.title.toLowerCase().replace(" ", "-")}`}>
                          Learn More
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
