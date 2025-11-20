"use client";

import { BespokeCard, BespokeAnimation, BespokeBadge } from "@/components/ui/bespoke";

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO & Founder",
    bio: "Former Google engineer with 15+ years in tech education and AI research. Stanford PhD in Computer Science.",
    expertise: ["AI/ML", "EdTech", "Leadership"],
    avatar: "👩‍💼"
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Curriculum",
    bio: "Ex-Netflix senior developer who has taught over 10,000 students worldwide. Passionate about practical, project-based learning.",
    expertise: ["Full-Stack", "React", "Systems Design"],
    avatar: "👨‍🏫"
  },
  {
    name: "Aisha Patel",
    role: "VP of Student Success",
    bio: "Dedicated to ensuring every student achieves their career goals. Former career coach with background in talent development.",
    expertise: ["Career Coaching", "Student Support", "Mentorship"],
    avatar: "👩‍💼"
  },
  {
    name: "David Kim",
    role: "CTO & Lead Architect",
    bio: "Building the future of adaptive learning systems. Previous work at Microsoft and multiple successful startups.",
    expertise: ["Cloud Architecture", "AI Systems", "Scalability"],
    avatar: "👨‍💻"
  }
];

export default function Team() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <BespokeAnimation preset="slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-emerald-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Education experts, tech industry veterans, and passionate mentors dedicated to your success
            </p>
          </BespokeAnimation>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <BespokeAnimation
              key={member.name}
              preset="slide-in-up"
              delay={index * 0.1}
            >
              <BespokeCard variant="premium-card" className="h-full group hover:shadow-xl transition-all duration-300">
                <div className="p-6 text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill) => (
                      <BespokeBadge
                        key={skill}
                        variant="skill-tag"
                        size="sm"
                      >
                        {skill}
                      </BespokeBadge>
                    ))}
                  </div>
                </div>
              </BespokeCard>
            </BespokeAnimation>
          ))}
        </div>

        <BespokeAnimation preset="slide-in-up" delay={0.4} className="text-center mt-16">
          <BespokeCard variant="glass-card" className="max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Join Our Team
            </h3>
            <p className="text-gray-600 mb-6">
              We're always looking for passionate educators and innovators who want to transform the future of learning.
            </p>
            <div className="text-4xl mb-4">🌟</div>
            <p className="text-sm text-gray-500">
              careers@bespoke-academy.com
            </p>
          </BespokeCard>
        </BespokeAnimation>
      </div>
    </section>
  );
}