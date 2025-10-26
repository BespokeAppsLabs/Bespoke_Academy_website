import { ScrollAnimation } from "@/components/scroll-animation"

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              About <span className="text-primary">Bespoke Academy</span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-foreground/80">
              <p>
                Founded to bring cutting-edge technology education to high schools, Bespoke Academy is committed to
                delivering inclusive, engaging, and practical learning experiences. Our mission is to inspire students
                and educators alike, fostering a passion for AI, Robotics, and software development that prepares
                learners for the challenges of tomorrow.
              </p>

              <p>
                We bridge the gap between traditional education and emerging technologies, emphasizing inclusivity and
                real-world application. Our dedication to providing cutting-edge curricula ensures that students are not
                just learning theory, but gaining the practical skills needed for future careers in technology.
              </p>
            </div>

            {/* Mission Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">01</div>
                <h3 className="text-xl font-semibold">Innovate</h3>
                <p className="text-sm text-muted-foreground">
                  Pushing boundaries with cutting-edge curriculum and hands-on projects
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-secondary">02</div>
                <h3 className="text-xl font-semibold">Educate</h3>
                <p className="text-sm text-muted-foreground">
                  Empowering students and teachers with comprehensive learning resources
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-accent">03</div>
                <h3 className="text-xl font-semibold">Empower</h3>
                <p className="text-sm text-muted-foreground">
                  Building confidence and skills for the technology leaders of tomorrow
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
