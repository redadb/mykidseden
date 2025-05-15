import RoadmapItem from "@/components/roadmap-item"

export default function RoadmapPage() {
  const roadmapItems = [
    {
      year: "Year 1",
      title: "White Labeling & Market Entry",
      color: "bg-amber-400",
      items: [
        "Source high-quality white-label educational products",
        "Make small adjustments with manufacturers to customize products",
        "Establish efficient order fulfillment and customer support systems",
        "Build social media presence and implement SEO strategy",
        "Develop initial partnerships with affiliates and influencers",
        "Launch branded product line across target markets",
        "Collect market data and customer feedback",
      ],
    },
    {
      year: "Year 2",
      title: "Market Learning & Initial Development",
      color: "bg-emerald-400",
      items: [
        "Analyze market data to identify product improvement opportunities",
        "Begin R&D for proprietary features while maintaining white-label base",
        "Optimize fulfillment processes and expand support capabilities",
        "Scale content marketing and social media engagement",
        "Develop strategic partnerships with complementary brands",
        "Expand product catalog with customized white-label products",
        "Start designing first partially-integrated products (30% proprietary)",
      ],
    },
    {
      year: "Year 3",
      title: "Partial Integration & Hybrid Products",
      color: "bg-blue-400",
      items: [
        "Launch first hybrid products (50% proprietary components)",
        "Establish small-scale production capabilities for key components",
        "Implement advanced CRM systems for customer relationship management",
        "Develop comprehensive content strategy for SEO dominance",
        "Create partnership program with educational institutions",
        "File patents for proprietary technologies and designs",
        "Gradually reduce dependency on white-label products",
      ],
    },
    {
      year: "Year 4",
      title: "Advanced Integration & Scaling Production",
      color: "bg-purple-400",
      items: [
        "Scale up production of proprietary components (75% integration)",
        "Establish quality control systems and manufacturing standards",
        "Launch premium customer support and loyalty programs",
        "Expand digital marketing to international markets",
        "Develop exclusive partnerships with major retailers",
        "Optimize supply chain for proprietary product lines",
        "Phase out most white-label products except for strategic segments",
      ],
    },
    {
      year: "Year 5",
      title: "Complete Integration & Full-Scale Production",
      color: "bg-pink-400",
      items: [
        "Achieve 100% integration with fully proprietary product lines",
        "Operate full-scale production facilities",
        "Implement AI-powered customer support and personalization",
        "Establish thought leadership position through content and SEO",
        "Create industry-leading partnership ecosystem",
        "Implement advanced manufacturing technologies",
        "Leverage accumulated market knowledge for next-gen products",
      ],
    },
  ]

  return (
    <div className="animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-3xl font-bold text-center tracking-tight text-slate-800">
          <span className="inline-block mr-2">🚀</span>
          5-Year Roadmap Timeline
        </h2>
        <p className="text-center text-slate-600 mt-2">Long-term strategic plan for business growth</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="relative border-l-2 border-slate-300 ml-4 md:ml-8 space-y-12 py-4">
          {roadmapItems.map((item, index) => (
            <RoadmapItem key={index} year={item.year} title={item.title} color={item.color} items={item.items} />
          ))}
        </div>
      </div>
    </div>
  )
}
