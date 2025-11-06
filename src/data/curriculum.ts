import { CurriculumFramework, ModuleContent } from '@/types/curriculum'

/**
 * 40-Week AI Robotics Curriculum for Grades 8-11
 * This represents the complete 4-phase educational program for teenagers
 */

// Phase 1: Digital Foundations (Weeks 1-8)
export const phase1Data: ModuleContent = {
  id: 'module-1',
  title: 'Phase 1: Digital Foundations',
  subtitle: 'Building Computer Confidence & Basic Programming',
  overview: 'This foundational phase transforms students from technology users to creators. Through hands-on projects and age-appropriate challenges, students develop essential computer literacy, programming fundamentals, and problem-solving skills that form the bedrock of their technological journey.',
  duration: '8 Weeks',
  prerequisites: [],
  learningObjectives: [
    { title: 'Develop confident computer use and digital citizenship' },
    { title: 'Master visual programming with Scratch' },
    { title: 'Understand basic Python programming concepts' },
    { title: 'Build problem-solving and computational thinking skills' },
    { title: 'Practice internet safety and responsible technology use' },
  ],
  weeks: [
    {
      week: 1,
      title: 'Computer Confidence & Digital Citizenship',
      overview: 'Building foundational computer skills and understanding digital responsibility',
      learningObjectives: [
        { title: 'Navigate computers and software with confidence' },
        { title: 'Understand internet safety and digital citizenship' },
        { title: 'Practice proper file management and organization' },
      ],
      days: [
        {
          day: 1,
          title: 'Computer Basics & Digital Citizenship',
          learningObjectives: [
            { title: 'Navigate computers and software with confidence' },
            { title: 'Understand internet safety and digital citizenship' },
          ],
          content: {
            handsOnActivities: [
              'Create personal digital organization system',
              'Complete internet safety certification',
              'Build first digital portfolio folder'
            ]
          }
        }
      ]
    },
    {
      week: 2,
      title: 'Introduction to Visual Programming',
      overview: 'Learning programming concepts through visual blocks with Scratch',
      learningObjectives: [
        { title: 'Understand basic programming concepts (loops, conditionals, variables)' },
        { title: 'Create interactive animations with Scratch' },
        { title: 'Develop computational thinking skills' },
      ],
      days: [
        {
          day: 1,
          title: 'Visual Programming Fundamentals',
          learningObjectives: [
            { title: 'Understand basic programming concepts (loops, conditionals, variables)' },
            { title: 'Create interactive animations with Scratch' },
          ],
          content: {
            handsOnActivities: [
              'Create animated greeting card',
              'Build simple interactive game',
              'Design digital story project'
            ]
          }
        }
      ]
    }
  ],
  outcomes: {
    technicalSkills: [
      'Confident computer and software navigation',
      'Visual programming with Scratch',
      'Basic problem-solving methodologies',
      'Digital citizenship and online safety'
    ],
    lifeSkills: [
      'Perseverance through debugging challenges',
      'Creative expression through technology',
      'Attention to detail and systematic thinking',
      'Confidence in tackling new technology'
    ],
    portfolioProjects: [
      'Interactive Scratch games and animations',
      'Digital storytelling projects',
      'Basic website prototypes',
      'Internet safety certification projects'
    ],
    learningOutcomes: [
      'Master fundamental programming concepts',
      'Develop computational thinking skills',
      'Create interactive digital projects',
      'Build foundation for advanced technical learning'
    ]
  },
  equipment: {
    provided: [
      'Raspberry Pi 4 complete starter kit',
      'Professional software development tools',
      'Learning resources and online platforms',
      'Safety equipment and organization tools'
    ],
    value: 'R1200'
  },
  certification: {
    requirements: [
      'Complete all weekly projects and assignments',
      'Pass practical assessments with 80% or higher',
      'Submit a final portfolio project',
      'Demonstrate mastery of core concepts'
    ],
    careerAdvancementOpportunities: [
      'Software Developer',
      'Web Designer',
      'IT Support Specialist',
      'Digital Content Creator'
    ],
    industryRecognition: [
      'Industry-recognized certification',
      'Portfolio of completed projects',
      'Skills validation for tech careers'
    ]
  },
  resources: {
    requiredTools: [
      'Scratch programming environment',
      'Python development environment',
      'Code editors and IDEs',
      'Version control with Git'
    ],
    learningResources: [
      'Comprehensive video tutorials',
      'Interactive coding exercises',
      'Project-based learning guides',
      'Live instructor sessions'
    ],
    supportSystems: [
      'Weekly office hours',
      'Peer collaboration groups',
      'Technical support team',
      'Progress tracking dashboard'
    ]
  }
}

