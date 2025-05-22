'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, TrendingDown, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts'

// Mock data - replace with real data from your API
const mockData = {
  anomalies: [
    {
      type: 'sales_drop',
      product: 'Product A',
      severity: 'high',
      description: 'Unexpected 40% drop in sales',
      date: '2024-03-15',
      impact: 'Significant revenue loss',
      recommendation: 'Investigate marketing and pricing'
    },
    {
      type: 'inventory_risk',
      product: 'Product B',
      severity: 'medium',
      description: 'Low stock levels detected',
      date: '2024-03-14',
      impact: 'Potential stockout',
      recommendation: 'Increase order quantity'
    },
    {
      type: 'price_anomaly',
      product: 'Product C',
      severity: 'low',
      description: 'Price deviation from market average',
      date: '2024-03-13',
      impact: 'Reduced competitiveness',
      recommendation: 'Review pricing strategy'
    }
  ],
  salesTrend: [
    { date: '2024-03-01', sales: 100000, threshold: 120000 },
    { date: '2024-03-02', sales: 110000, threshold: 120000 },
    { date: '2024-03-03', sales: 105000, threshold: 120000 },
    { date: '2024-03-04', sales: 95000, threshold: 120000 },
    { date: '2024-03-05', sales: 90000, threshold: 120000 },
    { date: '2024-03-06', sales: 85000, threshold: 120000 },
    { date: '2024-03-07', sales: 80000, threshold: 120000 }
  ],
  inventoryRisks: [
    {
      product: 'Product A',
      currentStock: 50,
      minThreshold: 100,
      daysUntilStockout: 5,
      recommendation: 'Urgent reorder needed'
    },
    {
      product: 'Product B',
      currentStock: 75,
      minThreshold: 50,
      daysUntilStockout: 10,
      recommendation: 'Monitor closely'
    },
    {
      product: 'Product C',
      currentStock: 30,
      minThreshold: 100,
      daysUntilStockout: 3,
      recommendation: 'Immediate action required'
    }
  ],
  marketRisks: [
    {
      type: 'competitor_price',
      description: 'Competitor lowered prices by 15%',
      impact: 'high',
      affectedProducts: ['Product A', 'Product B'],
      recommendation: 'Review pricing strategy'
    },
    {
      type: 'market_trend',
      description: 'Declining market demand',
      impact: 'medium',
      affectedProducts: ['Product C'],
      recommendation: 'Diversify product line'
    },
    {
      type: 'seasonal_risk',
      description: 'Seasonal demand shift',
      impact: 'low',
      affectedProducts: ['Product D'],
      recommendation: 'Adjust inventory levels'
    }
  ]
}

export function AnomalyDetection() {
  const [period, setPeriod] = useState('7D')
  const [view, setView] = useState('overview')

  return (
    <div className="space-y-8">
      {/* Header with Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Anomaly Detection</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7D">Last 7 Days</SelectItem>
            <SelectItem value="30D">Last 30 Days</SelectItem>
            <SelectItem value="90D">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={view} onValueChange={setView} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="sales">
            <TrendingDown className="mr-2 h-4 w-4" />
            Sales Anomalies
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <AlertCircle className="mr-2 h-4 w-4" />
            Inventory Risks
          </TabsTrigger>
          <TabsTrigger value="market">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Market Risks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Anomalies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.anomalies.map((anomaly, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={cn(
                        "mt-1 h-2 w-2 rounded-full",
                        anomaly.severity === 'high' ? "bg-red-500" :
                        anomaly.severity === 'medium' ? "bg-yellow-500" :
                        "bg-blue-500"
                      )} />
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{anomaly.product}</p>
                          <Badge variant={anomaly.severity === 'high' ? 'destructive' : 'secondary'}>
                            {anomaly.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                        <p className="text-xs text-muted-foreground">{anomaly.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.salesTrend}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="date" 
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
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <ReferenceLine 
                        y={mockData.salesTrend[0].threshold} 
                        stroke="#ef4444" 
                        strokeDasharray="3 3" 
                        label="Threshold" 
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#32AE4C"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.anomalies.map((anomaly, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{anomaly.product}</CardTitle>
                    <Badge variant={anomaly.severity === 'high' ? 'destructive' : 'secondary'}>
                      {anomaly.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <span className="text-sm font-medium">{anomaly.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Date</span>
                      <span className="text-sm font-medium">{anomaly.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Impact</span>
                      <span className="text-sm font-medium">{anomaly.impact}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Recommendation</span>
                      <span className="text-sm font-medium">{anomaly.recommendation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.inventoryRisks.map((risk, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{risk.product}</CardTitle>
                    <Badge variant={risk.daysUntilStockout <= 5 ? 'destructive' : 'secondary'}>
                      {risk.daysUntilStockout} days
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Stock</span>
                      <span className="text-sm font-medium">{risk.currentStock}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Min Threshold</span>
                      <span className="text-sm font-medium">{risk.minThreshold}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Days Until Stockout</span>
                      <span className="text-sm font-medium">{risk.daysUntilStockout}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Recommendation</span>
                      <span className="text-sm font-medium">{risk.recommendation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockData.marketRisks.map((risk, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{risk.type}</CardTitle>
                    <Badge variant={risk.impact === 'high' ? 'destructive' : 'secondary'}>
                      {risk.impact}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Description</span>
                      <span className="text-sm font-medium">{risk.description}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Affected Products</span>
                      <span className="text-sm font-medium">{risk.affectedProducts.join(', ')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Recommendation</span>
                      <span className="text-sm font-medium">{risk.recommendation}</span>
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