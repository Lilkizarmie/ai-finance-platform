"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { TrendingUp, TrendingDown, DollarSign, Calculator, BarChart2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data - replace with actual data fetching
const mockData = {
  cashRunway: {
    currentBurn: 150000,
    cashBalance: 1125000,
    monthsRemaining: 7.5,
    scenarios: [
      {
        id: 1,
        name: 'Expenses Drop 10%',
        newBurn: 135000,
        monthsRemaining: 8.3
      },
      {
        id: 2,
        name: 'Expenses Drop 20%',
        newBurn: 120000,
        monthsRemaining: 9.4
      },
      {
        id: 3,
        name: 'Revenue Increase 15%',
        newBurn: 127500,
        monthsRemaining: 8.8
      }
    ]
  },
  fundingNeeds: {
    currentProjection: {
      monthsToFunding: 4,
      amountNeeded: 500000,
      confidence: 'high',
      factors: [
        'Current burn rate',
        'Revenue growth',
        'Market conditions'
      ]
    },
    scenarios: [
      {
        id: 1,
        name: 'Aggressive Growth',
        monthsToFunding: 3,
        amountNeeded: 750000,
        confidence: 'medium'
      },
      {
        id: 2,
        name: 'Conservative Growth',
        monthsToFunding: 6,
        amountNeeded: 300000,
        confidence: 'high'
      }
    ]
  },
  scenarioPlanning: {
    currentMetrics: {
      revenue: 1000000,
      expenses: 800000,
      payroll: 400000,
      marketing: 150000,
      other: 250000
    },
    scenarios: [
      {
        id: 1,
        name: 'Revenue Drop 20%',
        changes: {
          revenue: -20,
          expenses: 0,
          payroll: 0,
          marketing: -10,
          other: -5
        }
      },
      {
        id: 2,
        name: 'Payroll Increase 15%',
        changes: {
          revenue: 0,
          expenses: 0,
          payroll: 15,
          marketing: 0,
          other: 0
        }
      }
    ]
  },
  budgetVsActual: {
    categories: [
      {
        id: 1,
        name: 'Payroll',
        budgeted: 400000,
        actual: 420000,
        variance: 5,
        status: 'over'
      },
      {
        id: 2,
        name: 'Marketing',
        budgeted: 150000,
        actual: 135000,
        variance: -10,
        status: 'under'
      },
      {
        id: 3,
        name: 'Office Expenses',
        budgeted: 50000,
        actual: 48000,
        variance: -4,
        status: 'under'
      },
      {
        id: 4,
        name: 'Software & Tools',
        budgeted: 30000,
        actual: 35000,
        variance: 16.7,
        status: 'over'
      }
    ],
    total: {
      budgeted: 630000,
      actual: 638000,
      variance: 1.3,
      status: 'over'
    }
  }
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState('runway')
  const [scenarioValues, setScenarioValues] = useState({
    revenue: 0,
    expenses: 0,
    payroll: 0,
    marketing: 0,
    other: 0
  })

  const getVarianceColor = (variance, type) => {
    if (type === 'expense') {
      return variance > 0 ? 'text-red-500' : 'text-green-500'
    }
    return variance > 0 ? 'text-green-500' : 'text-red-500'
  }

  const getVarianceIcon = (variance, type) => {
    if (type === 'expense') {
      return variance > 0 ? <TrendingUp className="h-4 w-4 text-red-500" /> : <TrendingDown className="h-4 w-4 text-green-500" />
    }
    return variance > 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />
  }

  const handleScenarioChange = (value, metric) => {
    setScenarioValues(prev => ({
      ...prev,
      [metric]: value
    }))
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financial Tools</h1>
      </div>

      <Tabs defaultValue="runway" className="space-y-4">
        <TabsList>
          <TabsTrigger value="runway" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Cash Runway
          </TabsTrigger>
          <TabsTrigger value="funding" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Funding Needs
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Scenario Planning
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Budget vs Actual
          </TabsTrigger>
        </TabsList>

        {/* Cash Runway */}
        <TabsContent value="runway" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Runway Analysis</CardTitle>
              <CardDescription>
                Current burn rate and cash position analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium">Current Burn Rate</p>
                    <p className="text-2xl font-bold">${mockData.cashRunway.currentBurn.toLocaleString()}/mo</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium">Cash Balance</p>
                    <p className="text-2xl font-bold">${mockData.cashRunway.cashBalance.toLocaleString()}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium">Months Remaining</p>
                    <p className="text-2xl font-bold">{mockData.cashRunway.monthsRemaining}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Scenario Analysis</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {mockData.cashRunway.scenarios.map((scenario) => (
                      <div key={scenario.id} className="p-4 border rounded-lg">
                        <p className="text-sm font-medium">{scenario.name}</p>
                        <div className="mt-2 space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">New Burn Rate</p>
                            <p className="text-lg font-semibold">${scenario.newBurn.toLocaleString()}/mo</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Months Remaining</p>
                            <p className="text-lg font-semibold">{scenario.monthsRemaining}</p>
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

        {/* Funding Needs */}
        <TabsContent value="funding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Funding Need Estimator</CardTitle>
              <CardDescription>
                AI-powered funding requirement analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Next Funding Round</p>
                      <p className="text-2xl font-bold">{mockData.fundingNeeds.currentProjection.monthsToFunding} months</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Amount Needed</p>
                      <p className="text-2xl font-bold">${mockData.fundingNeeds.currentProjection.amountNeeded.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Key Factors:</p>
                    <ul className="mt-2 space-y-1">
                      {mockData.fundingNeeds.currentProjection.factors.map((factor, index) => (
                        <li key={index} className="text-sm text-muted-foreground">• {factor}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Alternative Scenarios</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {mockData.fundingNeeds.scenarios.map((scenario) => (
                      <div key={scenario.id} className="p-4 border rounded-lg">
                        <p className="text-sm font-medium">{scenario.name}</p>
                        <div className="mt-2 space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Months to Funding</p>
                            <p className="text-lg font-semibold">{scenario.monthsToFunding}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Amount Needed</p>
                            <p className="text-lg font-semibold">${scenario.amountNeeded.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Confidence</p>
                            <p className="text-sm font-medium capitalize">{scenario.confidence}</p>
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

        {/* Scenario Planning */}
        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Planning</CardTitle>
              <CardDescription>
                Adjust metrics to see impact on financials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Revenue Change (%)</label>
                      <Slider
                        value={[scenarioValues.revenue]}
                        onValueChange={(value) => handleScenarioChange(value[0], 'revenue')}
                        min={-50}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-muted-foreground">-50%</span>
                        <span className="text-sm font-medium">{scenarioValues.revenue}%</span>
                        <span className="text-sm text-muted-foreground">+50%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Payroll Change (%)</label>
                      <Slider
                        value={[scenarioValues.payroll]}
                        onValueChange={(value) => handleScenarioChange(value[0], 'payroll')}
                        min={-20}
                        max={30}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-muted-foreground">-20%</span>
                        <span className="text-sm font-medium">{scenarioValues.payroll}%</span>
                        <span className="text-sm text-muted-foreground">+30%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Marketing Change (%)</label>
                      <Slider
                        value={[scenarioValues.marketing]}
                        onValueChange={(value) => handleScenarioChange(value[0], 'marketing')}
                        min={-50}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-muted-foreground">-50%</span>
                        <span className="text-sm font-medium">{scenarioValues.marketing}%</span>
                        <span className="text-sm text-muted-foreground">+50%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Scenario Impact</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">New Revenue</p>
                        <p className="text-lg font-semibold">
                          ${(mockData.scenarioPlanning.currentMetrics.revenue * (1 + scenarioValues.revenue / 100)).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">New Payroll</p>
                        <p className="text-lg font-semibold">
                          ${(mockData.scenarioPlanning.currentMetrics.payroll * (1 + scenarioValues.payroll / 100)).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">New Marketing</p>
                        <p className="text-lg font-semibold">
                          ${(mockData.scenarioPlanning.currentMetrics.marketing * (1 + scenarioValues.marketing / 100)).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Projected Profit/Loss</p>
                        <p className={cn(
                          "text-lg font-semibold",
                          getVarianceColor(
                            (mockData.scenarioPlanning.currentMetrics.revenue * (1 + scenarioValues.revenue / 100)) -
                            (mockData.scenarioPlanning.currentMetrics.expenses * (1 + scenarioValues.expenses / 100))
                          )
                        )}>
                          ${((mockData.scenarioPlanning.currentMetrics.revenue * (1 + scenarioValues.revenue / 100)) -
                            (mockData.scenarioPlanning.currentMetrics.expenses * (1 + scenarioValues.expenses / 100))).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget vs Actual */}
        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual</CardTitle>
              <CardDescription>
                Track spending against budget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {mockData.budgetVsActual.categories.map((category) => (
                    <div key={category.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{category.name}</p>
                        <div className="flex items-center gap-2">
                          {getVarianceIcon(category.variance, 'expense')}
                          <span className={cn(
                            "text-sm",
                            getVarianceColor(category.variance, 'expense')
                          )}>
                            {category.variance > 0 ? '+' : ''}{category.variance}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Budgeted</p>
                          <p className="text-lg font-semibold">${category.budgeted.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Actual</p>
                          <p className="text-lg font-semibold">${category.actual.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Total Variance</p>
                    <div className="flex items-center gap-2">
                      {getVarianceIcon(mockData.budgetVsActual.total.variance, 'expense')}
                      <span className={cn(
                        "text-sm",
                        getVarianceColor(mockData.budgetVsActual.total.variance, 'expense')
                      )}>
                        {mockData.budgetVsActual.total.variance > 0 ? '+' : ''}{mockData.budgetVsActual.total.variance}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Budgeted</p>
                      <p className="text-lg font-semibold">${mockData.budgetVsActual.total.budgeted.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Actual</p>
                      <p className="text-lg font-semibold">${mockData.budgetVsActual.total.actual.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 