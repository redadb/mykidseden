import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

interface Goal {
  title: string
  description: string
  status: "completed" | "in-progress" | "pending"
  dueDate: string
}

interface MonthlyGoalCardProps {
  goal: Goal
}

export default function MonthlyGoalCard({ goal }: MonthlyGoalCardProps) {
  const statusIcons = {
    completed: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    "in-progress": <Clock className="h-5 w-5 text-amber-500" />,
    pending: <AlertCircle className="h-5 w-5 text-slate-400" />,
  }

  const statusText = {
    completed: "Completed",
    "in-progress": "In Progress",
    pending: "Pending",
  }

  const statusColors = {
    completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
    "in-progress": "bg-amber-100 text-amber-800 border-amber-200",
    pending: "bg-slate-100 text-slate-800 border-slate-200",
  }

  return (
    <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 card-hover">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <h4 className="font-semibold text-slate-800">{goal.title}</h4>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[goal.status]}`}>
          <div className="flex items-center gap-1">
            {statusIcons[goal.status]}
            <span>{statusText[goal.status]}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 mb-3">{goal.description}</p>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Due: {goal.dueDate}</span>
        </div>
      </CardContent>
    </Card>
  )
}
