/**
 * Pricing information for Bespoke Academy AI Robotics Curriculum
 * Transparent pricing structure with equipment value and payment options
 */

export interface PricingPlan {
  id: string
  name: string
  duration: string
  monthlyInvestment: number
  totalCost: number
  equipmentValue: number
  billingCycle: 'monthly' | 'quarterly' | 'annually'
  features: PricingFeature[]
  included: string[]
  paymentOptions: PaymentOption[]
}

export interface PricingFeature {
  name: string
  included: boolean
  description?: string
  value?: string
}

export interface PaymentOption {
  type: 'monthly' | 'quarterly' | 'annual' | 'custom'
  description: string
  frequency: string
  totalInstallments: number
  installmentAmount: number
  totalAmount: number
  savings?: number
}

export interface Discount {
  id: string
  name: string
  description: string
  percentage: number
  conditions: string[]
  applicablePlans: string[]
}

export interface CostBreakdown {
  category: string
  description: string
  amount: number
  included: boolean
  optional: boolean
}

export interface ValueProposition {
  title: string
  description: string
  quantifiableValue: string
  intangibleValue: string[]
}

// Main pricing plan
export const standardPricingPlan: PricingPlan = {
  id: 'standard-plan',
  name: 'Complete AI Robotics Program',
  duration: '40 Weeks (10 Months)',
  monthlyInvestment: 1500,
  totalCost: 15000,
  equipmentValue: 5000,
  billingCycle: 'monthly',
  features: [
    {
      name: 'Weekly Supervised Learning Sessions',
      included: true,
      description: '2+ hours every Friday with professional instructors',
      value: 'R200/hour equivalent'
    },
    {
      name: 'Progressive Equipment Packages',
      included: true,
      description: 'R5000+ in technology equipment distributed throughout program',
      value: 'R5000+'
    },
    {
      name: 'All Software and Learning Materials',
      included: true,
      description: 'Licensed software, platforms, and comprehensive resources',
      value: 'R2000'
    },
    {
      name: 'Weekly Progress Updates',
      included: true,
      description: 'Detailed reports for parents with photos and videos',
      value: 'Priceless'
    },
    {
      name: 'Portfolio Development Support',
      included: true,
      description: 'College application portfolio preparation and guidance',
      value: 'R3000'
    },
    {
      name: 'Showcase Events',
      included: true,
      description: 'Quarterly demonstrations for family and friends',
      value: 'R500 per event'
    },
    {
      name: 'Personalized Attention',
      included: true,
      description: '10:1 student-to-instructor ratio maximum',
      value: 'Premium educational experience'
    },
    {
      name: 'Equipment Ownership',
      included: true,
      description: 'All equipment becomes student\'s personal property',
      value: 'R5000+'
    }
  ],
  included: [
    'All equipment and materials',
    'Software licenses and platforms',
    'Instruction and supervision',
    'Progress tracking and reporting',
    'Portfolio development guidance',
    'Showcase events and demonstrations'
  ],
  paymentOptions: [
    {
      type: 'monthly',
      description: 'Standard monthly billing',
      frequency: 'Monthly',
      totalInstallments: 10,
      installmentAmount: 1500,
      totalAmount: 15000
    },
    {
      type: 'quarterly',
      description: 'Pay quarterly for convenience',
      frequency: 'Every 3 months',
      totalInstallments: 3,
      installmentAmount: 4500,
      totalAmount: 13500,
      savings: 1500
    },
    {
      type: 'annual',
      description: 'Pay annualy for maximum savings',
      frequency: 'Once per year',
      totalInstallments: 1,
      installmentAmount: 13500,
      totalAmount: 13500,
      savings: 1500
    }
  ]
}

// Available discounts
export const availableDiscounts: Discount[] = [
  {
    id: 'early-bird',
    name: 'Early Bird Discount',
    description: '10% off for enrollment before specified date',
    percentage: 10,
    conditions: [
      'Enroll at least 30 days before program start',
      'Complete full payment before orientation',
      'New students only'
    ],
    applicablePlans: ['standard-plan']
  },
  {
    id: 'sibling',
    name: 'Sibling Discount',
    description: '5% off for additional children from same family',
    percentage: 5,
    conditions: [
      'Two or more children from same household',
      'Same enrollment period',
      'Cannot be combined with early bird discount'
    ],
    applicablePlans: ['standard-plan']
  },
  {
    id: 'referral',
    name: 'Referral Bonus',
    description: 'R500 credit for successful referrals',
    percentage: 0,
    conditions: [
      'Referred family must complete enrollment',
      'Credit applied to next month\'s tuition',
      'No limit on number of referrals'
    ],
    applicablePlans: ['standard-plan']
  }
]

