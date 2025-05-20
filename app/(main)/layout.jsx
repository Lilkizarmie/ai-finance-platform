"use client"

import { Sidebar } from '@/components/sidebar'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function MainLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar onCollapse={setIsSidebarCollapsed} />
      <main className={cn(
        "flex-1 transition-all duration-300",
        isSidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        <div className="container mx-auto p-10 mt-10">
          {children}
        </div>
      </main>
    </div>
  )
} 