// Phase 2: Electronics & Robotics Basics (Weeks 9-16)
export const phase2Data: ModuleContent = {
  id: 'module-2',
  title: 'Phase 2: Electronics & Robotics Basics',
  subtitle: 'Building First Robots & Understanding Electronics',
  overview: 'This exciting phase introduces students to the physical world of electronics and robotics. Through hands-on building and experimentation, students learn to bring their digital creations to life with motors, sensors, and physical computing.',
  duration: '8 Weeks',
  prerequisites: [
    'Completion of Phase 1: Digital Foundations'
  ],
  learningObjectives: [
    { title: 'Master basic electronics and circuit design' },
    { title: 'Program Raspberry Pi for hardware control' },
    { title: 'Integrate sensors and motor control systems' },
    { title: 'Build mechanical assemblies and robot chassis' },
    { title: 'Implement remote control and automation basics' },
  ],
  weeks: [
    {
      week: 9,
      title: 'Introduction to Electronics & Circuits',
      overview: 'Understanding basic electronics concepts and building first circuits',
      learningObjectives: [
        { title: 'Understand voltage, current, and resistance' },
        { title: 'Build simple LED circuits and switches' },
        { title: 'Learn to use breadboards and basic components' },
      ],
      days: [
        {
          day: 1,
          title: 'Basic Electronics & Circuit Building',
          learningObjectives: [
            { title: 'Understand voltage, current, and resistance' },
            { title: 'Build simple LED circuits and switches' },
          ],
          content: {
            handsOnActivities: [
              'Create LED light display projects',
              'Build electronic games with buttons and lights',
              'Design simple alarm systems'
            ]
          }
        }
      ]
    },
    {
      week: 10,
      title: 'Raspberry Pi Programming & Control',
      overview: 'Learning to control electronic components with Raspberry Pi',
      learningObjectives: [
        { title: 'Set up and program Raspberry Pi GPIO pins' },
        { title: 'Control LEDs and read button inputs' },
        { title: 'Write basic Python for hardware control' },
      ],
      days: [
        {
          day: 1,
          title: 'Hardware Programming with Raspberry Pi',
          learningObjectives: [
            { title: 'Set up and program Raspberry Pi GPIO pins' },
            { title: 'Write basic Python for hardware control' },
          ],
          content: {
            handsOnActivities: [
              'Program flashing light patterns',
              'Create interactive button-controlled devices',
              'Build simple notification systems'
            ]
          }
        }
      ]
    }
  ],
  outcomes: {
    technicalSkills: [
      'Basic circuit design and troubleshooting',
      'Raspberry Pi programming and GPIO control',
      'Sensor integration and data reading',
      'Motor control and basic robotics'
    ],
    lifeSkills: [
      'Patience through debugging hardware problems',
      'Attention to detail in circuit building',
      'Problem decomposition and systematic testing',
      'Confidence in working with physical technology'
    ],
    portfolioProjects: [
      'LED light displays and electronic games',
      'Basic robot chassis with movement capabilities',
      'Sensor-based obstacle avoidance robots',
      'Remote-controlled vehicles'
    ],
    learningOutcomes: [
      'Design and build electronic circuits',
      'Program hardware with Raspberry Pi',
      'Integrate sensors and actuators',
      'Develop troubleshooting methodologies'
    ]
  },
  equipment: {
    provided: [
      'Robot chassis kit with precision wheels',
      'DC motors and servo motors',
      'Motor controllers and power systems',
      'Electronic components kit (LEDs, resistors, sensors)',
      'Digital multimeter and professional tools',
      'Breadboards and circuit building supplies'
    ],
    value: 'R1500'
  },
  certification: {
    requirements: [
      'Complete all robotics projects and circuits',
      'Pass hardware troubleshooting assessments',
      'Submit working robot demonstration',
      'Master electronics safety protocols'
    ],
    careerAdvancementOpportunities: [
      'Robotics Technician',
      'Hardware Engineer',
      'IoT Developer',
      'Automation Specialist'
    ],
    industryRecognition: [
      'Hands-on hardware certification',
      'Robotics project portfolio',
      'Circuit design and troubleshooting skills'
    ]
  },
  resources: {
    requiredTools: [
      'Raspberry Pi development environment',
      'Circuit simulation software',
      'GPIO programming libraries',
      'Electronics testing equipment'
    ],
    learningResources: [
      'Hands-on project tutorials',
      'Circuit design guides',
      'Robotics programming exercises',
      'Safety protocols documentation'
    ],
    supportSystems: [
      'Hardware technical support',
      'Project troubleshooting sessions',
      'Component replacement service',
      'Equipment maintenance guidance'
    ]
  }
}

