import { Badge } from '@/components/ui/badge'

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function formatAmount(amount) {
  return amount?.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export function TransactionList({ accounts, transactions }) {
  if (!transactions || transactions.length === 0) {
    return <div className="text-center text-muted-foreground py-8">No transactions found.</div>
  }

  // Sort by date descending and take the last 5
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Date</th>
            <th className="px-4 py-2 text-left font-semibold">Description</th>
            <th className="px-4 py-2 text-left font-semibold">Type</th>
            <th className="px-4 py-2 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(tx => (
            <tr key={tx.id} className="border-b last:border-0 hover:bg-gray-50 transition">
              <td className="px-4 py-2 whitespace-nowrap">{formatDate(tx.date)}</td>
              <td className="px-4 py-2 whitespace-nowrap">{tx.description}</td>
              <td className="px-4 py-2">
                <Badge variant={tx.type === 'INCOME' ? 'success' : 'destructive'} className={tx.type === 'INCOME' ? 'bg-[#32AE4C]/10 text-[#32AE4C]' : 'bg-red-100 text-red-600'}>
                  {tx.type}
                </Badge>
              </td>
              <td className={tx.type === 'INCOME' ? 'px-4 py-2 text-right font-medium text-[#32AE4C]' : 'px-4 py-2 text-right font-medium text-red-600'}>
                {formatAmount(tx.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 