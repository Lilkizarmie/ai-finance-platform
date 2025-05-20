"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, DollarSign, Calendar, BarChart2, PieChart } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data - replace with actual data fetching
const mockData = {
  revenueSources: [
    {
      id: 1,
      name: 'Product Sales',
      amount: 450000,
      percentage: 45,
      trend: 'up',
      change: 12,
      details: [
        { name: 'Enterprise', value: 250000 },
        { name: 'SMB', value: 150000 },
        { name: 'Individual', value: 50000 }
      ]
    },
    {
      id: 2,
      name: 'Subscription Services',
      amount: 300000,
      percentage: 30,
      trend: 'up',
      change: 8,
      details: [
        { name: 'Monthly', value: 180000 },
        { name: 'Annual', value: 120000 }
      ]
    },
    {
      id: 3,
      name: 'Consulting',
      amount: 150000,
      percentage: 15,
      trend: 'down',
      change: 5,
      details: [
        { name: 'Strategy', value: 80000 },
        { name: 'Implementation', value: 70000 }
      ]
    },
    {
      id: 4,
      name: 'Other Revenue',
      amount: 100000,
      percentage: 10,
      trend: 'up',
      change: 3,
      details: [
        { name: 'Training', value: 60000 },
        { name: 'Support', value: 40000 }
      ]
    }
  ],
  expenseCategories: [
    {
      id: 1,
      name: 'Personnel',
      amount: 400000,
      percentage: 40,
      trend: 'up',
      change: 15,
      details: [
        { name: 'Salaries', value: 300000 },
        { name: 'Benefits', value: 80000 },
        { name: 'Training', value: 20000 }
      ]
    },
    {
      id: 2,
      name: 'Operations',
      amount: 200000,
      percentage: 20,
      trend: 'down',
      change: 5,
      details: [
        { name: 'Office Space', value: 120000 },
        { name: 'Utilities', value: 50000 },
        { name: 'Equipment', value: 30000 }
      ]
    },
    {
      id: 3,
      name: 'Marketing',
      amount: 150000,
      percentage: 15,
      trend: 'up',
      change: 20,
      details: [
        { name: 'Digital', value: 90000 },
        { name: 'Events', value: 40000 },
        { name: 'Content', value: 20000 }
      ]
    },
    {
      id: 4,
      name: 'Technology',
      amount: 100000,
      percentage: 10,
      trend: 'up',
      change: 25,
      details: [
        { name: 'Software', value: 60000 },
        { name: 'Infrastructure', value: 40000 }
      ]
    },
    {
      id: 5,
      name: 'Other Expenses',
      amount: 150000,
      percentage: 15,
      trend: 'stable',
      change: 0,
      details: [
        { name: 'Travel', value: 80000 },
        { name: 'Professional Services', value: 70000 }
      ]
    }
  ],
  seasonality: {
    monthly: [
      { month: 'Jan', revenue: 85000, expenses: 75000 },
      { month: 'Feb', revenue: 82000, expenses: 78000 },
      { month: 'Mar', revenue: 90000, expenses: 80000 },
      { month: 'Apr', revenue: 95000, expenses: 82000 },
      { month: 'May', revenue: 88000, expenses: 81000 },
      { month: 'Jun', revenue: 92000, expenses: 83000 },
      { month: 'Jul', revenue: 85000, expenses: 82000 },
      { month: 'Aug', revenue: 89000, expenses: 81000 },
      { month: 'Sep', revenue: 95000, expenses: 83000 },
      { month: 'Oct', revenue: 100000, expenses: 85000 },
      { month: 'Nov', revenue: 110000, expenses: 90000 },
      { month: 'Dec', revenue: 120000, expenses: 95000 }
    ],
    quarterly: [
      { quarter: 'Q1', revenue: 257000, expenses: 233000 },
      { quarter: 'Q2', revenue: 275000, expenses: 246000 },
      { quarter: 'Q3', revenue: 269000, expenses: 246000 },
      { quarter: 'Q4', revenue: 330000, expenses: 270000 }
    ]
  },
  keyDrivers: [
    {
      id: 1,
      name: 'Customer Acquisition',
      impact: 'high',
      trend: 'up',
      metrics: [
        { name: 'New Customers', value: 150, change: 15 },
        { name: 'Conversion Rate', value: '3.2%', change: 0.5 },
        { name: 'CAC', value: 2500, change: -200 }
      ]
    },
    {
      id: 2,
      name: 'Product Performance',
      impact: 'high',
      trend: 'up',
      metrics: [
        { name: 'Active Users', value: 2500, change: 300 },
        { name: 'Retention Rate', value: '85%', change: 5 },
        { name: 'Feature Usage', value: '78%', change: 8 }
      ]
    },
    {
      id: 3,
      name: 'Market Conditions',
      impact: 'medium',
      trend: 'stable',
      metrics: [
        { name: 'Market Growth', value: '12%', change: 2 },
        { name: 'Competition Level', value: 'Medium', change: 0 },
        { name: 'Market Share', value: '15%', change: 1 }
      ]
    },
    {
      id: 4,
      name: 'Operational Efficiency',
      impact: 'medium',
      trend: 'up',
      metrics: [
        { name: 'Cost per Unit', value: 150, change: -10 },
        { name: 'Delivery Time', value: '2.5 days', change: -0.5 },
        { name: 'Quality Score', value: '92%', change: 3 }
      ]
    }
  ]
}

