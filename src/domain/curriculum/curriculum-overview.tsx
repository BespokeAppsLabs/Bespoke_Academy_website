"use client"

import { useState } from "react"
import Link from "next/link"
import { BespokeButton, BespokeCard, BespokeBadge, BespokeAnimation } from "@/components/ui/bespoke"
import { Clock, Users, Target, Award, ChevronRight, Star, CheckCircle2, Zap, Cpu, Globe, Image, Film, Box, Clapperboard } from "lucide-react"

interface EnhancedCurriculumOverviewProps {
  className?: string
}

type Stream = "engineering" | "media"

// Levels follow the 2027 programme plan. Units are weekend sessions; at the typical pace one unit is one week.
const curriculumFramework = {
  engineering: [
    {
      id: "module-1",
      title: "Level 1: Foundations",
      overview: "Python, Git and GitHub, working with AI tools responsibly, and building circuits in a browser simulator. No hardware yet; every tier does the same work.",
      units: "Units 1-8",
      learningObjectives: [
        { title: "Write small Python programs" },
        { title: "Save and share work on GitHub" },
        { title: "Build circuits in a simulator" },
      ],
      outcomes: {
        technicalSkills: ["Python Basics", "Git & GitHub", "AI Tools", "Circuit Simulation", "Digital Safety"],
        learningOutcomes: ["Text adventure game", "Quiz app with an AI helper", "Traffic light in the simulator"],
      },
      prerequisites: ["No prior experience needed", "A laptop that meets the minimum requirements"],
      equipment: { value: "Laptop only", provided: ["Free software: VS Code, Python, Git", "Browser circuit simulators", "Academy AI tools"] },
      href: "/curriculum/module-1",
    },
    {
      id: "module-2",
      title: "Level 2: Electronics & Microcontrollers",
      overview: "Wire sensors and outputs to a real board and program it. Mid students put devices on Wi-Fi and use a Raspberry Pi; High students start driving motors.",
      units: "Units 9-18",
      learningObjectives: [
        { title: "Wire and program sensors and outputs" },
        { title: "Send sensor data to a laptop or the Pi" },
        { title: "Build your first connected device" },
      ],
      outcomes: {
        technicalSkills: ["Circuits", "Arduino / ESP32", "Sensors", "Wi-Fi Devices", "Raspberry Pi", "Servos"],
        learningOutcomes: ["Plant moisture alarm", "Base: reaction-time game", "Mid and High: Wi-Fi weather station", "High: servo pan-tilt with joystick"],
      },
      prerequisites: ["Level 1 checkpoint passed"],
      equipment: {
        value: "Equipment by tier",
        provided: ["Base: Arduino Uno starter kit, bought by parents", "Mid: ESP32, Raspberry Pi, breadboard, wires and sensors", "High: Mid kit plus an Arduino Mega kit and robotics pack"],
      },
      href: "/curriculum/module-2",
    },
    {
      id: "module-3",
      title: "Level 3: AI & Connected Systems",
      overview: "Train an image model, call AI from your own code and connect AI to hardware. Mid students build connected devices; High students build a robot that drives itself.",
      units: "Units 19-28",
      learningObjectives: [
        { title: "Train and use AI models" },
        { title: "Connect AI to hardware" },
        { title: "Pitch a final-project idea" },
      ],
      outcomes: {
        technicalSkills: ["Model Training", "AI from Python", "Computer Vision", "Data Charts", "Robotics"],
        learningOutcomes: ["Rock-paper-scissors recogniser", "Base: AI study helper", "Mid: power-cut monitor with phone alert", "High: obstacle-avoiding robot"],
      },
      prerequisites: ["Level 2 checkpoint passed"],
      equipment: { value: "Your tier's kit", provided: ["Laptop webcam for AI vision", "Shared academy Pi cameras", "Academy AI tools"] },
      href: "/curriculum/module-3",
    },
    {
      id: "module-4",
      title: "Level 4: Final Project",
      overview: "Design, build and present one project of your own, shown live at the next termly demo day.",
      units: "Units 29-40",
      learningObjectives: [
        { title: "Write a proposal and parts list" },
        { title: "Build, test and document" },
        { title: "Demo it live" },
      ],
      outcomes: {
        technicalSkills: ["Project Design", "3D Printing", "Documentation", "Presentation"],
        learningOutcomes: ["Base: a software and AI project", "Mid: a connected (IoT) device", "High: a robot"],
      },
      prerequisites: ["Level 3 checkpoint passed", "Approved project proposal"],
      equipment: {
        value: "Final-project parts",
        provided: ["Mid: up to R300 in parts", "High: up to R500 in parts", "Academy 3D printer"],
      },
      href: "/curriculum/module-4",
    },
  ],
  media: [
    {
      id: "media-1",
      title: "Level 1: Foundations",
      overview: "Python, Git and working with AI tools, shared with Engineering, then how a digital image is built and how to compose a shot.",
      units: "Units 1-8",
      learningObjectives: [
        { title: "Write simple Python" },
        { title: "Understand pixels, colour and formats" },
        { title: "Compose a strong photo" },
      ],
      outcomes: {
        technicalSkills: ["Python Basics", "Git & GitHub", "AI Tools", "Composition"],
        learningOutcomes: ["Text adventure and quiz app", "Image resize script", "Photo study"],
      },
      prerequisites: ["No prior experience needed", "A laptop that meets the Media requirements"],
      equipment: { value: "Laptop only", provided: ["Free software: VS Code, Python, Git", "A phone camera"] },
    },
    {
      id: "media-2",
      title: "Level 2: Images",
      overview: "Describe any image precisely enough to recreate it, generate and edit images, and automate image work with Python.",
      units: "Units 9-16",
      learningObjectives: [
        { title: "Recreate reference images" },
        { title: "Generate and edit images" },
        { title: "Generate images from code" },
      ],
      outcomes: {
        technicalSkills: ["Image Recreation", "Image Generation", "AI Editing", "Python Imaging", "Ethics"],
        learningOutcomes: ["Recreate and reimagine project", "Contact-sheet script", "Batch generation script"],
      },
      prerequisites: ["Level 1 checkpoint passed"],
      equipment: { value: "Academy AI tools", provided: ["Image and video generation seat", "Monthly generation budget", "Krita or GIMP"] },
    },
    {
      id: "media-3",
      title: "Level 3: Characters & Scenes",
      overview: "Design an original character and keep it looking the same across many scenes, the hardest skill in AI image work.",
      units: "Units 17-24",
      learningObjectives: [
        { title: "Design a character sheet" },
        { title: "Keep a character consistent" },
        { title: "Storyboard a short story" },
      ],
      outcomes: {
        technicalSkills: ["Character Design", "Consistency", "Scene Creation", "Storyboarding", "JSON"],
        learningOutcomes: ["6-panel story with one character", "Character-bible script", "Gallery on GitHub Pages"],
      },
      prerequisites: ["Level 2 checkpoint passed"],
      equipment: { value: "Academy AI tools", provided: ["Image and video generation seat", "Monthly generation budget"] },
    },
    {
      id: "media-4",
      title: "Level 4: Motion",
      overview: "Turn still images into video, edit clips into a short with sound, and build motion graphics in code.",
      units: "Units 25-32",
      learningObjectives: [
        { title: "Turn images into video" },
        { title: "Edit with sound and captions" },
        { title: "Animate titles in code" },
      ],
      outcomes: {
        technicalSkills: ["Image to Video", "Editing", "Voice & Captions", "p5.js", "ffmpeg"],
        learningOutcomes: ["30-second animated short", "Animated intro", "Social media export script"],
      },
      prerequisites: ["Level 3 checkpoint passed"],
      equipment: { value: "Academy AI tools", provided: ["Image and video generation seat", "Free video editor"] },
    },
    {
      id: "media-5",
      title: "Level 5: Blender 3D",
      overview: "Build and render 3D scenes in Blender, bring AI-made 3D models in, and use renders to guide AI images and video.",
      units: "Units 33-40",
      learningObjectives: [
        { title: "Model, light and render in Blender" },
        { title: "Turn an AI image into a 3D model" },
        { title: "Script Blender with Python" },
      ],
      outcomes: {
        technicalSkills: ["Blender", "Modelling", "Lighting", "Animation", "Blender Python"],
        learningOutcomes: ["The character's world in 3D", "Turntable render", "Scene-builder script"],
      },
      prerequisites: ["Level 4 checkpoint passed", "Three-button mouse"],
      equipment: { value: "Free software", provided: ["Blender", "Academy AI tools"] },
    },
    {
      id: "media-6",
      title: "Level 6: Final Project",
      overview: "Make one 60-90-second piece that brings together a consistent character, Blender, motion graphics and a tool you coded, screened at demo day.",
      units: "Units 41-52",
      learningObjectives: [
        { title: "Plan a story and generation budget" },
        { title: "Produce, edit and finish" },
        { title: "Screen it at demo day" },
      ],
      outcomes: {
        technicalSkills: ["Production", "Storytelling", "Pipeline Code", "Presentation"],
        learningOutcomes: ["A short film, music video, ad or trailer", "Portfolio page with a making-of story"],
      },
      prerequisites: ["Level 5 checkpoint passed", "Approved proposal"],
      equipment: { value: "Academy AI tools", provided: ["Monthly generation budget", "Blender and free editors"] },
    },
  ],
}

