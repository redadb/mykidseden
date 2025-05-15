import { CalendarDays, Target, ChevronDown, GitBranch, GitMerge } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sprints, Track, SprintCard } from "./data"

const trackColors: Record<Track, string> = {
  'A': "text-blue-500 bg-blue-100",
  'B': "text-blue-500 bg-blue-100",
  'C': "text-purple-500 bg-purple-100",
  'D': "text-yellow-500 bg-yellow-100",
  'E': "text-sky-500 bg-sky-100",
};

const TrackLabel = ({ track, className = "" }: { track: Track, className?: string }) => (
  <Badge variant="secondary" className={`${trackColors[track]} ${className}`}>
    <GitBranch className="w-3.5 h-3.5 mr-1" />
    Track {track}
  </Badge>
);

export default function SprintPlanningPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Sprint Planning</CardTitle>
          <CardDescription>
            Parallel tracks towards August 2025 product launch
          </CardDescription>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {(Object.keys(trackColors) as Track[]).map(track => (
              <TrackLabel key={track} track={track} />
            ))}
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {sprints.map((sprint: SprintCard, index: number) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div className="flex items-start md:items-center gap-4">
                  {sprint.track ? (
                    <TrackLabel track={sprint.track} />
                  ) : (
                    <Badge variant="secondary">
                      <GitMerge className="w-4 h-4 mr-1" />
                      Merged
                    </Badge>
                  )}
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <h3 className="text-xl font-bold">Sprint {sprint.sprintNumber}:</h3>
                      <span className="text-xl">{sprint.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground text-sm">{sprint.dates}</p>
                      {sprint.phase && (
                        <Badge variant="outline" className="text-xs">
                          {sprint.phase}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary mt-2 md:mt-0">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">{sprint.focus}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Sprint Goals</h4>
                  <ul className="space-y-2">
                    {sprint.goals.map((goal: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Target Metrics</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Blog Visitors:</span> {sprint.metrics.blogVisitors}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Social Following:</span> {sprint.metrics.socialFollowers}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Leads/Sales:</span> {sprint.metrics.leads}
                    </p>
                  </div>
                </div>
              </div>

              {sprint.details && (
                <Accordion type="single" collapsible className="border-t mt-6 pt-4">
                  <AccordionItem value="details" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-2">
                      <div className="flex items-center gap-2">
                        <ChevronDown className="w-4 h-4 text-primary shrink-0 transition-transform duration-200" />
                        <span className="text-sm font-medium">View Sprint Details</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        {sprint.details.participants && (
                          <div className="space-y-2">
                            <h5 className="font-medium text-sm">Participants</h5>
                            <div className="flex flex-wrap gap-1.5">
                              {sprint.details.participants.map((participant: string, idx: number) => (
                                <Badge key={idx} variant="secondary">
                                  {participant}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {sprint.details.keyDeliverables && (
                          <div className="space-y-2">
                            <h5 className="font-medium text-sm">Key Deliverables</h5>
                            <ul className="space-y-2">
                              {sprint.details.keyDeliverables.map((deliverable: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5" />
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
