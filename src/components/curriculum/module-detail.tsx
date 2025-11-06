"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Users,
  Target,
  Award,
  BookOpen,
  Rocket,
  ChevronRight,
  Star,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Lightbulb,
  FileText,
  PlayCircle,
  HeadphonesIcon,
  MessageSquare
} from "lucide-react"
import { ModuleContent } from "@/types/curriculum"

interface ModuleDetailProps {
  module: ModuleContent
  className?: string
}

export function ModuleDetail({ module, className }: ModuleDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

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
    <div className={`space-y-8 ${className}`}>
      {/* Module Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8 border border-primary/20">
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-lg border ${getModuleColor(module.id)} flex-shrink-0`}>
            {getModuleIcon(module.id)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="outline" className="font-medium">
                Module {getModuleNumber(module.id)}
              </Badge>
              <Badge variant="secondary">
                {formatDuration(module.duration)}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{module.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
              {module.overview}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{formatDuration(module.duration)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{module.weeks.length} Weeks of Content</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Certificate Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
          <TabsTrigger value="certification">Certification</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {module.learningObjectives.map((objective, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{objective.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            {module.prerequisites && module.prerequisites.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Prerequisites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {module.prerequisites.map((prereq, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-blue-600 font-medium">{idx + 1}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Module Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                What You'll Learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {module.overview}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {module.outcomes.learningOutcomes?.slice(0, 4).map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{outcome}</span>
                  </div>
                ))}
                {module.outcomes.technicalSkills?.slice(0, 4).map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{outcome}</span>
                  </div>
                ))}
                {module.outcomes.lifeSkills?.slice(0, 4).map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {module.weeks.map((week) => (
              <AccordionItem
                key={week.week}
                value={`week-${week.week}`}
                className="border border-border rounded-lg bg-card overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4 text-left w-full">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{week.week}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">Week {week.week}</div>
                      <div className="text-base font-semibold text-foreground">
                        {week.title}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="space-y-6 pl-14">
                    {/* Week Overview */}
                    {week.overview && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Overview</h4>
                        <p className="text-sm text-muted-foreground">{week.overview}</p>
                      </div>
                    )}

                    {/* Learning Objectives */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Learning Objectives</h4>
                      <ul className="space-y-2">
                        {week.learningObjectives.map((objective, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{objective.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Daily Breakdown */}
                    {week.days && week.days.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Daily Breakdown</h4>
                        <Accordion type="single" collapsible className="space-y-2">
                          {week.days.map((day) => (
                            <AccordionItem
                              key={day.day}
                              value={`day-${day.day}`}
                              className="border border-border rounded-lg bg-muted/30"
                            >
                              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                <div className="flex items-center gap-3 text-left w-full">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background flex items-center justify-center">
                                    <span className="text-xs font-medium text-primary">{day.day}</span>
                                  </div>
                                  <span className="text-sm font-medium text-foreground">{day.title}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4 pt-2">
                                <div className="space-y-4 pl-11">
                                  {/* Learning Objectives */}
                                  {day.learningObjectives && day.learningObjectives.length > 0 && (
                                    <div>
                                      <h5 className="text-xs font-semibold text-foreground mb-2">Objectives</h5>
                                      <ul className="space-y-1">
                                        {day.learningObjectives.map((objective, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                                            <span>{objective.title}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Interactive Session */}
                                  {day.content.interactiveSession && (
                                    <div>
                                      <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                                        <PlayCircle className="h-3 w-3" />
                                        Interactive Session ({day.content.interactiveSession.duration})
                                      </h5>
                                      <div className="space-y-2">
                                        {day.content.interactiveSession.activities.map((activity, idx) => (
                                          <div key={idx} className="pl-2">
                                            <div className="flex items-start gap-2">
                                              <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                                              <div>
                                                <div className="text-xs font-medium text-foreground">
                                                  {activity.title} ({activity.duration})
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                  {activity.description}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Hands-on Activities */}
                                  {day.content.handsOnActivities && day.content.handsOnActivities.length > 0 && (
                                    <div>
                                      <h5 className="text-xs font-semibold text-foreground mb-2">Hands-On Activities</h5>
                                      <ul className="space-y-1">
                                        {day.content.handsOnActivities.map((activity, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                            <span>{activity}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* AI Tool Practice */}
                                  {day.content.aiToolPractice && day.content.aiToolPractice.length > 0 && (
                                    <div>
                                      <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                                        <MessageSquare className="h-3 w-3" />
                                        AI Tool Practice
                                      </h5>
                                      <ul className="space-y-1">
                                        {day.content.aiToolPractice.map((practice, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                                            <span>{practice}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Portfolio Component */}
                                  {day.content.portfolioComponent && (
                                    <div className="bg-muted/50 rounded p-2 border-l-2 border-primary">
                                      <h5 className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                                        <FileText className="h-3 w-3" />
                                        Portfolio Component
                                      </h5>
                                      <p className="text-xs text-muted-foreground">{day.content.portfolioComponent}</p>
                                    </div>
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    )}

                    {/* Integration Activities */}
                    {week.integrationActivities && week.integrationActivities.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Integration Activities</h4>
                        <div className="space-y-2">
                          {week.integrationActivities.map((activity, idx) => (
                            <div key={idx} className="bg-muted/50 rounded p-3">
                              <h5 className="text-sm font-medium text-foreground mb-1">{activity.title}</h5>
                              <p className="text-xs text-muted-foreground">{activity.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        {/* Outcomes Tab */}
        <TabsContent value="outcomes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(module.outcomes).map(([category, outcomes]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {Array.isArray(outcomes) && outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Certification Tab */}
        <TabsContent value="certification" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certification Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {module.certification?.requirements && (
                  <ul className="space-y-3">
                    {module.certification.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {module.equipment && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Equipment Provided</h4>
                    <p className="text-sm text-muted-foreground mb-2">Value: {module.equipment.value}</p>
                    <ul className="space-y-2">
                      {module.equipment.provided.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Career Opportunities */}
            {module.certification?.careerAdvancementOpportunities && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    Career Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {module.certification.careerAdvancementOpportunities.map((opportunity, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {opportunity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Portfolio Components */}
            {module.certification?.portfolioComponents && (
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Portfolio Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {module.certification.portfolioComponents.map((component, idx) => (
                      <div key={idx} className="border border-border rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">{component.title}</h4>
                        <p className="text-xs text-muted-foreground">{component.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          {module.resources && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(module.resources).map(([category, resources]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HeadphonesIcon className="h-5 w-5 text-primary" />
                      {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {Array.isArray(resources) && resources.map((resource, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8 border border-primary/20 text-center">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Ready to Start Your Child's Journey with {module.title}?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join this comprehensive phase where your child will develop essential skills,
          build their technology toolkit, and gain confidence for future success.
        </p>
        <Button size="lg" className="font-medium">
          Learn More About This Phase
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}