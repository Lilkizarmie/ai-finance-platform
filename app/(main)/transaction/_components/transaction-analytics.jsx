import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"

export function TransactionAnalytics({ transactions }) {
  // Calculate profitability trends
  const calculateProfitabilityTrends = () => {
    const currentDate = new Date()
    const lastThreeMonths = Array.from({ length: 3 }, (_, i) => {
      const date = new Date(currentDate)
      date.setMonth(date.getMonth() - i)
      return date
    }).reverse()

    return lastThreeMonths.map(date => {
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
        profit: income - expenses,
        profitMargin: income > 0 ? ((income - expenses) / income) * 100 : 0
      }
    })
  }

  // Detect expense anomalies
  const detectExpenseAnomalies = () => {
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate >= startOfMonth
    })

    // Group expenses by category
    const categoryExpenses = currentMonthTransactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {})

    // Calculate average expense per category from previous months
    const previousMonthsTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate < startOfMonth
    })

    const categoryAverages = previousMonthsTransactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, t) => {
        if (!acc[t.category]) {
          acc[t.category] = { total: 0, count: 0 }
        }
        acc[t.category].total += t.amount
        acc[t.category].count++
        return acc
      }, {})

    // Find anomalies (expenses > 2x average)
    return Object.entries(categoryExpenses)
      .filter(([category, amount]) => {
        const avg = categoryAverages[category]?.total / categoryAverages[category]?.count || 0
        return amount > avg * 2
      })
      .map(([category, amount]) => ({
        category,
        amount,
        average: categoryAverages[category]?.total / categoryAverages[category]?.count || 0
      }))
  }

  // Check cash flow warnings
  const checkCashFlowWarnings = () => {
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate >= startOfMonth
    })

    const income = currentMonthTransactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = currentMonthTransactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0)

    const warnings = []
    
    if (expenses > income) {
      warnings.push({
        type: 'negative_cash_flow',
        message: `Negative cash flow: Expenses exceed income by $${(expenses - income).toFixed(2)}`
      })
    }

    if (expenses > income * 0.9) {
      warnings.push({
        type: 'high_expense_ratio',
        message: `High expense ratio: ${((expenses / income) * 100).toFixed(1)}% of income`
      })
    }

    return warnings
  }

  // Calculate performance against historical benchmarks
  const calculatePerformanceBenchmarks = () => {
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate >= startOfMonth
    })

    const previousMonthsTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate < startOfMonth
    })

    const currentIncome = currentMonthTransactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0)

    const currentExpenses = currentMonthTransactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0)

    const avgMonthlyIncome = previousMonthsTransactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0) / 3 // Last 3 months average

    const avgMonthlyExpenses = previousMonthsTransactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0) / 3

    return {
      incomeVsAverage: ((currentIncome - avgMonthlyIncome) / avgMonthlyIncome) * 100,
      expensesVsAverage: ((currentExpenses - avgMonthlyExpenses) / avgMonthlyExpenses) * 100
    }
  }

  const profitabilityTrends = calculateProfitabilityTrends()
  const expenseAnomalies = detectExpenseAnomalies()
  const cashFlowWarnings = checkCashFlowWarnings()
  const performanceBenchmarks = calculatePerformanceBenchmarks()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Profitability Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-normal">Profitability Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profitabilityTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{trend.month}</span>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-sm font-medium",
                    trend.profit >= 0 ? "text-green-500" : "text-red-500"
                  )}>
                    ${trend.profit.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({trend.profitMargin.toFixed(1)}% margin)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expense Anomalies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-normal">Expense Anomalies</CardTitle>
        </CardHeader>
        <CardContent>
          {expenseAnomalies.length === 0 ? (
            <p className="text-sm text-muted-foreground">No anomalies detected</p>
          ) : (
            <div className="space-y-4">
              {expenseAnomalies.map((anomaly, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{anomaly.category}</p>
                    <p className="text-xs text-muted-foreground">
                      ${anomaly.amount.toFixed(2)} (2x above average of ${anomaly.average.toFixed(2)})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cash Flow Warnings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-normal">Cash Flow Warnings</CardTitle>
        </CardHeader>
        <CardContent>
          {cashFlowWarnings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No cash flow issues detected</p>
          ) : (
            <div className="space-y-4">
              {cashFlowWarnings.map((warning, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                  <p className="text-sm">{warning.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-normal">Performance vs History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm">Income</span>
              </div>
              <span className={cn(
                "text-sm font-medium",
                performanceBenchmarks.incomeVsAverage >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {performanceBenchmarks.incomeVsAverage >= 0 ? '+' : ''}
                {performanceBenchmarks.incomeVsAverage.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-red-500" />
                <span className="text-sm">Expenses</span>
              </div>
              <span className={cn(
                "text-sm font-medium",
                performanceBenchmarks.expensesVsAverage <= 0 ? "text-green-500" : "text-red-500"
              )}>
                {performanceBenchmarks.expensesVsAverage >= 0 ? '+' : ''}
                {performanceBenchmarks.expensesVsAverage.toFixed(1)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 