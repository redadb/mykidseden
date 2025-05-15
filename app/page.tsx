import Link from "next/link"
import { Users, CalendarDays, Target, Users2, ShoppingCart, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Team Roadmap
        </h1>
        <p className="text-xl text-muted-foreground">
          Building My Kids Eden: Educational Toys with Purpose
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Vision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Short-Term Focus</h3>
            <p className="text-muted-foreground">
              My Kids Eden is pioneering the fusion of educational content and thoughtfully designed toys, 
              with parallel development of e-commerce and R&D initiatives. Our approach combines building 
              a strong educational foundation through our blog platform while simultaneously developing our 
              innovative product line and establishing our market presence through e-commerce within the next 1-2 years.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Long-Term Vision & Impact</h3>
            <p className="text-muted-foreground">
              Over the next 5 years, we aim to achieve full industrialization of our production process,
              developing cutting-edge technological expertise in educational toy manufacturing. Our vision
              extends beyond commercial success - we strive to revolutionize educational toy manufacturing
              in our region, create sustainable employment opportunities, and establish new standards for
              educational product development. Through innovation and commitment to quality, we will become
              a leader in educational solutions while making a meaningful impact on children's learning
              and development, contributing to both technological advancement and social progress.
            </p>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Initial Launch Goals</h3>
              <Badge variant="secondary" className="text-base">
                <Calendar className="mr-2 h-4 w-4" />
                Target: July 1st, 2025
              </Badge>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardContent className="pt-6 flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Blog Traffic Goal</CardTitle>
                    <CardDescription className="text-lg mt-1">1,000 Monthly Visitors</CardDescription>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">
                    <Users2 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Community Goal</CardTitle>
                    <CardDescription className="text-lg mt-1">2,000+ Social Media Followers</CardDescription>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Sales Goal</CardTitle>
                    <CardDescription className="text-lg mt-1">First B2C Purchase on E-commerce Platform</CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/roles">
          <Card className="transition-colors hover:bg-accent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Team Roles</CardTitle>
              </div>
              <CardDescription className="text-base">
                Detailed breakdown of team responsibilities and collaborative areas.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/sprints">
          <Card className="transition-colors hover:bg-accent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <CardTitle>Sprint Planning</CardTitle>
              </div>
              <CardDescription className="text-base">
                Bi-weekly sprints with clear objectives towards our July 2025 launch.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
