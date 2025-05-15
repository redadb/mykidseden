import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Users, CalendarDays, BarChart2, FileText, BookOpen, ShoppingCart } from "lucide-react"
import { MobileNav } from "@/components/ui/mobile-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Team Roadmap",
  description: "Team roles and sprint planning",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-slate-50 pb-[env(safe-area-inset-bottom)] md:pb-0">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link href="/" className="flex items-center px-3 text-slate-900 font-medium">
                    Team Roadmap
                  </Link>
                  <div className="hidden sm:ml-4 sm:flex sm:space-x-2">
                    <Link href="/roles" className="flex items-center px-2 py-1 text-xs text-slate-900 hover:text-blue-600 rounded transition">
                      <Users className="mr-1 h-4 w-4" />
                      Roles
                    </Link>
                    <Link href="/sprints" className="flex items-center px-2 py-1 text-xs text-slate-900 hover:text-blue-600 rounded transition">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      Sprints
                    </Link>
                    <Link href="/sprints/gantt" className="flex items-center px-2 py-1 text-xs text-slate-900 hover:text-blue-600 rounded transition">
                      <BarChart2 className="mr-1 h-4 w-4" />
                      Gantt
                    </Link>
                    <Link href="/meetings" className="flex items-center px-2 py-1 text-xs text-slate-900 hover:text-blue-600 rounded transition">
                      <FileText className="mr-1 h-4 w-4" />
                      Meetings
                    </Link>
                    <Link href="/categories" className="flex items-center px-2 py-1 text-xs text-slate-900 hover:text-blue-600 rounded transition">
                      <BookOpen className="mr-1 h-4 w-4" />
                      Categories
                    </Link>
                    <Link href="/products" className="flex items-center px-2 py-1 text-xs text-slate-900 hover:text-blue-600 rounded transition">
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <MobileNav />
        </div>
      </body>
    </html>
  )
}
