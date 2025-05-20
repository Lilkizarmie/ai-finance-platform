"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function FinancialMetrics({ transactions, accounts }) {
  // Calculate current cash balance
  const currentBalance = accounts.reduce((total, account) => total + account.balance, 0)

  // Calculate monthly profit/loss
  const currentDate = new Date()
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const monthlyTransactions = transactions.filter(t => new Date(t.date) >= startOfMonth)
  
  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const monthlyExpenses = monthlyTransactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const monthlyProfit = monthlyIncome - monthlyExpenses

  // Calculate quarterly profit/loss
  const startOfQuarter = new Date(currentDate.getFullYear(), Math.floor(currentDate.getMonth() / 3) * 3, 1)
  const quarterlyTransactions = transactions.filter(t => new Date(t.date) >= startOfQuarter)
  
  const quarterlyIncome = quarterlyTransactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const quarterlyExpenses = quarterlyTransactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const quarterlyProfit = quarterlyIncome - quarterlyExpenses

  // Calculate financial health score (simplified version)
  const calculateHealthScore = () => {
    const savingsRate = monthlyIncome > 0 ? (monthlyIncome - monthlyExpenses) / monthlyIncome : 0
    const expenseRatio = monthlyIncome > 0 ? monthlyExpenses / monthlyIncome : 1
    
    let score = 0
    if (savingsRate > 0.2) score += 40 // Good savings rate
    if (savingsRate > 0.1) score += 20 // Decent savings rate
    if (expenseRatio < 0.7) score += 20 // Good expense control
    if (expenseRatio < 0.9) score += 10 // Decent expense control
    if (monthlyProfit > 0) score += 10 // Positive monthly profit
    
    return Math.min(100, score)
  }

  const healthScore = calculateHealthScore()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Current Cash Balance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${currentBalance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Across all accounts
          </p>
        </CardContent>
      </Card>

      {/* Monthly Profit/Loss */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly P/L</CardTitle>
          {monthlyProfit >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={cn(
            "text-2xl font-bold",
            monthlyProfit >= 0 ? "text-green-500" : "text-red-500"
          )}>
            ${Math.abs(monthlyProfit).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {monthlyProfit >= 0 ? "Profit" : "Loss"} this month
          </p>
        </CardContent>
      </Card>

      {/* Quarterly Profit/Loss */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quarterly P/L</CardTitle>
          {quarterlyProfit >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={cn(
            "text-2xl font-bold",
            quarterlyProfit >= 0 ? "text-green-500" : "text-red-500"
          )}>
            ${Math.abs(quarterlyProfit).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {quarterlyProfit >= 0 ? "Profit" : "Loss"} this quarter
          </p>
        </CardContent>
      </Card>

      {/* Financial Health Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Financial Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{healthScore}</div>
          <div className="w-full bg-secondary h-2 rounded-full mt-2">
            <div 
              className={cn(
                "h-2 rounded-full",
                healthScore >= 80 ? "bg-green-500" :
                healthScore >= 60 ? "bg-yellow-500" :
                "bg-red-500"
              )}
              style={{ width: `${healthScore}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {healthScore >= 80 ? "Excellent" :
             healthScore >= 60 ? "Good" :
             healthScore >= 40 ? "Fair" :
             "Needs Attention"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 