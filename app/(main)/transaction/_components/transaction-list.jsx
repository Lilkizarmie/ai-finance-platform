"use client"

export function TransactionList({ transactions, accounts }) {
  if (!transactions?.length) {
    return (
      <div className="rounded-md border">
        <div className="p-4">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <div className="p-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
            <div>
              <p className="font-medium">{transaction.description || 'Untitled Transaction'}</p>
              <p className="text-sm text-muted-foreground">
                {accounts.find(a => a.id === transaction.accountId)?.name || 'Unknown Account'}
              </p>
            </div>
            <div className="text-right">
              <p className={transaction.type === 'EXPENSE' ? 'text-red-500' : 'text-green-500'}>
                ${transaction.amount.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 