export type Track = 'A' | 'B' | 'C' | 'D' | 'E';

export interface SprintCard {
  sprintNumber: number
  title: string
  dates: string
  goals: string[]
  metrics: {
    blogVisitors: string
    socialFollowers: string
    leads: string
  }
  focus: string
  track?: Track
  phase?: string
  details?: {
    participants?: string[]
    meetings?: Array<{
      date: string
      time: string
      subject: string
    }>
    keyDeliverables?: string[]
  }
}

export const sprints: SprintCard[] = [
  {
    sprintNumber: 1,
    title: "Web Environment Setup",
    dates: "April 15 - April 28",
    track: "A",
    focus: "Digital Infrastructure & Branding",
    goals: [
      "Set up blog platform with basic design and SEO structure",
      "Initialize e-commerce website with core features",
      "Create and set up social media accounts",
      "Develop brand identity and visual guidelines",
      "Implement analytics tracking and monitoring tools",
      "Set up development & staging environments"
    ],
    metrics: {
      blogVisitors: "Initial Setup",
      socialFollowers: "Platform Ready",
      leads: "Infrastructure Ready"
    },
    details: {
      participants: ["Zouhair", "Naoufel"],
      keyDeliverables: [
        "Blog platform setup with SEO optimization",
        "E-commerce website core functionality",
        "Social media accounts setup",
        "Brand identity package",
        "Brand guidelines document",
        "Analytics and tracking implementation"
      ]
    }
  },
  {
    sprintNumber: 2,
    title: "Product Development & Supply Chain",
    dates: "April 15 - April 28",
    track: "B",
    focus: "Product Development & Sourcing",
    goals: [
      "Define initial product collection and specifications",
      "Design product packaging and presentation",
      "Research and identify potential suppliers",
      "Establish supplier evaluation criteria",
      "Begin supplier negotiations and sampling",
      "Create product quality standards"
    ],
    metrics: {
      blogVisitors: "N/A",
      socialFollowers: "N/A",
      leads: "Supplier Shortlist"
    },
    details: {
      participants: ["Reda", "Naoufel"],
      keyDeliverables: [
        "Initial product collection document",
        "Product specifications documentation",
        "Packaging design concepts",
        "Supplier evaluation criteria",
        "Quality standards documentation",
        "Initial supplier agreements"
      ]
    }
  },
  {
    sprintNumber: 3,
    title: "Market Testing",
    dates: "April 29 - June 9",
    track: "C",
    focus: "Production, Testing & Refinement",
    phase: "Production > Testing > Analysis",
    goals: [
      "Produce 30-40 product samples",
      "Distribute to 20-30 testers",
      "Gather and analyze feedback",
      "Implement product improvements",
      "Finalize product specifications"
    ],
    metrics: {
      blogVisitors: "300/month",
      socialFollowers: "500+",
      leads: "20-30 testers"
    },
    details: {
      participants: ["Reda", "Taha"],
      keyDeliverables: [
        "Production samples",
        "Testing documentation",
        "Feedback analysis report",
        "Product improvements log",
        "Final specifications"
      ]
    }
  },
  {
    sprintNumber: 4,
    title: "Administrative Setup",
    dates: "April 29 - June 9",
    track: "D",
    focus: "Business Operations",
    goals: [
      "Complete company registration",
      "Set up banking and payment systems",
      "Establish warehouse logistics",
      "Create financial tracking systems",
      "Develop partnerships"
    ],
    metrics: {
      blogVisitors: "N/A",
      socialFollowers: "N/A",
      leads: "Operations Ready"
    },
    details: {
      participants: ["Reda", "Taha"],
      keyDeliverables: [
        "Legal documentation",
        "Financial systems setup",
        "Logistics framework",
        "Partnership agreements"
      ]
    }
  },
  {
    sprintNumber: 5,
    title: "Content & Community",
    dates: "April 29 - June 9",
    track: "E",
    focus: "Social Media & Blog Development",
    phase: "Foundation > Creation > Engagement",
    goals: [
      "Develop content strategy",
      "Create blog posts and social content",
      "Build community engagement",
      "Document testing process",
      "Gather testimonials"
    ],
    metrics: {
      blogVisitors: "500/month",
      socialFollowers: "1000+",
      leads: "200+ subscribers"
    },
    details: {
      participants: ["Zouhair", "Naoufel"],
      keyDeliverables: [
        "Content calendar",
        "Blog posts",
        "Social media content",
        "Testing documentation",
        "User testimonials"
      ]
    }
  },
  {
    sprintNumber: 6,
    title: "E-commerce & Sales Launch",
    dates: "June 24 - July 7",
    focus: "Sales Operations",
    goals: [
      "Launch e-commerce platform",
      "Set up payment and shipping",
      "Implement inventory system",
      "Configure analytics",
      "Launch marketing campaign"
    ],
    metrics: {
      blogVisitors: "750/month",
      socialFollowers: "1500+",
      leads: "50+ first-week sales"
    },
    details: {
      participants: ["Reda", "Zouhair", "Taha"],
      keyDeliverables: [
        "Live e-commerce platform",
        "Order management system",
        "Shipping workflows",
        "Marketing assets"
      ]
    }
  },
  {
    sprintNumber: 7,
    title: "R&D Analysis",
    dates: "July 8 - July 21",
    focus: "Research & Innovation",
    goals: [
      "Analyze product functionality",
      "Research emerging technologies",
      "Identify innovation opportunities",
      "Create evaluation framework",
      "Develop R&D roadmap"
    ],
    metrics: {
      blogVisitors: "1000/month",
      socialFollowers: "2000+",
      leads: "Innovation Pipeline"
    },
    details: {
      participants: ["Reda", "Naoufel"],
      keyDeliverables: [
        "Functional analysis report",
        "Technology research findings",
        "Innovation opportunities report",
        "R&D roadmap"
      ]
    }
  },
  {
    sprintNumber: 8,
    title: "B2B Strategy",
    dates: "July 22 - August 4",
    focus: "B2B Market Development",
    goals: [
      "Analyze B2B segments",
      "Develop institutional pricing",
      "Create B2B packages",
      "Establish partnerships",
      "Design B2B marketing"
    ],
    metrics: {
      blogVisitors: "1200/month",
      socialFollowers: "2500+",
      leads: "B2B Pipeline"
    },
    details: {
      participants: ["Reda", "Taha"],
      keyDeliverables: [
        "B2B market analysis",
        "Pricing strategy",
        "Partnership framework",
        "B2B marketing plan"
      ]
    }
  }
]
