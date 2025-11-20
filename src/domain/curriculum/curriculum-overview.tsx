"use client"

import { useState } from "react"
import Link from "next/link"
import { BespokeButton, BespokeCard, BespokeBadge, BespokeAnimation } from "@/components/ui/bespoke"
import { Clock, Users, Target, Award, BookOpen, ChevronRight, Star, CheckCircle2, Zap, Cpu, Globe } from "lucide-react"

interface EnhancedCurriculumOverviewProps {
  className?: string
}

export function EnhancedCurriculumOverview({ className }: EnhancedCurriculumOverviewProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  // Updated to reflect 40-week curriculum for Grades 8-11
  const curriculumFramework = {
    modules: [
      {
        id: 'module-1',
        title: 'Phase 1: Digital Foundations',
        overview: 'Transform computer anxiety into confidence through our zero-to-hero journey. Perfect for Grades 8-11 students with no prior computer knowledge.',
        duration: '8 weeks',
        learningObjectives: [
          { title: 'Build computer confidence' },
          { title: 'Master visual programming logic' },
          { title: 'Create your first programs' },
        ],
        outcomes: {
          technicalSkills: ['Computer Literacy', 'Python Basics', 'Problem Solving', 'Digital Safety'],
          learningOutcomes: ['Confidence with technology', 'Basic programming logic', 'Independent learning skills'],
          lifeSkills: ['Critical thinking', 'Collaboration', 'Growth mindset']
        },
        prerequisites: ['No prior computer knowledge needed'],
        equipment: {
          value: 'Raspberry Pi Kit included',
          provided: ['Raspberry Pi 4', 'Keyboard & Mouse', 'Circuit components', 'Project materials']
        },
        certification: {
          requirements: ['Complete all 8 weekly projects', 'Demonstrate basic programming skills', 'Show confidence with computers']
        },
        resources: {
          weeklyProjects: ['8 hands-on projects', 'Step-by-step guides', 'Video tutorials'],
          support: ['Live Friday sessions', 'AI-powered learning assistant', 'Instructor office hours']
        }
      },
      {
        id: 'module-2',
        title: 'Phase 2: Electronics & Robotics',
        overview: 'Master the physical world of electronics and robotics. Build circuits, control motors, and create your first robotic projects.',
        duration: '8 weeks',
        learningObjectives: [
          { title: 'Understand electricity & circuits' },
          { title: 'Work with sensors & motors' },
          { title: 'Build your first robot' },
        ],
        outcomes: {
          technicalSkills: ['Circuit Design', 'Sensor Integration', 'Motor Control', 'Robot Assembly'],
          learningOutcomes: ['Understanding of electronics', 'Hands-on building skills', 'Safety with circuits'],
          lifeSkills: ['Patience', 'Attention to detail', 'Problem-solving']
        },
        prerequisites: ['Phase 1 completion', 'Basic Python knowledge'],
        equipment: {
          value: 'Advanced robotics kit included',
          provided: ['Robot chassis', 'Motors & wheels', 'Sensor kit', 'Building tools']
        },
        certification: {
          requirements: ['Build working robot', 'Demonstrate circuit knowledge', 'Complete safety training']
        },
        resources: {
          weeklyProjects: ['8 hands-on robotics projects', 'Circuit simulations', 'Building challenges'],
          support: ['Hardware lab sessions', 'Technical mentorship', 'Project troubleshooting']
        }
      },
      {
        id: 'module-3',
        title: 'Phase 3: AI Concepts & Tools',
        overview: 'Understand and use AI as a creative assistant. Learn computer vision, voice recognition, and how to train your own AI models.',
        duration: '12 weeks',
        learningObjectives: [
          { title: 'Master AI assistants' },
          { title: 'Build computer vision systems' },
          { title: 'Create voice-controlled devices' },
        ],
        outcomes: {
          technicalSkills: ['AI Prompting', 'Computer Vision', 'Voice AI', 'Model Training'],
          learningOutcomes: ['Effective AI collaboration', 'Understanding AI capabilities', 'Ethical AI use'],
          lifeSkills: ['Communication with AI', 'Critical thinking about AI', 'Digital citizenship']
        },
        prerequisites: ['Phase 2 completion', 'Robotics experience'],
        equipment: {
          value: 'AI development kit included',
          provided: ['Camera module', 'Microphone', 'AI software tools', 'Cloud compute credits']
        },
        certification: {
          requirements: ['Build AI project', 'Demonstrate ethical AI use', 'Complete AI safety training']
        },
        resources: {
          weeklyProjects: ['12 AI-powered projects', 'Model training exercises', 'Real-world AI applications'],
          support: ['AI tool workshops', 'Ethics discussions', 'Industry expert sessions']
        }
      },
      {
        id: 'module-4',
        title: 'Phase 4: Advanced AI-Robotics Projects',
        overview: 'Combine all your skills to create unique AI-assisted robotic prototypes. Design, build, and program your own innovations.',
        duration: '12 weeks',
        learningObjectives: [
          { title: 'Design original projects' },
          { title: 'Integrate AI with robotics' },
          { title: 'Build your portfolio' },
        ],
        outcomes: {
          technicalSkills: ['Project Design', 'AI Integration', 'Advanced Programming', 'Portfolio Development'],
          learningOutcomes: ['Independent project creation', 'Industry readiness', 'Innovation mindset'],
          lifeSkills: ['Project management', 'Leadership', 'Public speaking']
        },
        prerequisites: ['Phase 3 completion', 'AI and robotics experience'],
        equipment: {
          value: 'Advanced prototyping kit included',
          provided: ['Specialized components', 'Advanced sensors', 'Portfolio hosting', 'Competition entry']
        },
        certification: {
          requirements: ['Complete capstone project', 'Present at showcase', 'Portfolio review']
        },
        resources: {
          weeklyProjects: ['Capstone project development', 'Portfolio creation', 'Showcase preparation'],
          support: ['Industry mentorship', 'Portfolio reviews', 'Career guidance']
        }
      }
    ],
    structure: {
      phases: [
        {
          title: 'Digital Foundations',
          weeks: 'Weeks 1-8',
          description: 'Build computer confidence from zero to hero'
        },
        {
          title: 'Electronics & Robotics',
          weeks: 'Weeks 9-16',
          description: 'Master circuits, sensors, and first robot'
        },
        {
          title: 'AI Concepts & Tools',
          weeks: 'Weeks 17-28',
          description: 'Learn AI as your creative assistant'
        },
        {
          title: 'Advanced Projects',
          weeks: 'Weeks 29-40',
          description: 'Create your AI-robotics portfolio'
        }
      ]
    }
  }

  const formatDuration = (duration: string) => {
    const match = duration.match(/(\d+)/)
    return match ? `${match[1]} Week${parseInt(match[1]) > 1 ? 's' : ''}` : duration
  }

  const getModuleIcon = (moduleId: string) => {
    const icons = {
      'module-1': <Zap className="h-6 w-6" />,
      'module-2': <Cpu className="h-6 w-6" />,
      'module-3': <Globe className="h-6 w-6" />,
      'module-4': <Award className="h-6 w-6" />
    }
    return icons[moduleId as keyof typeof icons] || <BookOpen className="h-6 w-6" />
  }

  
  return (
    <div className={`space-y-12 ${className}`}>
      {/* Header - Updated for Grades 8-11 and 40-week curriculum */}
      <div className="text-center space-y-4">
        <BespokeAnimation preset="slide-in-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BespokeBadge variant="level-badge" className="text-sm font-medium">
              Grades 8-11 • Ages 13-17
            </BespokeBadge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-emerald-600">
            AI & Robotics Curriculum
          </h2>
        </BespokeAnimation>
        <BespokeAnimation preset="slide-in-up" delay={0.2}>
          <p className="mx-auto max-w-3xl text-xl md:text-2xl text-muted-foreground leading-relaxed">
            A comprehensive 40-week journey designed specifically for teens with no prior experience.
            Meet once a week on Fridays to progress from beginner to AI robotics creator.
          </p>
        </BespokeAnimation>

        {/* Program Stats - Updated for accuracy */}
        <BespokeAnimation preset="slide-in-up" delay={0.4}>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">40 Weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">Grades 8-11</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">Friday Sessions</span>
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
        {curriculumFramework.modules.map((module, index: number) => (
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
                    Phase {index + 1}
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
                    <span className="text-sm font-medium">{formatDuration(module.duration)}</span>
                  </div>

                  {/* Key Learning Objectives */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Skills You'll Gain</h4>
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
                <div className="flex gap-2 pt-2">
                  <Link href={`/curriculum/phase-${index + 1}`} className="flex-1">
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
                  {curriculumFramework.modules.find(m => m.id === selectedModule)?.title}
                </h3>
              </div>
            {(() => {
              const module = curriculumFramework.modules.find(m => m.id === selectedModule)
              if (!module) return null

              return (
                <>
                  {/* Detailed Overview */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Phase Overview</h4>
                    <p className="text-muted-foreground leading-relaxed">{module.overview}</p>
                  </div>

                  {/* Prerequisites */}
                  {module.prerequisites && module.prerequisites.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {module.prerequisites.map((prereq, idx) => (
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
                      {module.outcomes.learningOutcomes?.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{outcome}</span>
                        </div>
                      ))}
                      {module.outcomes.technicalSkills?.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Equipment Information */}
                  {module.equipment && (
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Equipment & Materials</h4>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Value: {module.equipment.value}</p>
                        <ul className="space-y-1">
                          {module.equipment.provided.map((item, idx) => (
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
            40-Week Learning Journey
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-emerald-500 to-primary-emerald-600"></div>

            {curriculumFramework.structure.phases.map((phase, index) => (
              <div key={index} className="relative flex items-start gap-6 pb-8 last:pb-0">
                {/* Timeline Dot */}
                <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg bg-gradient-to-br from-primary-emerald-500 to-primary-emerald-600">
                  {index + 1}
                </div>

                {/* Phase Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-foreground mb-1">{phase.title}</h4>
                  <p className="text-sm text-primary-emerald-600 font-medium mb-2">{phase.weeks}</p>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
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
            Join our 40-week AI & Robotics program designed specifically for Grades 8-11.
            Transform from curious beginner to confident creator, ready for the future of technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BespokeButton variant="bespoke-primary" size="lg" className="font-medium">
              Enroll Your Teen
              <ChevronRight className="ml-2 h-4 w-4" />
            </BespokeButton>
            <BespokeButton variant="bespoke-outline" size="lg" className="font-medium">
              Parent Information
              <Users className="ml-2 h-4 w-4" />
            </BespokeButton>
          </div>
        </div>
      </BespokeAnimation>
    </div>
  )
}