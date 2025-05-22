'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Lightbulb, TrendingUp, Calendar, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts'

// Mock data - replace with real data from your API
const mockData = {
  forecast: {
    nextMonth: {
      predicted: 150000,
      confidence: 85,
      trend: 'up',
      factors: ['Seasonal demand', 'Marketing campaign', 'Price adjustment']
    },
    nextQuarter: {
      predicted: 450000,
      confidence: 75,
      trend: 'up',
      factors: ['Market expansion', 'New product launch', 'Holiday season']
    }
  },
  seasonality: [
    { month: 'Jan', sales: 100000, trend: 'up' },
    { month: 'Feb', sales: 120000, trend: 'up' },
    { month: 'Mar', sales: 150000, trend: 'up' },
    { month: 'Apr', sales: 130000, trend: 'down' },
    { month: 'May', sales: 140000, trend: 'up' },
    { month: 'Jun', sales: 160000, trend: 'up' },
    { month: 'Jul', sales: 170000, trend: 'up' },
    { month: 'Aug', sales: 165000, trend: 'down' },
    { month: 'Sep', sales: 180000, trend: 'up' },
    { month: 'Oct', sales: 200000, trend: 'up' },
    { month: 'Nov', sales: 250000, trend: 'up' },
    { month: 'Dec', sales: 300000, trend: 'up' }
  ],
  priceElasticity: [
    { product: 'Product A', elasticity: -1.2, recommendation: 'Increase price' },
    { product: 'Product B', elasticity: -0.8, recommendation: 'Maintain price' },
    { product: 'Product C', elasticity: -1.5, recommendation: 'Decrease price' }
  ],
  insights: [
    {
      type: 'seasonal',
      title: 'Holiday Season Impact',
      description: 'Sales typically increase by 40% during holiday season',
      impact: 'high',
      recommendation: 'Prepare inventory and marketing campaigns'
    },
    {
      type: 'trend',
      title: 'Growing Market Segment',
      description: 'Electronics category shows 25% YoY growth',
      impact: 'medium',
      recommendation: 'Expand product line in this category'
    },
    {
      type: 'anomaly',
      title: 'Price Sensitivity',
      description: 'Customers are more price-sensitive in Q2',
      impact: 'high',
      recommendation: 'Adjust pricing strategy for Q2'
    }
  ]
}

export function SalesTrends() {
  const [period, setPeriod] = useState('12M')
  const [view, setView] = useState('forecast')

  return (
    <div className="space-y-8">
      {/* Header with Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Sales Trends & Forecasts</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6M">Last 6 Months</SelectItem>
            <SelectItem value="12M">Last 12 Months</SelectItem>
            <SelectItem value="2Y">Last 2 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={view} onValueChange={setView} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forecast">
            <TrendingUp className="mr-2 h-4 w-4" />
            Forecast
          </TabsTrigger>
          <TabsTrigger value="seasonality">
            <Calendar className="mr-2 h-4 w-4" />
            Seasonality
          </TabsTrigger>
          <TabsTrigger value="elasticity">
            <Lightbulb className="mr-2 h-4 w-4" />
            Price Elasticity
          </TabsTrigger>
          <TabsTrigger value="insights">
            <AlertTriangle className="mr-2 h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Next Month Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Predicted Sales</span>
                    <span className="text-2xl font-bold">${mockData.forecast.nextMonth.predicted.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Confidence</span>
                    <span className="text-sm font-medium">{mockData.forecast.nextMonth.confidence}%</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Key Factors</span>
                    <div className="space-y-1">
                      {mockData.forecast.nextMonth.factors.map((factor, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Quarter Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Predicted Sales</span>
                    <span className="text-2xl font-bold">${mockData.forecast.nextQuarter.predicted.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Confidence</span>
                    <span className="text-sm font-medium">{mockData.forecast.nextQuarter.confidence}%</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Key Factors</span>
                    <div className="space-y-1">
                      {mockData.forecast.nextQuarter.factors.map((factor, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seasonality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Sales Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData.seasonality}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="month" 
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
                                    Month
                                  </span>
                                  <span className="font-bold text-muted-foreground">
                                    {payload[0].payload.month}
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
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#32AE4C"
                      fill="#32AE4C"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="elasticity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.priceElasticity.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-sm">{item.product}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Price Elasticity</span>
                      <span className="text-sm font-medium">{item.elasticity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Recommendation</span>
                      <Badge variant={item.recommendation === 'Increase price' ? 'default' : 'secondary'}>
                        {item.recommendation}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.insights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{insight.title}</CardTitle>
                    <Badge variant={insight.impact === 'high' ? 'default' : 'secondary'}>
                      {insight.impact} impact
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{insight.recommendation}</span>
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