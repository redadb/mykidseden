export interface Role {
  id: number
  title: string
  leader: boolean
  focusAreas: string[]
  primarySprints: string[]
  responsibilities: string[]
  requiredSkills: string[]
  assignedMember: string
}

export const roles: Role[] = [
  {
    id: 1,
    title: "Product Manager & Logistics Lead",
    leader: true,
    focusAreas: ["Product", "Business Operations"],
    primarySprints: ["2", "3", "4"],
    responsibilities: [
      "Product research and development",
      "Supplier relations management",
      "Fulfillment to warehouse coordination",
      "Fulfillment to customer operations",
      "Overall project leadership",
      "Strategic planning and execution"
    ],
    requiredSkills: [
      "Product management",
      "Supply chain management",
      "Logistics operations",
      "Leadership",
      "Strategic planning"
    ],
    assignedMember: "Reda"
  },
  {
    id: 2,
    title: "Brand & Marketing Director",
    leader: false,
    focusAreas: ["Product", "Customer"],
    primarySprints: ["1", "5", "6"],
    responsibilities: [
      "Brand identity development",
      "UI/UX design oversight",
      "Media content creation",
      "Marketing strategy",
      "Advertising campaigns",
      "Brand consistency"
    ],
    requiredSkills: [
      "Brand development",
      "Marketing strategy",
      "UI/UX principles",
      "Creative direction",
      "Campaign management"
    ],
    assignedMember: "Naoufel"
  },
  {
    id: 3,
    title: "Content & Website Manager",
    leader: false,
    focusAreas: ["Product", "Operations", "Customer"],
    primarySprints: ["1", "5", "6"],
    responsibilities: [
      "SEO content creation",
      "Technical website management",
      "Product listing optimization",
      "Social media content strategy",
      "Website content maintenance",
      "Product documentation"
    ],
    requiredSkills: [
      "Content management",
      "SEO expertise",
      "Technical web skills",
      "Social media management",
      "Product writing"
    ],
    assignedMember: "Zouhair"
  },
  {
    id: 4,
    title: "Operations & Customer Support Manager",
    leader: false,
    focusAreas: ["Business Operations", "Customer"],
    primarySprints: ["4", "6", "8"],
    responsibilities: [
      "Business administration",
      "Financial management",
      "Customer support coordination",
      "Operations optimization",
      "Support system implementation",
      "Customer feedback management"
    ],
    requiredSkills: [
      "Business administration",
      "Financial management",
      "Customer service",
      "Operations management",
      "Support systems"
    ],
    assignedMember: "Taha"
  }
]
