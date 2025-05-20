"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Receipt,
  FileText,
  CreditCard,
  BarChart3,
  Bot,
  Link2,
  Users,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview of key metrics'
  },
  {
    title: 'Transactions',
    href: '/transaction',
    icon: Receipt,
    description: 'Manage and categorize transactions'
  },
  {
    title: 'Invoicing',
    href: '/invoicing',
    icon: FileText,
    description: 'Create and manage invoices'
  },
  {
    title: 'Bills & Expenses',
    href: '/bills',
    icon: CreditCard,
    description: 'Track bills and expenses'
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3,
    description: 'View financial reports'
  },
  {
    title: 'AI Assistant',
    href: '/assistant',
    icon: Bot,
    description: 'Get AI-powered insights'
  },
  {
    title: 'Integrations',
    href: '/integrations',
    icon: Link2,
    description: 'Connect with other tools'
  },
  {
    title: 'Clients & Vendors',
    href: '/clients',
    icon: Users,
    description: 'Manage business contacts'
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
    description: 'View alerts and updates'
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Configure your account'
  }
]

export function Sidebar({ onCollapse }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    onCollapse?.(!isCollapsed)
  }

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-30 h-screen flex-col border-r bg-background transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header with toggle button */}
      <div className="flex h-14 items-center px-3 border-b">
        <button
          onClick={handleCollapse}
          className="mr-2 rounded-md p-1.5 hover:bg-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
        {!isCollapsed && (
          <span className="font-semibold">AI Finance</span>
        )}
      </div>

      <nav className="flex-1 overflow-auto py-4">
        <div className="px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive ? "bg-accent" : "transparent",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <item.icon className="h-4 w-4" />
                  {!isCollapsed && (
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </aside>
  )
} 