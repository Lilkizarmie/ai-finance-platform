'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Users, ShoppingCart, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

// Mock data - replace with real data from your API
const mockData = {
  customerMetrics: {
    totalCustomers: 5000,
    newCustomers: 250,
    repeatCustomers: 3500,
    averageOrderValue: 150,
    customerGrowth: 15,
    repeatPurchaseRate: 70
  },
  purchaseFrequency: [
    { frequency: '1-2 times', customers: 1500 },
    { frequency: '3-5 times', customers: 2000 },
    { frequency: '6-10 times', customers: 1000 },
    { frequency: '10+ times', customers: 500 }
  ],
  customerSegments: [
    { segment: 'High Value', customers: 1000, revenue: 300000 },
    { segment: 'Medium Value', customers: 2500, revenue: 250000 },
    { segment: 'Low Value', customers: 1500, revenue: 50000 }
  ],
  productBundles: [
    {
      bundle: 'Electronics + Accessories',
      frequency: 1200,
      averageValue: 250,
      growth: 25
    },
    {
      bundle: 'Clothing + Shoes',
      frequency: 800,
      averageValue: 180,
      growth: 15
    },
    {
      bundle: 'Home + Kitchen',
      frequency: 600,
      averageValue: 200,
      growth: 20
    }
  ],
  customerBehavior: [
    {
      pattern: 'Weekend Shoppers',
      percentage: 45,
      averageSpend: 200,
      peakHours: '14:00-18:00'
    },
    {
      pattern: 'Early Morning',
      percentage: 20,
      averageSpend: 150,
      peakHours: '08:00-10:00'
    },
    {
      pattern: 'Late Night',
      percentage: 35,
      averageSpend: 180,
      peakHours: '20:00-23:00'
    }
  ]
}

const COLORS = ['#32AE4C', '#3b82f6', '#f59e0b', '#ef4444']

export function CustomerInsights() {
  const [period, setPeriod] = useState('30D')
  const [view, setView] = useState('overview')

  return (
    <div className="space-y-8">
      {/* Header with Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Customer Insights</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7D">Last 7 Days</SelectItem>
            <SelectItem value="30D">Last 30 Days</SelectItem>
            <SelectItem value="90D">Last 90 Days</SelectItem>
            <SelectItem value="1Y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.customerMetrics.totalCustomers.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 ml-1">
                {mockData.customerMetrics.customerGrowth}% growth
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repeat Customers</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.customerMetrics.repeatCustomers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {mockData.customerMetrics.repeatPurchaseRate}% repeat rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.customerMetrics.newCustomers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              This period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockData.customerMetrics.averageOrderValue}</div>
            <div className="text-xs text-muted-foreground">
              Per customer
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={view} onValueChange={setView} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <Users className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="segments">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Segments
          </TabsTrigger>
          <TabsTrigger value="bundles">
            <Package className="mr-2 h-4 w-4" />
            Bundles
          </TabsTrigger>
          <TabsTrigger value="behavior">
            <TrendingUp className="mr-2 h-4 w-4" />
            Behavior
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockData.purchaseFrequency}
                        dataKey="customers"
                        nameKey="frequency"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {mockData.purchaseFrequency.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.customerSegments}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="segment" 
                        className="text-xs"
                        tick={{ fill: 'currentColor' }}
                      />
                      <YAxis 
                        className="text-xs"
                        tick={{ fill: 'currentColor' }}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Segment
                                    </span>
                                    <span className="font-bold text-muted-foreground">
                                      {payload[0].payload.segment}
                                    </span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Revenue
                                    </span>
                                    <span className="font-bold">
                                      ${payload[0].value.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="revenue" fill="#32AE4C" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.customerSegments.map((segment, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-sm">{segment.segment}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Customers</span>
                      <span className="text-sm font-medium">{segment.customers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="text-sm font-medium">${segment.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Average Value</span>
                      <span className="text-sm font-medium">
                        ${(segment.revenue / segment.customers).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bundles" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.productBundles.map((bundle, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-sm">{bundle.bundle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Frequency</span>
                      <span className="text-sm font-medium">{bundle.frequency.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Average Value</span>
                      <span className="text-sm font-medium">${bundle.averageValue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className={cn(
                        "text-sm font-medium",
                        bundle.growth >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {bundle.growth >= 0 ? '+' : ''}{bundle.growth}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.customerBehavior.map((pattern, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-sm">{pattern.pattern}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Percentage</span>
                      <span className="text-sm font-medium">{pattern.percentage}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Average Spend</span>
                      <span className="text-sm font-medium">${pattern.averageSpend}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Peak Hours</span>
                      <span className="text-sm font-medium">{pattern.peakHours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 