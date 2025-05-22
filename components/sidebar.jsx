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
  ChevronRight,
  BookOpen,
  Settings2,
  LogOut,
  ShoppingCart
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'

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
    title: 'Explainer',
    href: '/explainer',
    icon: BookOpen,
    description: 'Deeper analysis'
  },
  {
    title: 'Invoicing',
    href: '/invoicing',
    icon: FileText,
    description: 'invoicing patterns & revenue flows'
  },
  {
    title: 'Bills & Expenses',
    href: '/bills',
    icon: CreditCard,
    description: 'Track bills and expenses'
  },
  {
    title: 'Sales Analysis',
    href: '/product-analysis',
    icon: ShoppingCart,
    description: 'Insights into product sales'
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
    title: 'Tools & Management',
    href: '/tools',
    icon: Settings2,
    description: 'Strategy tools and cash management'
  },
  {
    title: 'Data Sources',
    href: '/data-sources',
    icon: Link2,
    description: 'Connect with other tools'
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
  const { user } = useUser()

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    onCollapse?.(!isCollapsed)
  }

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-30 h-screen flex-col border-r bg-white transition-all duration-300 shadow-sm",
      isCollapsed ? "w-16" : "w-72"
    )}>
      {/* Header with logo and toggle button */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#32AE4C] flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="font-semibold text-lg">AI Finance</span>
          </div>
        )}
        <button
          onClick={handleCollapse}
          className="p-2 rounded-lg hover:bg-green-50 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-[#32AE4C]" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-[#32AE4C]" />
          )}
        </button>
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
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                    isActive 
                      ? "bg-[#32AE4C] text-white" 
                      : "text-gray-600 hover:bg-green-50 hover:text-[#32AE4C]",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-white" : "text-[#32AE4C]"
                  )} />
                  {!isCollapsed && (
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-xs opacity-70">
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

      {/* Footer with user profile and logout */}
      <div className="border-t p-4">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.fullName || 'User'}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <Users className="h-4 w-4 text-[#32AE4C]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.fullName || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-lg",
                  userButtonPopoverFooter: "hidden",
                  userButtonPopoverActionButton: "text-[#32AE4C]",
                  userButtonPopoverActionButtonText: "text-[#32AE4C]",
                },
              }}
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-lg",
                  userButtonPopoverFooter: "hidden",
                  userButtonPopoverActionButton: "text-[#32AE4C]",
                  userButtonPopoverActionButtonText: "text-[#32AE4C]",
                },
              }}
            />
          </div>
        )}
      </div>
    </aside>
  )
} 