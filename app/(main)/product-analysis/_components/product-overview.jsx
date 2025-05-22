'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts'
import { ArrowUpRight, ArrowDownRight, DollarSign, Package, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data - replace with real data from your API
const mockData = {
  totalSales: 125000,
  totalUnits: 2500,
  salesChange: 15.5,
  unitsChange: 8.2,
  monthlyTrend: Array.from({ length: 12 }, (_, i) => ({
    date: format(subMonths(new Date(), 11 - i), 'MMM yyyy'),
    sales: Math.floor(Math.random() * 50000) + 50000,
    units: Math.floor(Math.random() * 1000) + 500
  })),
  topProducts: [
    { name: 'Product A', revenue: 25000, units: 500, growth: 25 },
    { name: 'Product B', revenue: 20000, units: 400, growth: 15 },
    { name: 'Product C', revenue: 15000, units: 300, growth: -5 },
    { name: 'Product D', revenue: 10000, units: 200, growth: 10 },
    { name: 'Product E', revenue: 5000, units: 100, growth: 5 }
  ],
  categoryRevenue: [
    { category: 'Electronics', revenue: 50000 },
    { category: 'Clothing', revenue: 30000 },
    { category: 'Home', revenue: 20000 },
    { category: 'Sports', revenue: 15000 },
    { category: 'Other', revenue: 10000 }
  ]
}

export function ProductOverview() {
  const [period, setPeriod] = useState('12M')

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockData.totalSales.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {mockData.salesChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                "ml-1",
                mockData.salesChange >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {Math.abs(mockData.salesChange)}% from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalUnits.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {mockData.unitsChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                "ml-1",
                mockData.unitsChange >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {Math.abs(mockData.unitsChange)}% from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(mockData.totalSales / mockData.totalUnits).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per unit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((mockData.salesChange + mockData.unitsChange) / 2).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Combined sales & units
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Monthly Sales Trend</CardTitle>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3M">Last 3 Months</SelectItem>
                <SelectItem value="6M">Last 6 Months</SelectItem>
                <SelectItem value="12M">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                  yAxisId="left"
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Date
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].payload.date}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Sales
                              </span>
                              <span className="font-bold">
                                ${payload[0].value.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Units
                              </span>
                              <span className="font-bold">
                                {payload[1].value.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="#32AE4C"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="units"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Products and Category Revenue */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Products by Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.units} units
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ${product.revenue.toLocaleString()}
                      </p>
                      <p className={cn(
                        "text-xs",
                        product.growth >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.categoryRevenue}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="category" 
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
                                  Category
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].payload.category}
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
    </div>
  )
} 