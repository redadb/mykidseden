import { meetingSuggestions } from "./data"

export default function MeetingsPage() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-3xl font-bold text-center tracking-tight text-slate-800">
          <span className="inline-block mr-2">📋</span>
          {meetingSuggestions.title}
        </h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="space-y-8">
          {meetingSuggestions.sections.map((section, index) => (
            <div 
              key={index} 
              className="p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200"
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                  {index + 1}
                </span>
                {section.title}
              </h3>
              <ul className="space-y-2 list-inside text-slate-600">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
