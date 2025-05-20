import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Upload, Plus } from 'lucide-react'
import Link from 'next/link'
import { BillsAnalytics } from './_components/bills-analytics'

// Mock data - replace with actual data fetching
const mockData = {
  bills: [],
  vendors: [],
  integrations: [
    { name: 'QuickBooks', status: 'connected', lastSync: new Date() },
    { name: 'Xero', status: 'disconnected', lastSync: null },
    { name: 'Bank Feed', status: 'connected', lastSync: new Date() }
  ]
}

export default function BillsPage() {
  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bills & Expenses</h1>
      </div>
      
      <div className="grid gap-4">
        {/* Action Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/bills/history">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  View Bills
                </CardTitle>
                <CardDescription>
                  Browse and manage all your bills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View bill history, track payments, and manage recurring bills
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Bill
              </CardTitle>
              <CardDescription>
                Create a new bill or expense
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Add one-time or recurring bills and expenses
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics */}
        <Suspense fallback={<div>Loading analytics...</div>}>
          <BillsAnalytics 
            bills={mockData.bills}
            vendors={mockData.vendors}
            integrations={mockData.integrations}
          />
        </Suspense>
      </div>
    </div>
  )
} 