// Phase 3: AI Concepts & Tools (Weeks 17-28)
export const phase3Data: ModuleContent = {
  id: 'module-3',
  title: 'Phase 3: AI Concepts & Tools',
  subtitle: 'Integrating Artificial Intelligence & Advanced Sensors',
  overview: 'This transformative phase introduces students to the fascinating world of artificial intelligence. Students learn to integrate cameras, microphones, and AI algorithms to create intelligent, responsive systems that can see, hear, and interact with their environment.',
  duration: '12 Weeks',
  prerequisites: [
    'Completion of Phase 1: Digital Foundations',
    'Completion of Phase 2: Electronics & Robotics Basics'
  ],
  learningObjectives: [
    { title: 'Understand AI fundamentals and ethical considerations' },
    { title: 'Implement computer vision and image recognition' },
    { title: 'Build voice recognition and natural language processing systems' },
    { title: 'Train custom AI models for specific tasks' },
    { title: 'Integrate AI capabilities with robotics projects' },
  ],
  weeks: [
    {
      week: 17,
      title: 'AI Fundamentals & Ethics',
      overview: 'Understanding what AI is, how it works, and responsible use',
      learningObjectives: [
        { title: 'Learn basic AI concepts and terminology' },
        { title: 'Understand AI ethics and responsible use' },
        { title: 'Explore different types of AI applications' },
      ],
      days: [
        {
          day: 1,
          title: 'Introduction to AI Concepts',
          learningObjectives: [
            { title: 'Learn basic AI concepts and terminology' },
            { title: 'Understand AI ethics and responsible use' },
          ],
          content: {
            handsOnActivities: [
              'Create AI ethics presentation',
              'Build AI-powered decision trees',
              'Design responsible AI usage guidelines'
            ]
          }
        }
      ]
    },
    {
      week: 18,
      title: 'Computer Vision Basics',
      overview: 'Teaching robots to see and recognize objects',
      learningObjectives: [
        { title: 'Set up Raspberry Pi camera module' },
        { title: 'Implement basic image recognition' },
        { title: 'Create object detection programs' },
      ],
      days: [
        {
          day: 1,
          title: 'Vision Systems Setup',
          learningObjectives: [
            { title: 'Set up Raspberry Pi camera module' },
            { title: 'Implement basic image recognition' },
          ],
          content: {
            handsOnActivities: [
              'Build color recognition system',
              'Create simple object detection robot',
              'Design automated photo classification'
            ]
          }
        }
      ]
    }
  ],
  outcomes: {
    technicalSkills: [
      'Computer vision and image processing',
      'Voice recognition and audio processing',
      'Machine learning model training',
      'AI-robotics integration',
      'Advanced sensor data interpretation'
    ],
    lifeSkills: [
      'Critical thinking about AI capabilities and limitations',
      'Ethical decision-making in technology use',
      'Adaptability to emerging technologies',
      'Innovation and creative problem-solving'
    ],
    portfolioProjects: [
      'Vision-based object recognition robots',
      'Voice-controlled devices and assistants',
      'AI-powered automation systems',
      'Custom machine learning models'
    ],
    learningOutcomes: [
      'Implement computer vision systems',
      'Develop voice recognition capabilities',
      'Train and deploy ML models',
      'Integrate AI with robotics systems'
    ]
  },
  equipment: {
    provided: [
      'Raspberry Pi high-quality camera module',
      'Microphone array and speaker systems',
      'Advanced sensors (ultrasonic, temperature, motion)',
      'Display systems and interaction components',
      'Specialized AI development hardware'
    ],
    value: 'R1300'
  },
  certification: {
    requirements: [
      'Complete all AI integration projects',
      'Pass machine learning model assessments',
      'Submit working AI application',
      'Demonstrate ethical AI implementation'
    ],
    careerAdvancementOpportunities: [
      'AI/ML Engineer',
      'Computer Vision Developer',
      'Voice Assistant Developer',
      'AI Integration Specialist'
    ],
    industryRecognition: [
      'AI integration certification',
      'Machine learning project portfolio',
      'Advanced sensor systems experience'
    ]
  },
  resources: {
    requiredTools: [
      'OpenCV and computer vision libraries',
      'Natural language processing frameworks',
      'Machine learning development environment',
      'AI model training platforms'
    ],
    learningResources: [
      'AI ethics and safety guidelines',
      'Computer vision tutorials',
      'Voice recognition implementation guides',
      'Machine learning model examples'
    ],
    supportSystems: [
      'AI implementation mentorship',
      'Model optimization guidance',
      'Ethical AI review process',
      'Industry expert consultations'
    ]
  }
}

