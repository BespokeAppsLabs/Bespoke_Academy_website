/**
 * Equipment data for Bespoke Academy AI Robotics Curriculum
 * Progressive equipment distribution over 40 weeks with student ownership
 */

export interface EquipmentPhase {
  id: string
  title: string
  weeks: string
  description: string
  items: EquipmentItem[]
  totalValue: string
  studentBenefits: string[]
}

export interface EquipmentItem {
  name: string
  description: string
  quantity: number
  category: 'hardware' | 'software' | 'tools' | 'materials' | 'resources'
  specifications?: string
  imageUrl?: string
}

export interface EquipmentShowcase {
  totalValue: string
  phases: EquipmentPhase[]
  ownershipHighlights: string[]
  additionalCosts: {
    description: string
    estimatedCost: string
    optional: boolean
  }[]
  valueComparison: {
    alternative: string
    cost: string
    included: boolean
  }[]
}

// Phase 1: Digital Foundations Equipment
export const phase1Equipment: EquipmentPhase = {
  id: 'phase-1-equipment',
  title: 'Digital Foundations Package',
  weeks: 'Weeks 1-8',
  description: 'Complete computer setup and programming tools for learning digital literacy and basic programming',
  items: [
    {
      name: 'Raspberry Pi 4 Complete Starter Kit',
      description: 'Powerful single-board computer with case, power supply, and all necessary accessories',
      quantity: 1,
      category: 'hardware',
      specifications: '4GB RAM, 64-bit quad-core processor, WiFi, Bluetooth'
    },
    {
      name: 'Professional Software Development Tools',
      description: 'Licensed educational versions of essential programming and development software',
      quantity: 1,
      category: 'software'
    },
    {
      name: 'Learning Resources Platform Access',
      description: 'Premium educational platforms and interactive learning resources',
      quantity: 1,
      category: 'resources'
    },
    {
      name: 'Digital Organization System',
      description: 'Professional tools for file management, note-taking, and project organization',
      quantity: 1,
      category: 'software'
    },
    {
      name: 'Safety Equipment & Organization Tools',
      description: 'Professional setup including cable management, anti-static tools, and organization supplies',
      quantity: 1,
      category: 'tools'
    }
  ],
  totalValue: 'R1200',
  studentBenefits: [
    'Complete personal computer workstation',
    'Professional development environment setup',
    'Foundation for advanced programming projects',
    'Digital literacy and organization skills'
  ]
}

// Phase 2: Electronics & Robotics Equipment
export const phase2Equipment: EquipmentPhase = {
  id: 'phase-2-equipment',
  title: 'Electronics & Robotics Package',
  weeks: 'Weeks 9-16',
  description: 'Complete robotics and electronics toolkit for building first robots and understanding circuits',
  items: [
    {
      name: 'Robot Chassis Kit with Precision Wheels',
      description: 'Professional robot base with high-quality wheels, motors, and mounting hardware',
      quantity: 1,
      category: 'hardware',
      specifications: 'Metal chassis, precision-machined components, motor mounts'
    },
    {
      name: 'DC Motors and Servo Motors Kit',
      description: 'Various motors for different robot movements and applications',
      quantity: 4,
      category: 'hardware'
    },
    {
      name: 'Motor Controllers and Power Systems',
      description: 'Professional motor control boards and power distribution systems',
      quantity: 2,
      category: 'hardware'
    },
    {
      name: 'Electronic Components Mega Kit',
      description: 'Comprehensive collection of LEDs, resistors, capacitors, sensors, and basic components',
      quantity: 1,
      category: 'hardware',
      specifications: '500+ components, organized storage case'
    },
    {
      name: 'Digital Multimeter and Professional Tools',
      description: 'Professional testing and measurement equipment for electronics work',
      quantity: 1,
      category: 'tools'
    },
    {
      name: 'Breadboards and Circuit Building Supplies',
      description: 'Multiple breadboards, jumper wires, and circuit prototyping materials',
      quantity: 3,
      category: 'materials'
    }
  ],
  totalValue: 'R1500',
  studentBenefits: [
    'Complete robotics building capability',
    'Professional electronics workbench setup',
    'Understanding of circuit design and troubleshooting',
    'Foundation for advanced mechatronics projects'
  ]
}