export default function ExplainerPage() {
  const [activeTab, setActiveTab] = useState('revenue')

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case 'down':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-red-500'
      case 'medium':
        return 'text-yellow-500'
      case 'low':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financial Analysis</h1>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Revenue Sources
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Expense Categories
          </TabsTrigger>
          <TabsTrigger value="seasonality" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Seasonality
          </TabsTrigger>
          <TabsTrigger value="drivers" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Key Drivers
          </TabsTrigger>
        </TabsList>

        {/* Revenue Sources */}
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>
                Detailed analysis of revenue sources and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockData.revenueSources.map((source) => (
                  <div key={source.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{source.name}</p>
                        <p className="text-2xl font-bold">${source.amount.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {source.percentage}% of total
                        </span>
                        {getTrendIcon(source.trend)}
                        <span className={cn(
                          "text-sm",
                          source.trend === 'up' ? "text-green-500" : "text-red-500"
                        )}>
                          {source.change}%
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      {source.details.map((detail, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <p className="text-sm font-medium">{detail.name}</p>
                          <p className="text-lg font-semibold">${detail.value.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expense Categories */}
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of expense categories and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockData.expenseCategories.map((category) => (
                  <div key={category.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{category.name}</p>
                        <p className="text-2xl font-bold">${category.amount.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {category.percentage}% of total
                        </span>
                        {getTrendIcon(category.trend)}
                        <span className={cn(
                          "text-sm",
                          category.trend === 'up' ? "text-red-500" : "text-green-500"
                        )}>
                          {category.change}%
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      {category.details.map((detail, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <p className="text-sm font-medium">{detail.name}</p>
                          <p className="text-lg font-semibold">${detail.value.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seasonality Analysis */}
        <TabsContent value="seasonality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Patterns</CardTitle>
              <CardDescription>
                Analysis of revenue and expense patterns throughout the year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {mockData.seasonality.monthly.map((month) => (
                      <div key={month.month} className="p-4 border rounded-lg">
                        <p className="text-sm font-medium">{month.month}</p>
                        <div className="mt-2 space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                            <p className="text-lg font-semibold">${month.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Expenses</p>
                            <p className="text-lg font-semibold">${month.expenses.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Net</p>
                            <p className={cn(
                              "text-lg font-semibold",
                              month.revenue - month.expenses >= 0 ? "text-green-500" : "text-red-500"
                            )}>
                              ${(month.revenue - month.expenses).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quarterly Overview</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    {mockData.seasonality.quarterly.map((quarter) => (
                      <div key={quarter.quarter} className="p-4 border rounded-lg">
                        <p className="text-sm font-medium">{quarter.quarter}</p>
                        <div className="mt-2 space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                            <p className="text-lg font-semibold">${quarter.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Expenses</p>
                            <p className="text-lg font-semibold">${quarter.expenses.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Net</p>
                            <p className={cn(
                              "text-lg font-semibold",
                              quarter.revenue - quarter.expenses >= 0 ? "text-green-500" : "text-red-500"
                            )}>
                              ${(quarter.revenue - quarter.expenses).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Key Drivers */}
        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Financial Drivers</CardTitle>
              <CardDescription>
                Analysis of factors influencing financial performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockData.keyDrivers.map((driver) => (
                  <div key={driver.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{driver.name}</p>
                        <p className={cn("text-sm", getImpactColor(driver.impact))}>
                          {driver.impact.charAt(0).toUpperCase() + driver.impact.slice(1)} Impact
                        </p>
                      </div>
                      {getTrendIcon(driver.trend)}
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      {driver.metrics.map((metric, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <p className="text-sm font-medium">{metric.name}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold">{metric.value}</p>
                            {metric.change !== 0 && (
                              <span className={cn(
                                "text-sm",
                                metric.change > 0 ? "text-green-500" : "text-red-500"
                              )}>
                                {metric.change > 0 ? '+' : ''}{metric.change}%
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
