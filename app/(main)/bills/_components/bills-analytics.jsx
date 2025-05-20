"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, Clock, Upload, CheckCircle2, XCircle, CreditCard, Building2, Calendar, BarChart2, Receipt, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function BillsAnalytics({ bills, vendors, integrations }) {
  // Expense Breakdown
  const calculateExpenseBreakdown = () => {
    const categories = {
      'Rent': 0,
      'SaaS Tools': 0,
      'Payroll': 0,
      'Utilities': 0,
      'Marketing': 0,
      'Other': 0
    }

    const vendorExpenses = {}
    const paymentMethods = {
      'Credit Card': 0,
      'Bank Transfer': 0,
      'Other': 0
    }

    bills.forEach(bill => {
      // Category breakdown
      categories[bill.category] = (categories[bill.category] || 0) + bill.amount
      
      // Vendor breakdown
      vendorExpenses[bill.vendor] = (vendorExpenses[bill.vendor] || 0) + bill.amount
      
      // Payment method breakdown
      paymentMethods[bill.paymentMethod] = (paymentMethods[bill.paymentMethod] || 0) + bill.amount
    })

    return {
      categories,
      vendorExpenses,
      paymentMethods
    }
  }

  // Smart Categorization
  const analyzeCategorization = () => {
    const uncategorized = bills.filter(bill => !bill.category)
    const unusual = bills.filter(bill => {
      const categoryAvg = bills
        .filter(b => b.category === bill.category)
        .reduce((sum, b) => sum + b.amount, 0) / bills.length
      return bill.amount > categoryAvg * 2
    })

    return {
      uncategorized,
      unusual
    }
  }

  // Trends & Forecasts
  const calculateTrends = () => {
    const currentDate = new Date()
    const lastThreeMonths = Array.from({ length: 3 }, (_, i) => {
      const date = new Date(currentDate)
      date.setMonth(date.getMonth() - i)
      return date
    }).reverse()

    const monthlyExpenses = lastThreeMonths.map(date => {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      
      const monthBills = bills.filter(bill => {
        const billDate = new Date(bill.date)
        return billDate >= startOfMonth && billDate <= endOfMonth
      })

      return {
        month: date.toLocaleString('default', { month: 'short' }),
        amount: monthBills.reduce((sum, bill) => sum + bill.amount, 0)
      }
    })

    // Calculate burn rate (average monthly expense)
    const burnRate = monthlyExpenses.reduce((sum, month) => sum + month.amount, 0) / monthlyExpenses.length

    // Predict next month
    const trend = monthlyExpenses.reduce((acc, month, i) => {
      if (i === 0) return acc
      return acc + (month.amount - monthlyExpenses[i - 1].amount)
    }, 0) / 2

    const predictedNextMonth = monthlyExpenses[monthlyExpenses.length - 1].amount + trend

    return {
      monthlyExpenses,
      burnRate,
      predictedNextMonth
    }
  }

  // Recurring Payments Analysis
  const analyzeRecurringPayments = () => {
    const recurring = bills.filter(bill => bill.isRecurring)
    const subscriptions = recurring.filter(bill => bill.category === 'SaaS Tools')
    
    const totalRecurring = recurring.reduce((sum, bill) => sum + bill.amount, 0)
    const totalSubscriptions = subscriptions.reduce((sum, bill) => sum + bill.amount, 0)

    return {
      recurring,
      subscriptions,
      totalRecurring,
      totalSubscriptions
    }
  }

  // AI Alerts
  const calculateAlerts = () => {
    const alerts = []
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    
    // Check for sudden category increases
    const currentMonthBills = bills.filter(bill => new Date(bill.date) >= startOfMonth)
    const previousMonthBills = bills.filter(bill => {
      const billDate = new Date(bill.date)
      return billDate >= new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1) &&
             billDate < startOfMonth
    })

    const categoryChanges = {}
    currentMonthBills.forEach(bill => {
      categoryChanges[bill.category] = (categoryChanges[bill.category] || 0) + bill.amount
    })

    Object.entries(categoryChanges).forEach(([category, amount]) => {
      const prevAmount = previousMonthBills
        .filter(bill => bill.category === category)
        .reduce((sum, bill) => sum + bill.amount, 0)
      
      if (amount > prevAmount * 1.5) {
        alerts.push({
          type: 'category_spike',
          message: `${category} expenses increased by ${Math.round((amount/prevAmount - 1) * 100)}%`
        })
      }
    })

    // Check for missed bills
    const missedBills = bills.filter(bill => {
      const dueDate = new Date(bill.dueDate)
      return !bill.paid && dueDate < currentDate
    })

    if (missedBills.length > 0) {
      alerts.push({
        type: 'missed_bills',
        message: `${missedBills.length} bills are overdue`
      })
    }

    return alerts
  }

  const expenseBreakdown = calculateExpenseBreakdown()
  const categorization = analyzeCategorization()
  const trends = calculateTrends()
  const recurring = analyzeRecurringPayments()
  const alerts = calculateAlerts()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Expense Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${trends.monthlyExpenses[trends.monthlyExpenses.length - 1].amount.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Burn Rate: ${trends.burnRate.toFixed(2)}/month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recurring Expenses</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${recurring.totalRecurring.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {recurring.subscriptions.length} active subscriptions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Month Forecast</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${trends.predictedNextMonth.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Based on recent trends
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(expenseBreakdown.paymentMethods).map(([method, amount]) => (
              <div key={method} className="flex items-center justify-between">
                <span className="text-sm">{method}</span>
                <span className="text-sm font-medium">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(expenseBreakdown.categories)
              .sort(([, a], [, b]) => b - a)
              .map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                  <span className="text-sm">${amount.toFixed(2)}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Vendors */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Top Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(expenseBreakdown.vendorExpenses)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([vendor, amount]) => (
                <div key={vendor} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{vendor}</span>
                  </div>
                  <span className="text-sm">${amount.toFixed(2)}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Alerts & Notifications</CardTitle>
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

      {/* Integration Status */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {integration.status === 'connected' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">{integration.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {integration.lastSync ? `Last sync: ${new Date(integration.lastSync).toLocaleDateString()}` : 'Not connected'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 