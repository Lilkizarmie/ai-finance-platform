import { Suspense } from 'react'
import { FileText, Upload } from 'lucide-react'
import { InvoiceAnalytics } from './_components/invoice-analytics'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

// Mock data - replace with actual data fetching
const mockData = {
  invoices: [],
  clients: [],
  integrations: [
    { name: 'QuickBooks', status: 'connected', lastSync: new Date() },
    { name: 'Xero', status: 'disconnected', lastSync: null },
    { name: 'Stripe', status: 'connected', lastSync: new Date() }
  ]
}

export default function InvoicingPage() {
  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invoicing</h1>
      </div>
      
      <div className="grid gap-4">
        {/* Action Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/invoicing/history">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  View Invoices
                </CardTitle>
                <CardDescription>
                  Browse and manage all your invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View invoice history, track payments, and manage recurring invoices
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Import Invoice Data
              </CardTitle>
              <CardDescription>
                Import invoices from external sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Import data from QuickBooks, Xero, Stripe, or upload CSV files
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics */}
        <Suspense fallback={<div>Loading analytics...</div>}>
          <InvoiceAnalytics 
            invoices={mockData.invoices}
            clients={mockData.clients}
            integrations={mockData.integrations}
          />
        </Suspense>
      </div>
    </div>
  )
} 