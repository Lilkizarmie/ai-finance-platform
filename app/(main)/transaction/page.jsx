import { Suspense } from 'react'
import { getUserAccounts, getDashboardData } from '@/actions/dashboard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { TransactionList } from './_components/transaction-list'
import { TransactionAnalytics } from './_components/transaction-analytics'

export default async function TransactionsPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ])

  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
      </div>
      
      <div className="grid gap-4">
        {/* Transaction filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
              />
            </div>
          </div>
          <a href="/transaction/create">
            <Button>
              Import Transaction
            </Button>
          </a>
           <a href="/transaction/create">
            <Button>
              Export Transaction
            </Button>
          </a>
        </div>

        {/* Transaction Analytics */}
        <Suspense fallback={<div>Loading analytics...</div>}>
          <TransactionAnalytics transactions={transactions} />
        </Suspense>

        {/* Transaction list */}
        <Suspense fallback={<div>Loading transactions...</div>}>
          <TransactionList transactions={transactions} accounts={accounts} />
        </Suspense>
      </div>
    </div>
  )
} 