// Phase 4: Integrated AI-Robotics Projects (Weeks 29-40)
export const phase4Data: ModuleContent = {
  id: 'module-4',
  title: 'Phase 4: Integrated AI-Robotics Projects',
  subtitle: 'Capstone Projects & Portfolio Development',
  overview: 'This culminating phase brings together all learned skills in comprehensive, student-driven projects. Students design, build, and showcase innovative AI-robotics systems that solve real problems while developing their complete portfolios for college applications.',
  duration: '12 Weeks',
  prerequisites: [
    'Completion of Phase 1: Digital Foundations',
    'Completion of Phase 2: Electronics & Robotics Basics',
    'Completion of Phase 3: AI Concepts & Tools'
  ],
  learningObjectives: [
    { title: 'Design and manage complex technology projects' },
    { title: 'Integrate multiple systems into cohesive solutions' },
    { title: 'Develop professional documentation and presentation skills' },
    { title: 'Create innovation portfolios for college applications' },
    { title: 'Demonstrate entrepreneurship and leadership capabilities' },
  ],
  weeks: [
    {
      week: 29,
      title: 'Capstone Project Planning & Design',
      overview: 'Brainstorming, planning, and designing final projects',
      learningObjectives: [
        { title: 'Identify real problems to solve with technology' },
        { title: 'Create detailed project plans and timelines' },
        { title: 'Design system architecture and component integration' },
      ],
      days: [
        {
          day: 1,
          title: 'Project Planning Workshop',
          learningObjectives: [
            { title: 'Identify real problems to solve with technology' },
            { title: 'Create detailed project plans and timelines' },
          ],
          content: {
            handsOnActivities: [
              'Develop comprehensive project proposal',
              'Create system design diagrams',
              'Build project timeline and milestones'
            ]
          }
        }
      ]
    },
    {
      week: 30,
      title: 'Advanced Project Development',
      overview: 'Building and testing capstone project components',
      learningObjectives: [
        { title: 'Implement integrated hardware-software systems' },
        { title: 'Debug complex multi-component projects' },
        { title: 'Iterate based on testing and feedback' },
      ],
      days: [
        {
          day: 1,
          title: 'Prototyping and Testing',
          learningObjectives: [
            { title: 'Implement integrated hardware-software systems' },
            { title: 'Debug complex multi-component projects' },
          ],
          content: {
            handsOnActivities: [
              'Build complete capstone project prototype',
              'Test and refine all system components',
              'Document development process and challenges'
            ]
          }
        }
      ]
    }
  ],
  outcomes: {
    technicalSkills: [
      'Complex system design and integration',
      'Advanced AI-robotics applications',
      'Professional documentation and presentation',
      'Project management and execution',
      'Innovation and entrepreneurship'
    ],
    lifeSkills: [
      'Leadership and project management',
      'Professional communication and presentation',
      'Perseverance through complex challenges',
      'Creative innovation and problem-solving',
      'Self-directed learning and resourcefulness'
    ],
    portfolioProjects: [
      'Custom AI-assisted robots solving real problems',
      'Automated systems with multiple sensors',
      'Interactive installations and demonstrations',
      'Complete capstone showcase project',
      'Professional innovation portfolio'
    ],
    learningOutcomes: [
      'Design complete AI-robotics systems',
      'Manage complex technical projects',
      'Create professional documentation',
      'Develop innovation portfolios'
    ]
  },
  equipment: {
    provided: [
      'Custom project-specific components',
      'Construction materials and enclosures',
      'Specialized tools for final projects',
      'Presentation and demonstration equipment',
      'Professional portfolio development tools'
    ],
    value: 'R1000+ (based on project choices)'
  },
  certification: {
    requirements: [
      'Complete capstone project from concept to deployment',
      'Present project at innovation showcase',
      'Submit comprehensive project documentation',
      'Demonstrate leadership and collaboration skills'
    ],
    careerAdvancementOpportunities: [
      'AI Robotics Engineer',
      'Project Manager',
      'Innovation Consultant',
      'Technical Entrepreneur'
    ],
    industryRecognition: [
      'Comprehensive capstone certification',
      'Innovation portfolio ready for college applications',
      'Industry-ready project management experience'
    ]
  },
  resources: {
    requiredTools: [
      'Advanced prototyping equipment',
      'Professional project management tools',
      'Industry-standard development environments',
      'Portfolio creation platforms'
    ],
    learningResources: [
      'Project management frameworks',
      'Innovation methodology guides',
      'Professional presentation training',
      'Portfolio development resources'
    ],
    supportSystems: [
      'Industry mentor connections',
      'College application guidance',
      'Innovation showcase opportunities',
      'Career placement assistance'
    ]
  }
}

