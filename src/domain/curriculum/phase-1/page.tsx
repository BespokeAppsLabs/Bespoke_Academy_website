import { ModernHeader } from "@/components/modern-header"
import { ModernFooter } from "@/components/modern-footer"
import { BespokeCard, BespokeAnimation, BespokeBadge, BespokeButton } from "@/components/ui/bespoke"
import { BookOpen, Zap, Target, Clock, Users, CheckCircle2, Star, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Phase1Page() {
  return (
    <div className="min-h-screen">
      <ModernHeader />
      <main className="pt-20 md:pt-32 pb-4">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/curriculum">
              <BespokeButton variant="bespoke-outline" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Curriculum
              </BespokeButton>
            </Link>
          </div>

          {/* Header */}
          <BespokeAnimation preset="slide-in-up">
            <div className="text-center mb-12">
              <BespokeBadge variant="level-badge" className="mb-4">
                Phase 1 • Weeks 1-8
              </BespokeBadge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-emerald-600 mb-6">
                Digital Foundations
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Transform computer anxiety into confidence through our zero-to-hero journey.
                Perfect for Grades 8-11 students with no prior computer knowledge.
              </p>
            </div>
          </BespokeAnimation>

          {/* Quick Stats */}
          <BespokeAnimation preset="slide-in-up" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <BespokeCard variant="stats-card" className="text-center p-4">
                <Clock className="h-8 w-8 text-primary-emerald-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">8 Weeks</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </BespokeCard>
              <BespokeCard variant="stats-card" className="text-center p-4">
                <Target className="h-8 w-8 text-primary-emerald-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">8 Projects</div>
                <div className="text-sm text-muted-foreground">Hands-on</div>
              </BespokeCard>
              <BespokeCard variant="stats-card" className="text-center p-4">
                <Users className="h-8 w-8 text-primary-emerald-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">Grades 8-11</div>
                <div className="text-sm text-muted-foreground">Age Group</div>
              </BespokeCard>
              <BespokeCard variant="stats-card" className="text-center p-4">
                <Zap className="h-8 w-8 text-primary-emerald-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">No Experience</div>
                <div className="text-sm text-muted-foreground">Required</div>
              </BespokeCard>
            </div>
          </BespokeAnimation>

          {/* Phase Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <BespokeAnimation preset="slide-in-up" delay={0.3}>
                <BespokeCard variant="premium-card" className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-6">What Students Will Learn</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary-emerald-600" />
                        Computer Confidence
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Students move from computer anxiety to confidence through hands-on exploration.
                        We start with the absolute basics: understanding what computers actually do,
                        managing files, and using keyboard shortcuts like a pro.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">File management & organization</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">Internet safety & searching</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">Keyboard shortcuts & efficiency</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">Basic troubleshooting</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary-emerald-600" />
                        Visual Programming Logic
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Before diving into code, students learn computational thinking through visual programming.
                        Using Scratch and block-based tools, they understand logic without getting stuck on syntax.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">Computational thinking</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">Problem-solving strategies</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">Logic & sequencing</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">Creative expression</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary-emerald-600" />
                        First Steps in Coding
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Students write their first real programs in Python, focusing on understanding concepts
                        rather than memorizing syntax. Every lesson results in a working program they can be proud of.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">Python basics & variables</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">Input & output</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">Simple math operations</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">Debugging basics</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </BespokeCard>
              </BespokeAnimation>
            </div>

            <div className="space-y-6">
              <BespokeAnimation preset="slide-in-up" delay={0.4}>
                <BespokeCard variant="premium-card" className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Weekly Projects</h3>
                  <div className="space-y-3">
                    {[
                      "Digital portfolio organization",
                      "Interactive story game",
                      "Personal calculator program",
                      "LED button circuit",
                      "Temperature sensor alert",
                      "Simple fan controller",
                      "Remote control vehicle",
                      "Final showcase project"
                    ].map((project, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{project}</span>
                      </div>
                    ))}
                  </div>
                </BespokeCard>
              </BespokeAnimation>

              <BespokeAnimation preset="slide-in-up" delay={0.5}>
                <BespokeCard variant="premium-card" className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Parent Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Friday Sessions</h4>
                      <p className="text-sm text-muted-foreground">
                        2-hour weekly meetings with hands-on activities and collaborative learning
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">No Homework Required</h4>
                      <p className="text-sm text-muted-foreground">
                        All learning happens during our Friday sessions, perfect for busy teens
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Safe Environment</h4>
                      <p className="text-sm text-muted-foreground">
                        Mistakes are celebrated as learning opportunities in our supportive community
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Progress Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Weekly email summaries with photos of student projects and achievements
                      </p>
                    </div>
                  </div>
                </BespokeCard>
              </BespokeAnimation>
            </div>
          </div>

          {/* Call to Action */}
          <BespokeAnimation preset="slide-in-up" delay={0.6}>
            <BespokeCard variant="premium-card" className="p-8 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Start the Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Give your teen the confidence and skills to thrive in our digital future.
                No experience required - just curiosity and enthusiasm!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <BespokeButton variant="bespoke-primary" size="lg">
                  Enroll in Phase 1
                  <ArrowRight className="ml-2 h-4 w-4" />
                </BespokeButton>
                <Link href="/curriculum/phase-2">
                  <BespokeButton variant="bespoke-outline" size="lg">
                    View Phase 2
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </BespokeButton>
                </Link>
              </div>
            </BespokeCard>
          </BespokeAnimation>
        </div>
      </main>
      <ModernFooter />
    </div>
  )
}

export const metadata = {
  title: "Phase 1: Digital Foundations | Bespoke Academy",
  description: "Build computer confidence and basic programming skills in this comprehensive 8-week phase for Grades 8-11. Perfect for teens with no prior computer knowledge.",
}