// Cost breakdown transparency
export const costBreakdown: CostBreakdown[] = [
  {
    category: 'Program Tuition',
    description: 'Instruction, curriculum development, and supervision',
    amount: 10000,
    included: true,
    optional: false
  },
  {
    category: 'Equipment Package Phase 1',
    description: 'Digital foundations equipment (Raspberry Pi, software, tools)',
    amount: 1200,
    included: true,
    optional: false
  },
  {
    category: 'Equipment Package Phase 2',
    description: 'Robotics and electronics equipment',
    amount: 1500,
    included: true,
    optional: false
  },
  {
    category: 'Equipment Package Phase 3',
    description: 'AI vision and sensors equipment',
    amount: 1300,
    included: true,
    optional: false
  },
  {
    category: 'Equipment Package Phase 4',
    description: 'Advanced project and presentation equipment',
    amount: 1000,
    included: true,
    optional: false
  },
  {
    category: 'Software and Platform Licenses',
    description: 'Educational software, development tools, and learning platforms',
    amount: 800,
    included: true,
    optional: false
  },
  {
    category: 'Materials and Consumables',
    description: 'Project materials, supplies, and consumable items',
    amount: 700,
    included: true,
    optional: false
  },
  {
    category: 'Specialized Final Project Components',
    description: 'Additional components for custom capstone projects',
    amount: 350,
    included: false,
    optional: true
  },
  {
    category: 'Optional Component Upgrades',
    description: 'Premium components and 3D printed parts',
    amount: 200,
    included: false,
    optional: true
  }
]

// Value proposition
export const valuePropositions: ValueProposition[] = [
  {
    title: 'Equipment Ownership Value',
    description: 'Students build their personal technology toolkit worth R5000+',
    quantifiableValue: 'R5000+ in professional equipment',
    intangibleValue: [
      'Home technology lab for continued learning',
      'Professional-grade components for serious STEM work',
      'Foundation for ongoing innovation and projects'
    ]
  },
  {
    title: 'Educational Quality',
    description: 'Personalized attention with maximum 10:1 student ratio',
    quantifiableValue: 'Equivalent to R300/hour private tutoring',
    intangibleValue: [
      'Individualized learning pace and focus',
      'Professional supervision and safety',
      'Age-appropriate curriculum design'
    ]
  },
  {
    title: 'Portfolio Development',
    description: 'Complete portfolio for college applications',
    quantifiableValue: 'R3000+ portfolio consulting value',
    intangibleValue: [
      'Competitive advantage in college applications',
      'Demonstrated long-term commitment and skills',
      'Professional project documentation and presentation'
    ]
  },
  {
    title: 'Future-Ready Skills',
    description: 'Skills that prepare students for careers that don\'t exist yet',
    quantifiableValue: 'Invaluable lifetime advantage',
    intangibleValue: [
      'Adaptability to emerging technologies',
      'Problem-solving and critical thinking',
      'Confidence and self-directed learning abilities'
    ]
  }
]

// Payment flexibility and guarantees
export const paymentPolicies = {
  flexibility: {
    pauseOptions: {
      description: 'Temporary program pause for family circumstances',
      conditions: [
        'Family emergencies or travel',
        'Medical situations',
        'Up to 4 weeks pause per program year',
        'Resume at same curriculum point'
      ]
    },
    makeUpSessions: {
      description: 'Available for missed classes',
      conditions: [
        'Schedule within 2 weeks of missed session',
        'Individual catch-up with instructor',
        'Access to all materials and equipment'
      ]
    }
  },
  guarantees: {
    satisfaction: {
      description: '30-Day Risk-Free Trial',
      terms: [
        'Full refund if not completely satisfied',
        'No questions asked policy',
        'Equipment provided remains with student'
      ]
    },
    proRataRefund: {
      description: 'Proportional refund policy',
      terms: [
        'After 30 days, pro-rata refund available',
        'Calculated based on remaining weeks',
        'Equipment already distributed remains with student'
      ]
    }
  }
}

// Export convenience functions
export const getPricingPlan = () => standardPricingPlan
export const getDiscountById = (id: string) => availableDiscounts.find(d => d.id === id)
export const getTotalProgramValue = () => standardPricingPlan.totalCost + standardPricingPlan.equipmentValue
export const getMonthlyInvestment = () => standardPricingPlan.monthlyInvestment
export const getIncludedValue = () => costBreakdown.filter(item => item.included).reduce((sum, item) => sum + item.amount, 0)