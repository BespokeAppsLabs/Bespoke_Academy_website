"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

const curriculumWeeks = [
  {
    week: 1,
    title: "Introduction to AI & Robotics",
    topics: ["What is Artificial Intelligence?", "History of Robotics", "Real-world Applications", "Ethics in AI"],
    objectives: [
      "Understand fundamental AI concepts",
      "Identify different types of robots",
      "Recognize ethical considerations in technology",
    ],
    projects: "Build a simple robot prototype using basic materials",
  },
  {
    week: 2,
    title: "Programming Fundamentals",
    topics: ["Python Basics", "Variables and Data Types", "Control Flow", "Functions and Modules"],
    objectives: ["Write basic Python programs", "Understand programming logic and syntax", "Debug simple code errors"],
    projects: "Create a calculator program with multiple functions",
  },
  {
    week: 3,
    title: "Sensors and Actuators",
    topics: ["Types of Sensors", "Motor Control", "Input/Output Systems", "Circuit Design Basics"],
    objectives: ["Identify common sensors and their uses", "Control motors programmatically", "Design simple circuits"],
    projects: "Build a light-following robot using sensors",
  },
  {
    week: 4,
    title: "Machine Learning Basics",
    topics: ["Supervised vs Unsupervised Learning", "Training Models", "Data Collection", "Model Evaluation"],
    objectives: ["Understand ML fundamentals", "Train a simple classification model", "Evaluate model performance"],
    projects: "Create an image classifier for everyday objects",
  },
  {
    week: 5,
    title: "Computer Vision",
    topics: ["Image Processing", "Object Detection", "Face Recognition", "OpenCV Library"],
    objectives: [
      "Process and analyze images",
      "Implement object detection algorithms",
      "Build vision-based applications",
    ],
    projects: "Develop a face detection system using OpenCV",
  },
  {
    week: 6,
    title: "Natural Language Processing",
    topics: ["Text Analysis", "Sentiment Analysis", "Chatbots", "Language Models"],
    objectives: [
      "Process and analyze text data",
      "Build conversational interfaces",
      "Understand language model basics",
    ],
    projects: "Create a chatbot that answers questions about robotics",
  },
  {
    week: 7,
    title: "Robot Navigation",
    topics: ["Path Planning", "Obstacle Avoidance", "Mapping", "Autonomous Systems"],
    objectives: ["Implement navigation algorithms", "Design autonomous robot behaviors", "Create environment maps"],
    projects: "Build an autonomous maze-solving robot",
  },
  {
    week: 8,
    title: "Final Project & Showcase",
    topics: ["Project Planning", "Integration", "Testing", "Presentation Skills"],
    objectives: [
      "Apply all learned concepts",
      "Work collaboratively on complex projects",
      "Present technical work effectively",
    ],
    projects: "Design and build a complete AI-powered robot system",
  },
]

export function CurriculumSection() {
  return (
    <section id="curriculum" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Curriculum <span className="text-primary">Overview</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              An 8-week journey from foundational concepts to advanced AI and Robotics applications. Each week builds
              upon the last, culminating in a comprehensive final project.
            </p>
          </div>

          {/* Interactive Accordion Timeline */}
          <Accordion type="single" collapsible className="space-y-4">
            {curriculumWeeks.map((week) => (
              <AccordionItem
                key={week.week}
                value={`week-${week.week}`}
                className="border border-border rounded-lg bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-center gap-4 text-left w-full">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{week.week}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">Week {week.week}</div>
                      <div className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {week.title}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="space-y-6 pl-16">
                    {/* Topics */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Topics Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        {week.topics.map((topic, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Learning Objectives */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Learning Objectives</h4>
                      <ul className="space-y-2">
                        {week.objectives.map((objective, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Project */}
                    <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-accent">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Hands-On Project</h4>
                      <p className="text-sm text-muted-foreground">{week.projects}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="text-center pt-8">
            <p className="text-lg text-foreground/80 mb-6">
              Download the full curriculum today to explore detailed lesson plans, project outlines, and assessment
              tools that will help you bring AI and Robotics education to your school with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
