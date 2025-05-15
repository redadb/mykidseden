import { Check, Users, Calendar, UserCircle, Target, Star } from "lucide-react"
import { roles } from "./data"

export default function RolesPage() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-white p-2 md:p-6 rounded-xl shadow-sm mb-3 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-center tracking-tight text-slate-800">Team Roles</h2>
        <p className="text-center text-slate-600 text-sm mt-0.5 md:mt-2">Key roles and responsibilities for project execution</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-xl shadow-sm p-3 md:p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">{role.title}</h3>
                  {role.leader && (
                    <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full text-xs font-medium">
                      Team Leader
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-slate-500">
                    <UserCircle className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{role.assignedMember}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-xs">Sprints: {role.primarySprints.join(", ")}</span>
                  </div>
                </div>
              </div>
              <div className="bg-emerald-50 text-emerald-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-800 mb-2 text-sm tracking-tight">Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {role.focusAreas.map((area, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      <Target className="w-3.5 h-3.5" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-800 mb-2 text-sm tracking-tight">Key Responsibilities</h4>
                <ul className="space-y-1.5">
                  {role.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-slate-800 mb-2 text-sm tracking-tight">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {role.requiredSkills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