const streamCopy = {
  engineering: {
    title: "AI & Engineering Curriculum",
    intro: "Coding, AI, electronics, IoT and robotics in four levels. About 10 months at a typical pace, on the Base, Mid or High tier.",
  },
  media: {
    title: "AI & Media Curriculum",
    intro: "AI images and video, characters, motion graphics and Blender 3D, with coding at every level. About 13 months at a typical pace.",
  },
}

export function EnhancedCurriculumOverview({ className }: EnhancedCurriculumOverviewProps) {
  const [stream, setStream] = useState<Stream>("engineering")
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const levels = curriculumFramework[stream]

  const levelIcons = {
    engineering: [Zap, Cpu, Globe, Award],
    media: [Zap, Image, Users, Film, Box, Clapperboard],
  }
  const getModuleIcon = (moduleId: string) => {
    const Icon = levelIcons[stream][levels.findIndex((m) => m.id === moduleId)] ?? Award
    return <Icon className="h-6 w-6" />
  }

  const switchStream = (next: Stream) => {
    setStream(next)
    setSelectedModule(null)
  }

  return (
    <div className={`space-y-12 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <BespokeAnimation preset="slide-in-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BespokeBadge variant="level-badge" className="text-sm font-medium">
              Grades 8-11 • Ages 13-17
            </BespokeBadge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-emerald-600">
            {streamCopy[stream].title}
          </h2>
        </BespokeAnimation>
        <BespokeAnimation preset="slide-in-up" delay={0.2}>
          <p className="mx-auto max-w-3xl text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {streamCopy[stream].intro} Join any month and move up a level when you pass its checkpoint.
          </p>
        </BespokeAnimation>

        {/* Stream switch */}
        <BespokeAnimation preset="slide-in-up" delay={0.3}>
          <div role="tablist" aria-label="Stream" className="inline-flex rounded-full border p-1 gap-1">
            {(["engineering", "media"] as const).map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={stream === s}
                onClick={() => switchStream(s)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  stream === s ? "bg-primary-emerald-600 text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s === "engineering" ? "Engineering" : "Media"}
              </button>
            ))}
          </div>
        </BespokeAnimation>

        {/* Program Stats */}
        <BespokeAnimation preset="slide-in-up" delay={0.4}>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">Join Any Month</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">Grades 8-11</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">Weekend Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">Portfolio Project</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">No Experience Required</span>
            </div>
          </div>
        </BespokeAnimation>
      </div>

      {/* Module Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {levels.map((module, index: number) => (
          <BespokeAnimation key={module.id} preset="slide-in-up" delay={index * 0.1}>
            <BespokeCard
              variant={selectedModule === module.id ? "premium-card" : "course-card"}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedModule === module.id ? 'ring-2 ring-primary-emerald-500 shadow-xl' : ''
              }`}
              onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg border bg-gradient-to-br from-primary-emerald-500 to-primary-emerald-600 text-white">
                    {getModuleIcon(module.id)}
                  </div>
                  <BespokeBadge variant="level-badge" className="font-medium">
                    Level {index + 1}
                  </BespokeBadge>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">{module.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {module.overview}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary-emerald-600" />
                    <span className="text-sm font-medium">{module.units}</span>
                  </div>

                  {/* Key Learning Objectives */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Skills You&apos;ll Gain</h4>
                    <div className="space-y-2">
                      {module.learningObjectives.slice(0, 3).map((objective, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{objective.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Topics */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Topics</h4>
                    <div className="flex flex-wrap gap-1">
                      {module.outcomes.technicalSkills?.slice(0, 3).map((skill, idx) => (
                        <BespokeBadge key={idx} variant="tech-stack" className="text-xs">
                          {skill}
                        </BespokeBadge>
                      ))}
                      {module.outcomes.technicalSkills && module.outcomes.technicalSkills.length > 3 && (
                        <BespokeBadge variant="skill-tag" className="text-xs">
                          +{module.outcomes.technicalSkills.length - 3} more
                        </BespokeBadge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Module Actions */}
                {"href" in module && (
                <div className="flex gap-2 pt-2">
                  <Link href={module.href} className="flex-1" onClick={(e) => e.stopPropagation()}>
                    <BespokeButton
                      variant="bespoke-outline"
                      size="sm"
                      className="w-full"
                    >
                      <span className="text-sm">View Details</span>
                      <ChevronRight className="h-4 w-4" />
                    </BespokeButton>
                  </Link>
                </div>
                )}
              </div>
            </BespokeCard>
          </BespokeAnimation>
        ))}
      </div>

      {/* Detailed Module Content */}
      {selectedModule && (
        <BespokeAnimation preset="slide-in-up">
          <BespokeCard variant="premium-card" className="border-2">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg border bg-gradient-to-br from-primary-emerald-500 to-primary-emerald-600 text-white">
                  {getModuleIcon(selectedModule)}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  {levels.find(m => m.id === selectedModule)?.title}
                </h3>
              </div>
            {(() => {
              const selected = levels.find(m => m.id === selectedModule)
              if (!selected) return null

              return (
                <>
                  {/* Detailed Overview */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Level Overview</h4>
                    <p className="text-muted-foreground leading-relaxed">{selected.overview}</p>
                  </div>

                  {/* Prerequisites */}
                  {selected.prerequisites && selected.prerequisites.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {selected.prerequisites.map((prereq, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Learning Outcomes */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">What Students Will Achieve</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selected.outcomes.learningOutcomes?.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{outcome}</span>
                        </div>
                      ))}
                      {selected.outcomes.technicalSkills?.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Equipment Information */}
                  {selected.equipment && (
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Equipment & Tools</h4>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{selected.equipment.value}</p>
                        <ul className="space-y-1">
                          {selected.equipment.provided.map((item, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                              <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </BespokeCard>
        </BespokeAnimation>
      )}

      {/* Program Structure Timeline */}
      <BespokeAnimation preset="slide-in-up" delay={0.6}>
        <BespokeCard variant="premium-card" className="p-6">
          <h3 className="text-3xl md:text-4xl font-semibold text-primary-emerald-600 mb-6 text-center">
            Level by Level
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-emerald-500 to-primary-emerald-600"></div>

            {levels.map((phase, index) => (
              <div key={index} className="relative flex items-start gap-6 pb-8 last:pb-0">
                {/* Timeline Dot */}
                <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg bg-gradient-to-br from-primary-emerald-500 to-primary-emerald-600">
                  {index + 1}
                </div>

                {/* Phase Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-foreground mb-1">{phase.title}</h4>
                  <p className="text-sm text-primary-emerald-600 font-medium mb-2">{phase.units}</p>
                  <p className="text-sm text-muted-foreground">{phase.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </BespokeCard>
      </BespokeAnimation>

      {/* Call to Action */}
      <BespokeAnimation preset="slide-in-up" delay={0.8}>
        <div className="text-center pt-8">
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our Engineering or Media stream, designed specifically for Grades 8-11.
            Transform from curious beginner to confident creator, ready for the future of technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BespokeButton href="/#contact" variant="bespoke-primary" size="lg" className="font-medium">
              Enroll Your Teen
              <ChevronRight className="ml-2 h-4 w-4" />
            </BespokeButton>
            <BespokeButton href="/courses#fees" variant="bespoke-outline" size="lg" className="font-medium">
              Fees & Laptop Requirements
              <Users className="ml-2 h-4 w-4" />
            </BespokeButton>
          </div>
        </div>
      </BespokeAnimation>
    </div>
  )
}