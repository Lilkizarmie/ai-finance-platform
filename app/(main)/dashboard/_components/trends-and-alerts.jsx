"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function TrendsAndAlerts({ transactions }) {
  // Calculate spending vs income trends
  const currentDate = new Date()
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(currentDate)
    date.setMonth(date.getMonth() - i)
    return date
  }).reverse()

  const monthlyData = lastSixMonths.map(date => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    
    const monthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate >= startOfMonth && transactionDate <= endOfMonth
    })

    const income = monthTransactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = monthTransactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      month: date.toLocaleString('default', { month: 'short' }),
      income,
      expenses
    }
  })

  // Calculate AI alerts
  const calculateAlerts = () => {
    const alerts = []
    
    // Check for spending spikes
    const currentMonthExpenses = monthlyData[monthlyData.length - 1].expenses
    const previousMonthExpenses = monthlyData[monthlyData.length - 2].expenses
    const expenseChange = ((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100
    
    if (expenseChange > 20) {
      alerts.push({
        type: 'warning',
        message: `Spending increased by ${expenseChange.toFixed(1)}% compared to last month`
      })
    }

    // Check for low savings rate
    const currentMonthIncome = monthlyData[monthlyData.length - 1].income
    const savingsRate = currentMonthIncome > 0 
      ? ((currentMonthIncome - currentMonthExpenses) / currentMonthIncome) * 100 
      : 0
    
    if (savingsRate < 10) {
      alerts.push({
        type: 'warning',
        message: `Low savings rate of ${savingsRate.toFixed(1)}% this month`
      })
    }

    // Check for income decline
    const previousMonthIncome = monthlyData[monthlyData.length - 2].income
    const incomeChange = ((currentMonthIncome - previousMonthIncome) / previousMonthIncome) * 100
    
    if (incomeChange < -10) {
      alerts.push({
        type: 'warning',
        message: `Income decreased by ${Math.abs(incomeChange).toFixed(1)}% compared to last month`
      })
    }

    return alerts
  }

  const alerts = calculateAlerts()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Spending vs Income Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-normal">Spending vs Income Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">${data.income.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-red-500">${data.expenses.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-normal">AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No alerts at this time</p>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 