// Complete curriculum framework
export const curriculumFramework: CurriculumFramework = {
  title: 'Bespoke Academy AI Robotics Curriculum for Grades 8-11',
  overview: 'A comprehensive 40-week program designed to transform teenagers from technology users to creators through hands-on AI and robotics learning, building confidence, problem-solving skills, and future-ready capabilities.',
  targetAudience: {
    gradeLevels: ['Grades 8-11'],
    ages: ['Ages 13-17'],
    prerequisites: 'Interest in technology and willingness to learn - no prior experience required',
    classSize: '10-15 students optimal for personalized attention',
    sessionFormat: 'Fridays, 2+ hours weekly sessions',
    learningStyle: 'Hands-on, project-based, collaborative learning with equipment ownership'
  },
  philosophy: {
    approach: 'Learn by creating with progressive skill building and equipment ownership',
    keyPrinciples: [
      'Zero-to-hero philosophy designed for complete beginners',
      'Progressive complexity building confidence at every step',
      'Portfolio-based assessment rather than traditional testing',
      'Equipment ownership creating long-term learning opportunities',
      'Focus on creativity and innovation over memorization'
    ]
  },
  structure: {
    totalDuration: '40 Weeks (10 Months)',
    phases: [
      {
        title: 'Phase 1: Digital Foundations',
        weeks: 'Weeks 1-8',
        description: 'Building computer confidence and basic programming skills'
      },
      {
        title: 'Phase 2: Electronics & Robotics Basics',
        weeks: 'Weeks 9-16',
        description: 'Building first robots and understanding electronics'
      },
      {
        title: 'Phase 3: AI Concepts & Tools',
        weeks: 'Weeks 17-28',
        description: 'Integrating artificial intelligence and advanced sensors'
      },
      {
        title: 'Phase 4: Integrated AI-Robotics Projects',
        weeks: 'Weeks 29-40',
        description: 'Capstone projects and portfolio development'
      }
    ]
  },
  modules: [phase1Data, phase2Data, phase3Data, phase4Data]
}

// Export convenience functions
export const getAllPhases = () => curriculumFramework.modules
export const getPhaseById = (id: string) => curriculumFramework.modules.find(m => m.id === id)
export const getAllWeeks = () => curriculumFramework.modules.flatMap(m => m.weeks || [])
export const getWeekByNumber = (weekNumber: number) => getAllWeeks().find(w => w.week === weekNumber)