'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, DollarSign, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data - replace with real data from your API
const mockData = {
  topPerformers: [
    {
      name: 'Product A',
      revenue: 25000,
      units: 500,
      growth: 25,
      margin: 45,
      category: 'Electronics'
    },
    {
      name: 'Product B',
      revenue: 20000,
      units: 400,
      growth: 15,
      margin: 35,
      category: 'Clothing'
    },
    {
      name: 'Product C',
      revenue: 15000,
      units: 300,
      growth: 10,
      margin: 40,
      category: 'Home'
    }
  ],
  lowPerformers: [
    {
      name: 'Product X',
      revenue: 5000,
      units: 100,
      growth: -15,
      margin: 20,
      category: 'Electronics'
    },
    {
      name: 'Product Y',
      revenue: 3000,
      units: 50,
      growth: -10,
      margin: 15,
      category: 'Clothing'
    },
    {
      name: 'Product Z',
      revenue: 2000,
      units: 30,
      growth: -5,
      margin: 25,
      category: 'Home'
    }
  ],
  highMarginProducts: [
    {
      name: 'Product A',
      revenue: 25000,
      margin: 45,
      growth: 25,
      category: 'Electronics'
    },
    {
      name: 'Product C',
      revenue: 15000,
      margin: 40,
      growth: 10,
      category: 'Home'
    },
    {
      name: 'Product B',
      revenue: 20000,
      margin: 35,
      growth: 15,
      category: 'Clothing'
    }
  ],
  fastestGrowing: [
    {
      name: 'Product A',
      growth: 25,
      revenue: 25000,
      units: 500,
      category: 'Electronics'
    },
    {
      name: 'Product B',
      growth: 15,
      revenue: 20000,
      units: 400,
      category: 'Clothing'
    },
    {
      name: 'Product C',
      growth: 10,
      revenue: 15000,
      units: 300,
      category: 'Home'
    }
  ]
}

export function PerformanceMetrics() {
  const [period, setPeriod] = useState('30D')
  const [view, setView] = useState('top')

  return (
    <div className="space-y-8">
      {/* Header with Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Performance Metrics</h2>
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

      {/* Performance Tabs */}
      <Tabs value={view} onValueChange={setView} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="top">
            <TrendingUp className="mr-2 h-4 w-4" />
            Top Performers
          </TabsTrigger>
          <TabsTrigger value="low">
            <TrendingDown className="mr-2 h-4 w-4" />
            Low Performers
          </TabsTrigger>
          <TabsTrigger value="margin">
            <DollarSign className="mr-2 h-4 w-4" />
            High Margin
          </TabsTrigger>
          <TabsTrigger value="growth">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Fastest Growing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="top" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.topPerformers.map((product, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
                  <Badge variant="secondary">{product.category}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="text-sm font-medium">${product.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Units Sold</span>
                      <span className="text-sm font-medium">{product.units}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className={cn(
                        "text-sm font-medium",
                        product.growth >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Margin</span>
                      <span className="text-sm font-medium">{product.margin}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="low" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.lowPerformers.map((product, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
                  <Badge variant="secondary">{product.category}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="text-sm font-medium">${product.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Units Sold</span>
                      <span className="text-sm font-medium">{product.units}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className={cn(
                        "text-sm font-medium",
                        product.growth >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Margin</span>
                      <span className="text-sm font-medium">{product.margin}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="margin" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.highMarginProducts.map((product, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
                  <Badge variant="secondary">{product.category}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="text-sm font-medium">${product.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Margin</span>
                      <span className="text-sm font-medium">{product.margin}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className={cn(
                        "text-sm font-medium",
                        product.growth >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.fastestGrowing.map((product, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
                  <Badge variant="secondary">{product.category}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className={cn(
                        "text-sm font-medium",
                        product.growth >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="text-sm font-medium">${product.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Units Sold</span>
                      <span className="text-sm font-medium">{product.units}</span>
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