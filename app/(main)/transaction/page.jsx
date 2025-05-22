'use client'

import { useState, useEffect } from 'react'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { TransactionList } from './_components/transaction-list'
import { TransactionAnalytics } from './_components/transaction-analytics'
import { ImportTransactionsButton } from './_components/import-transactions-button'
import { AddTransactionModal } from './_components/add-transaction-modal'
import { getDashboardData, getUserAccounts } from '@/actions/dashboard'
import { defaultCategories } from '@/data/categories'

export default function TransactionsPage() {
  const [accounts, setAccounts] = useState(null)
  const [transactions, setTransactions] = useState(null)
  console.log(transactions)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [acc, txs] = await Promise.all([
        getUserAccounts(),
        getDashboardData(),
      ])
      setAccounts(acc)
      setTransactions(txs)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="py-12 text-center text-muted-foreground">Loading transactions...</div>
  }

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
          <Button onClick={() => setIsModalOpen(true)}>
            Create Transaction
          </Button>
          <ImportTransactionsButton />
        </div>

        {/* Transaction Analytics */}
        <Suspense fallback={<div>Loading analytics...</div>}>
          <TransactionAnalytics transactions={transactions} />
        </Suspense>

        {/* Transaction list */}
        <Suspense fallback={<div>Loading transactions...</div>}>
          <TransactionList accounts={accounts} transactions={transactions} />
        </Suspense>
      </div>
      <AddTransactionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        accounts={accounts}
        categories={defaultCategories}
      />
    </div>
  )
} 