// Phase 3: AI Vision & Sensors Equipment
export const phase3Equipment: EquipmentPhase = {
  id: 'phase-3-equipment',
  title: 'AI Vision & Sensors Package',
  weeks: 'Weeks 17-28',
  description: 'Advanced sensors and AI hardware for implementing computer vision and intelligent systems',
  items: [
    {
      name: 'Raspberry Pi High-Quality Camera Module',
      description: 'Professional 8MP camera with adjustable focus and interchangeable lenses',
      quantity: 1,
      category: 'hardware',
      specifications: '8MP resolution, adjustable focus, interchangeable lenses'
    },
    {
      name: 'Professional Microphone Array',
      description: 'Multi-microphone setup for voice recognition and audio processing',
      quantity: 1,
      category: 'hardware'
    },
    {
      name: 'Premium Speaker System',
      description: 'High-quality speakers for AI voice output and audio feedback',
      quantity: 1,
      category: 'hardware'
    },
    {
      name: 'Advanced Sensor Package',
      description: 'Collection of ultrasonic, temperature, motion, and environmental sensors',
      quantity: 1,
      category: 'hardware',
      specifications: '10+ different sensor types with calibration tools'
    },
    {
      name: 'Display Systems and Interaction Components',
      description: 'Touch screens, buttons, and interaction interfaces for user input',
      quantity: 1,
      category: 'hardware'
    },
    {
      name: 'Specialized AI Development Hardware',
      description: 'Optimized hardware for machine learning and AI model training',
      quantity: 1,
      category: 'hardware'
    }
  ],
  totalValue: 'R1300',
  studentBenefits: [
    'Complete AI sensing and perception capability',
    'Professional computer vision setup',
    'Voice interaction and audio processing tools',
    'Foundation for advanced AI projects'
  ]
}

// Phase 4: Advanced Project Equipment
export const phase4Equipment: EquipmentPhase = {
  id: 'phase-4-equipment',
  title: 'Advanced Project Package',
  weeks: 'Weeks 29-40',
  description: 'Specialized components and tools for custom capstone projects and professional presentations',
  items: [
    {
      name: 'Custom Project-Specific Components',
      description: 'Specialized components selected based on individual student project needs',
      quantity: 1,
      category: 'materials'
    },
    {
      name: 'Professional Construction Materials',
      description: 'High-quality materials for building project enclosures and structures',
      quantity: 1,
      category: 'materials'
    },
    {
      name: 'Specialized Project Tools',
      description: 'Advanced tools specific to capstone project requirements',
      quantity: 1,
      category: 'tools'
    },
    {
      name: 'Presentation and Demonstration Equipment',
      description: 'Professional setup for showcasing projects at demonstrations and fairs',
      quantity: 1,
      category: 'tools'
    },
    {
      name: 'Portfolio Development Tools',
      description: 'Professional software and resources for creating college application portfolios',
      quantity: 1,
      category: 'software'
    }
  ],
  totalValue: 'R1000+',
  studentBenefits: [
    'Customized project implementation capability',
    'Professional presentation and demonstration setup',
    'Complete portfolio development resources',
    'Foundation for continued innovation and learning'
  ]
}

// Complete equipment showcase data
export const equipmentShowcase: EquipmentShowcase = {
  totalValue: 'R5000+',
  phases: [phase1Equipment, phase2Equipment, phase3Equipment, phase4Equipment],
  ownershipHighlights: [
    'Progressive Investment: Equipment provided as needed throughout the program',
    'Student Ownership: All equipment becomes the student\'s personal property',
    'Professional Quality: Industry-standard components and tools',
    'Long-Term Value: Technology toolkit for continued innovation',
    'Home Lab Setup: Complete system for ongoing projects and learning'
  ],
  additionalCosts: [
    {
      description: 'Specialized final project components based on student choices',
      estimatedCost: 'R200-500',
      optional: false
    },
    {
      description: '3D printed parts and premium component upgrades',
      estimatedCost: 'R100-300',
      optional: true
    },
    {
      description: 'Competition registration fees (if participating)',
      estimatedCost: 'R50-200 per competition',
      optional: true
    }
  ],
  valueComparison: [
    {
      alternative: 'Private tutoring (R300-500/hour)',
      cost: 'R12,000-20,000 for equivalent hours',
      included: false
    },
    {
      alternative: 'Sports programs',
      cost: 'R8,000-20,000 annually',
      included: false
    },
    {
      alternative: 'Music lessons',
      cost: 'R6,000-12,000 annually',
      included: false
    },
    {
      alternative: 'Other STEM programs (without equipment)',
      cost: 'R20,000-40,000 annually',
      included: false
    },
    {
      alternative: 'Bespoke Academy (with equipment)',
      cost: 'R15,000 total with R5000+ equipment included',
      included: true
    }
  ]
}

// Export convenience functions
export const getAllEquipmentPhases = () => equipmentShowcase.phases
export const getEquipmentPhaseById = (id: string) => equipmentShowcase.phases.find(p => p.id === id)
export const getTotalEquipmentValue = () => equipmentShowcase.totalValue
export const getEquipmentValueByPhase = (phaseId: string) => {
  const phase = getEquipmentPhaseById(phaseId)
  return phase ? phase.totalValue : 'R0'
}