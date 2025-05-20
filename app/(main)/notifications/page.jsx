"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, Clock, Bell, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data - replace with actual data fetching
const mockData = {
  notifications: [
    {
      id: 1,
      type: 'spending_spike',
      title: 'Unusual Spending Detected',
      description: 'Your spending in the "Marketing" category has increased by 150% compared to last month',
      severity: 'high',
      date: new Date('2024-03-15T10:30:00'),
      category: 'Marketing',
      previousAmount: 1000,
      currentAmount: 2500,
      isRead: false
    },
    {
      id: 2,
      type: 'low_cash',
      title: 'Low Cash Balance Warning',
      description: 'Your cash balance is below the recommended minimum threshold',
      severity: 'critical',
      date: new Date('2024-03-15T09:15:00'),
      currentBalance: 2500,
      recommendedMinimum: 5000,
      isRead: false
    },
    {
      id: 3,
      type: 'forecast_risk',
      title: 'Forecast Risk Zone',
      description: 'Projected expenses may exceed income in the next 30 days',
      severity: 'medium',
      date: new Date('2024-03-14T16:45:00'),
      projectedIncome: 8000,
      projectedExpenses: 9500,
      isRead: true
    },
    {
      id: 4,
      type: 'spending_spike',
      title: 'Category Spending Alert',
      description: 'Your "Office Supplies" spending is 75% higher than usual',
      severity: 'medium',
      date: new Date('2024-03-14T14:20:00'),
      category: 'Office Supplies',
      previousAmount: 400,
      currentAmount: 700,
      isRead: true
    }
  ]
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockData.notifications)

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ))
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-red-500'
      case 'high':
        return 'text-orange-500'
      case 'medium':
        return 'text-yellow-500'
      default:
        return 'text-blue-500'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-5 w-5" />
      case 'high':
        return <AlertTriangle className="h-5 w-5" />
      case 'medium':
        return <TrendingUp className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'spending_spike':
        return <TrendingUp className="h-5 w-5" />
      case 'low_cash':
        return <DollarSign className="h-5 w-5" />
      case 'forecast_risk':
        return <TrendingDown className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <Button variant="outline" size="sm">
          Mark All as Read
        </Button>
      </div>
      
      <div className="grid gap-4">
        {/* Spending Spikes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-normal">Spending Alerts</CardTitle>
            <CardDescription>
              Unusual spending patterns and category spikes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications
                .filter(n => n.type === 'spending_spike')
                .map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "flex items-start gap-4 p-4 border rounded-lg",
                      !notification.isRead && "bg-muted/50"
                    )}
                  >
                    <div className={cn("mt-1", getSeverityColor(notification.severity))}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <span className="text-xs text-muted-foreground">
                          {notification.date.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium">Previous: ${notification.previousAmount}</span>
                        <span className="text-xs">→</span>
                        <span className="text-xs font-medium">Current: ${notification.currentAmount}</span>
                      </div>
                    </div>
                    {!notification.isRead && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Cash Warnings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-normal">Cash Balance Alerts</CardTitle>
            <CardDescription>
              Low balance warnings and cash flow alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications
                .filter(n => n.type === 'low_cash')
                .map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "flex items-start gap-4 p-4 border rounded-lg",
                      !notification.isRead && "bg-muted/50"
                    )}
                  >
                    <div className={cn("mt-1", getSeverityColor(notification.severity))}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <span className="text-xs text-muted-foreground">
                          {notification.date.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium">Current Balance: ${notification.currentBalance}</span>
                        <span className="text-xs">→</span>
                        <span className="text-xs font-medium">Recommended: ${notification.recommendedMinimum}</span>
                      </div>
                    </div>
                    {!notification.isRead && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Forecast Risk Zones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-normal">Forecast Alerts</CardTitle>
            <CardDescription>
              Projected financial risks and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications
                .filter(n => n.type === 'forecast_risk')
                .map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "flex items-start gap-4 p-4 border rounded-lg",
                      !notification.isRead && "bg-muted/50"
                    )}
                  >
                    <div className={cn("mt-1", getSeverityColor(notification.severity))}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <span className="text-xs text-muted-foreground">
                          {notification.date.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium">Projected Income: ${notification.projectedIncome}</span>
                        <span className="text-xs">→</span>
                        <span className="text-xs font-medium">Projected Expenses: ${notification.projectedExpenses}</span>
                      </div>
                    </div>
                    {!notification.isRead && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
