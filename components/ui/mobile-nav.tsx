'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, Calendar, Users, FileText, BookOpen, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export const MobileNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b md:hidden z-50">
      <div className="flex justify-between items-center p-2 px-4">
        <h1 className="text-lg font-bold text-primary truncate max-w-[70%]">Team Roadmap</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/" className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link href="/sprints" className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition">
                <Calendar className="w-5 h-5" />
                <span>Sprints</span>
              </Link>
              <Link href="/roles" className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition">
                <Users className="w-5 h-5" />
                <span>Roles</span>
              </Link>
              <Link href="/meetings" className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition">
                <FileText className="w-5 h-5" />
                <span>Meetings</span>
              </Link>
              <Link href="/categories" className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition">
                <BookOpen className="w-5 h-5" />
                <span>Categories</span>
              </Link>
              <Link href="/products" className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition">
                <ShoppingCart className="w-5 h-5" />
                <span>Products</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
