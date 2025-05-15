interface RoadmapItemProps {
  year: string
  title: string
  color: string
  items: string[]
}

export default function RoadmapItem({ year, title, color, items }: RoadmapItemProps) {
  return (
    <div className="ml-6 md:ml-10 group">
      <div className={`absolute w-5 h-5 ${color} rounded-full -left-[10px] top-1.5 shadow-glow`}></div>
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl font-bold text-slate-800">{year}</h3>
          <span className="text-lg font-medium text-slate-600">– {title}</span>
        </div>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1.5 max-w-2xl">
          {items.map((item, index) => (
            <li key={index} className="group-hover:text-slate-900 transition-colors duration-300">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
