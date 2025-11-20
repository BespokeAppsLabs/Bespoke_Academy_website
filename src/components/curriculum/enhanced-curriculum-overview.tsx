"use client"

import { useState } from "react"
import Link from "next/link"
import { BespokeButton, BespokeCard, BespokeBadge, BespokeAnimation } from "@/components/ui/bespoke"
import { Clock, Users, Target, Award, BookOpen, Rocket, ChevronRight, Star, CheckCircle2 } from "lucide-react"
import { curriculumFramework } from "@/data/curriculum"
import { ModuleContent } from "@/types/curriculum"

interface EnhancedCurriculumOverviewProps {
  className?: string
}

export function EnhancedCurriculumOverview({ className }: EnhancedCurriculumOverviewProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const formatDuration = (duration: string) => {
    const match = duration.match(/(\d+)/)
    return match ? `${match[1]} Week${parseInt(match[1]) > 1 ? 's' : ''}` : duration
  }

  const getModuleIcon = (moduleId: string) => {
    const icons = {
      'module-1': <BookOpen className="h-6 w-6" />,
      'module-2': <Rocket className="h-6 w-6" />,
      'module-3': <Target className="h-6 w-6" />,
      'module-4': <Award className="h-6 w-6" />
    }
    return icons[moduleId as keyof typeof icons] || <BookOpen className="h-6 w-6" />
  }

  const getModuleColor = (moduleId: string) => {
    const colors = {
      'module-1': 'bg-blue-500/10 text-blue-600 border-blue-200',
      'module-2': 'bg-green-500/10 text-green-600 border-green-200',
      'module-3': 'bg-purple-500/10 text-purple-600 border-purple-200',
      'module-4': 'bg-orange-500/10 text-orange-600 border-orange-200'
    }
    return colors[moduleId as keyof typeof colors] || 'bg-gray-500/10 text-gray-600 border-gray-200'
  }

  const getModuleNumber = (moduleId: string) => {
    const match = moduleId.match(/module-(\d+)/)
    return match ? parseInt(match[1]) : 1
  }

  return (
    <div className={`space-y-12 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <BespokeAnimation preset="slide-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-emerald-600">
            AI Career Advancement Program
          </h2>
        </BespokeAnimation>
        <BespokeAnimation preset="slide-in-up" delay={0.2}>
          <p className="mx-auto max-w-3xl text-xl md:text-2xl text-muted-foreground leading-relaxed">
            A comprehensive 20-week journey designed to transform professionals into AI-enhanced leaders
            through hands-on learning, practical application, and career development.
          </p>
        </BespokeAnimation>

        {/* Program Stats */}
        <BespokeAnimation preset="slide-in-up" delay={0.4}>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">20 Weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">4 Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">Career-Focused</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary-emerald-600" />
              <span className="text-sm font-medium">Certificate</span>
            </div>
          </div>
        </BespokeAnimation>
      </div>

      {/* Module Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {curriculumFramework.modules.map((module: ModuleContent, index: number) => (
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
                    Module {index + 1}
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
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Skills You'll Gain</h4>
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
                  <Link href={`/curriculum/module-${getModuleNumber(module.id)}`} className="flex-1">
                    <BespokeButton
                      variant="bespoke-outline"
                      size="sm"
                      className="w-full"
                    >
                      <span className="text-sm">View Full Details</span>
                      <ChevronRight className="h-4 w-4" />
                    </BespokeButton>
                  </Link>
                  <BespokeButton
                    variant="bespoke-outline"
                    size="sm"
                    className="px-3"
                    onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                  >
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      selectedModule === module.id ? 'rotate-90' : ''
                    }`} />
                  </BespokeButton>
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
                    <h4 className="text-lg font-semibold text-foreground mb-3">Program Overview</h4>
                    <p className="text-muted-foreground leading-relaxed">{module.overview}</p>
                  </div>

                  {/* Prerequisites */}
                  {module.prerequisites && module.prerequisites.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Prerequisites</h4>
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
                    <h4 className="text-lg font-semibold text-foreground mb-3">Learning Outcomes</h4>
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
                      {module.outcomes.lifeSkills?.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Equipment Information */}
                  {module.equipment && (
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Equipment Provided</h4>
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

                  {/* Certification Requirements */}
                  {module.certification?.requirements && (
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Certification Requirements</h4>
                      <ul className="space-y-2">
                        {module.certification.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Resources */}
                  {module.resources && (
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Included Resources</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(module.resources).map(([category, items]) => (
                          <div key={category}>
                            <h5 className="text-sm font-medium text-foreground mb-2 capitalize">
                              {category.replace(/([A-Z])/g, ' $1').trim()}
                            </h5>
                            <ul className="space-y-1">
                              {Array.isArray(items) && items.map((item, idx) => (
                                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                                  <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
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
          <h3 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 text-center text-primary-emerald-600">
            Program Journey
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-emerald-500 to-primary-emerald-600"></div>

            {curriculumFramework.structure.phases.map((phase, index) => (
              <div key={index} className="relative flex items-start gap-6 pb-8 last:pb-0">
                {/* Timeline Dot */}
                <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg bg-gradient-to-br from-primary-emerald-500 to-primary-emerald-600">
                  M{index + 1}
                </div>

                {/* Phase Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-foreground mb-1">{phase.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{phase.weeks}</p>
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
            Transform your career with our comprehensive 20-week AI program.
            From complete beginner to AI expert with industry-recognized certification.
          </p>
          <BespokeButton variant="bespoke-primary" size="lg" className="font-medium">
            Start Your AI Journey
            <ChevronRight className="ml-2 h-4 w-4" />
          </BespokeButton>
        </div>
      </BespokeAnimation>
    </div>
  )
}