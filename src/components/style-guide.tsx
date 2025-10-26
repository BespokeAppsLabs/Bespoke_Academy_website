"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react"
import Image from "next/image"

export function StyleGuide() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header */}
        <header className="space-y-4 border-b border-border pb-8">
          <h1 className="text-5xl font-bold text-balance">OpeN9 Design System</h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive style guide for educational platform interfaces
          </p>
        </header>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Color Palette</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-primary" />
              <p className="font-semibold">Primary</p>
              <p className="text-sm text-muted-foreground">Orange (#d46c08)</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-secondary border border-border" />
              <p className="font-semibold">Secondary</p>
              <p className="text-sm text-muted-foreground">Light Peach (#ffe8d1)</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-background border border-border" />
              <p className="font-semibold">Background (Light)</p>
              <p className="text-sm text-muted-foreground">Light Gray (#fcfcfc)</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-surface border border-border" />
              <p className="font-semibold">Surface</p>
              <p className="text-sm text-muted-foreground">Dark Brown (#261f18)</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#00ffff]" />
              <p className="font-semibold">Accent Cyan</p>
              <p className="text-sm text-muted-foreground">#00ffff</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#b794f6]" />
              <p className="font-semibold">Accent Purple</p>
              <p className="text-sm text-muted-foreground">#b794f6</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#00ff88]" />
              <p className="font-semibold">Accent Green</p>
              <p className="text-sm text-muted-foreground">#00ff88</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-muted-foreground border border-border" />
              <p className="font-semibold">Muted</p>
              <p className="text-sm text-muted-foreground">Gray tones</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#2b2927]" />
              <p className="font-semibold">Background (Dark)</p>
              <p className="text-sm text-muted-foreground">#2b2927</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Typography</h2>
          <div className="space-y-4 rounded-lg bg-surface p-6">
            <h1 className="text-5xl font-bold">Heading 1 - 48px Bold</h1>
            <h2 className="text-4xl font-bold">Heading 2 - 36px Bold</h2>
            <h3 className="text-3xl font-bold">Heading 3 - 30px Bold</h3>
            <h4 className="text-2xl font-semibold">Heading 4 - 24px Semibold</h4>
            <p className="text-lg">Body Large - 18px Regular</p>
            <p className="text-base">Body - 16px Regular</p>
            <p className="text-sm text-muted-foreground">Body Small - 14px Muted</p>
            <p className="text-xs text-muted-foreground">Caption - 12px Muted</p>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Buttons</h2>

          <div className="space-y-4">
            <div>
              <h3 className="mb-4 text-xl font-semibold">Primary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="lg">
                  Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="default">
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="default" size="sm">
                  Submit Assignment
                </Button>
                <Button variant="default" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">Secondary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="lg">
                  View All Courses <BookOpen className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="secondary">
                  Browse Catalog <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="secondary" size="sm">
                  Learn More
                </Button>
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">Outline Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="lg">
                  View Details
                </Button>
                <Button variant="outline">Learn More</Button>
                <Button variant="outline" size="sm">
                  Share
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">Ghost Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost" size="lg">
                  <BookOpen className="mr-2 h-4 w-4" /> Save Course
                </Button>
                <Button variant="ghost">Cancel</Button>
                <Button variant="ghost" size="sm">
                  Skip
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs & Labels */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Inputs & Labels</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Student Email</Label>
              <Input id="email" type="email" placeholder="student@university.edu" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="search">Search Courses</Label>
              <Input id="search" type="search" placeholder="Search by subject, instructor..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-id">Student ID</Label>
              <Input id="student-id" type="text" placeholder="Enter your student ID" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input id="disabled" disabled placeholder="Disabled field" />
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Cards</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Course Card */}
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-surface-elevated">
                <div className="absolute right-3 top-3 z-10">
                  <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full bg-surface/80 p-0 backdrop-blur">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
                <Image
                  src="/images/courses/ai-fundamentals.jpg"
                  alt="AI Fundamentals Course"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Introduction to Web Development</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#00ffff]" />
                  <span>Dr. Sarah Johnson</span>
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-semibold">12 weeks</p>
                </div>
                <Button size="sm">Enroll Now</Button>
              </CardFooter>
            </Card>

            {/* Info Card */}
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Start Your Journey</CardTitle>
                <CardDescription>
                  Create your student profile and get access to thousands of courses across multiple disciplines.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent">
                  Create Profile
                </Button>
              </CardFooter>
            </Card>

            {/* Stats Card */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">50K+</CardTitle>
                <CardDescription className="text-base">Active Students</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Join a thriving community of learners from around the world
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Badges</h2>

          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Featured Course</Badge>
            <Badge variant="secondary">New</Badge>
            <Badge variant="outline">Popular</Badge>
            <Badge className="bg-[#00ffff] text-background hover:bg-[#00ffff]/90">Live Session</Badge>
            <Badge className="bg-[#b794f6] text-white hover:bg-[#b794f6]/90">Advanced</Badge>
            <Badge className="bg-[#d46c08] text-white hover:bg-[#d46c08]/90">Beginner</Badge>
          </div>
        </section>

        {/* Dialog */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Dialogs</h2>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enroll in Course</DialogTitle>
                <DialogDescription>
                  Complete your enrollment for Introduction to Web Development. This course starts on January 15, 2025.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="student-name">Full Name</Label>
                  <Input id="student-name" type="text" placeholder="Enter your full name" />
                </div>
                <div className="rounded-lg bg-surface p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Course Duration</span>
                    <span className="font-semibold">12 weeks</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Credits</span>
                    <span className="font-semibold">3 credits</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Confirm Enrollment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>OpeN9 Design System • Built with Next.js and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}
