"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, Clock, Upload, CheckCircle2, XCircle, Users, Calendar, BarChart2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function InvoiceAnalytics({ invoices, clients, integrations }) {
  // Revenue Breakdown
  const calculateRevenueBreakdown = () => {
    // Revenue by client
    const revenueByClient = clients.reduce((acc, client) => {
      const clientInvoices = invoices.filter(inv => inv.clientId === client.id)
      acc[client.name] = clientInvoices.reduce((sum, inv) => sum + inv.amount, 0)
      return acc
    }, {})

    // Revenue by product/service
    const revenueByProduct = invoices.reduce((acc, inv) => {
      inv.items.forEach(item => {
        acc[item.name] = (acc[item.name] || 0) + item.amount
      })
      return acc
    }, {})

    // Top-paying clients
    const topClients = Object.entries(revenueByClient)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name, amount]) => ({ name, amount }))

    // Average invoice size
    const avgInvoiceSize = invoices.reduce((sum, inv) => sum + inv.amount, 0) / invoices.length

    return {
      revenueByClient,
      revenueByProduct,
      topClients,
      avgInvoiceSize
    }
  }

  // AI-Powered Trends & Forecasts
  const calculateTrendsAndForecasts = () => {
    const currentDate = new Date()
    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(currentDate)
      date.setMonth(date.getMonth() - i)
      return date
    }).reverse()

    // Invoicing volume over time
    const volumeByMonth = lastSixMonths.map(date => {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      
      const monthInvoices = invoices.filter(inv => {
        const invoiceDate = new Date(inv.date)
        return invoiceDate >= startOfMonth && invoiceDate <= endOfMonth
      })

      return {
        month: date.toLocaleString('default', { month: 'short' }),
        count: monthInvoices.length,
        amount: monthInvoices.reduce((sum, inv) => sum + inv.amount, 0)
      }
    })

    // Calculate trend for next month prediction
    const recentMonths = volumeByMonth.slice(-3)
    const trend = recentMonths.reduce((acc, month, i) => {
      if (i === 0) return acc
      return acc + (month.amount - recentMonths[i - 1].amount)
    }, 0) / 2

    const predictedNextMonth = recentMonths[recentMonths.length - 1].amount + trend

    // Detect seasonality
    const monthlyAverages = {}
    volumeByMonth.forEach(month => {
      const monthName = month.month
      if (!monthlyAverages[monthName]) {
        monthlyAverages[monthName] = { total: 0, count: 0 }
      }
      monthlyAverages[monthName].total += month.amount
      monthlyAverages[monthName].count++
    })

    const seasonality = Object.entries(monthlyAverages)
      .map(([month, data]) => ({
        month,
        average: data.total / data.count
      }))
      .sort((a, b) => b.average - a.average)

    return {
      volumeByMonth,
      predictedNextMonth,
      seasonality
    }
  }

  // Payment Behavior Insights
  const calculatePaymentInsights = () => {
    const paymentData = clients.map(client => {
      const clientInvoices = invoices.filter(inv => inv.clientId === client.id)
      const latePayments = clientInvoices.filter(inv => {
        const dueDate = new Date(inv.dueDate)
        const paidDate = inv.paidDate ? new Date(inv.paidDate) : null
        return paidDate && paidDate > dueDate
      })

      const avgPaymentTime = clientInvoices
        .filter(inv => inv.paidDate)
        .reduce((sum, inv) => {
          const issueDate = new Date(inv.date)
          const paidDate = new Date(inv.paidDate)
          return sum + (paidDate - issueDate) / (1000 * 60 * 60 * 24) // Convert to days
        }, 0) / clientInvoices.filter(inv => inv.paidDate).length

      // Calculate reliability score (0-100)
      const reliabilityScore = Math.max(0, Math.min(100,
        100 - (latePayments.length / clientInvoices.length) * 50 - // Late payment penalty
        (avgPaymentTime > 30 ? 20 : 0) - // Slow payment penalty
        (clientInvoices.filter(inv => !inv.paidDate).length / clientInvoices.length) * 30 // Unpaid invoice penalty
      ))

      return {
        clientId: client.id,
        clientName: client.name,
        latePayments: latePayments.length,
        avgPaymentTime,
        reliabilityScore
      }
    })

    return paymentData
  }

  // Alerts & Anomalies
  const calculateAlerts = () => {
    const alerts = []
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    
    // Check for sudden drop in issued invoices
    const currentMonthInvoices = invoices.filter(inv => new Date(inv.date) >= startOfMonth)
    const previousMonthInvoices = invoices.filter(inv => {
      const invDate = new Date(inv.date)
      return invDate >= new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1) &&
             invDate < startOfMonth
    })

    if (currentMonthInvoices.length < previousMonthInvoices.length * 0.5) {
      alerts.push({
        type: 'volume_drop',
        message: `Invoice volume dropped by ${Math.round((1 - currentMonthInvoices.length / previousMonthInvoices.length) * 100)}% this month`
      })
    }

    // Check for spike in overdue invoices
    const overdueInvoices = invoices.filter(inv => {
      const dueDate = new Date(inv.dueDate)
      return !inv.paidDate && dueDate < currentDate
    })

    if (overdueInvoices.length > invoices.length * 0.2) {
      alerts.push({
        type: 'overdue_spike',
        message: `${Math.round((overdueInvoices.length / invoices.length) * 100)}% of invoices are overdue`
      })
    }

    // Check for clients with increasing payment delays
    const paymentInsights = calculatePaymentInsights()
    const problematicClients = paymentInsights.filter(client => 
      client.reliabilityScore < 50 && client.latePayments > 2
    )

    if (problematicClients.length > 0) {
      alerts.push({
        type: 'payment_delays',
        message: `${problematicClients.length} clients showing consistent payment delays`
      })
    }

    return alerts
  }

  const revenueBreakdown = calculateRevenueBreakdown()
  const trendsAndForecasts = calculateTrendsAndForecasts()
  const paymentInsights = calculatePaymentInsights()
  const alerts = calculateAlerts()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Revenue Metrics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${revenueBreakdown.topClients.reduce((sum, client) => sum + client.amount, 0).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Average: ${revenueBreakdown.avgInvoiceSize.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clients.length}</div>
          <p className="text-xs text-muted-foreground">
            {revenueBreakdown.topClients.length} top clients
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
            ${trendsAndForecasts.predictedNextMonth.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Based on recent trends
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Payment Health</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {paymentInsights.length > 0 
              ? Math.round(paymentInsights.reduce((sum, client) => sum + client.reliabilityScore, 0) / paymentInsights.length)
              : 0}%
          </div>
          <p className="text-xs text-muted-foreground">
            Average client reliability
          </p>
        </CardContent>
      </Card>

      {/* Top Clients */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Top Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueBreakdown.topClients.map((client, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{client.name}</span>
                </div>
                <span className="text-sm">${client.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Trends */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendsAndForecasts.volumeByMonth.slice(-3).map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{month.month}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">${month.amount.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">({month.count} invoices)</span>
                </div>
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