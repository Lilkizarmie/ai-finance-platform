export default function InvoicingPage() {
  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invoicing</h1>
      </div>
      
      <div className="grid gap-4">
        {/* Invoice actions */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            {/* Search and filters */}
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Create Invoice
          </button>
        </div>

        {/* Invoice tabs */}
        <div className="flex gap-4 border-b">
          <button className="px-4 py-2 border-b-2 border-primary">All Invoices</button>
          <button className="px-4 py-2 text-muted-foreground">Paid</button>
          <button className="px-4 py-2 text-muted-foreground">Unpaid</button>
          <button className="px-4 py-2 text-muted-foreground">Recurring</button>
        </div>

        {/* Invoice list */}
        <div className="rounded-md border">
          <div className="p-4">
            <p className="text-muted-foreground">No invoices found</p>
          </div>
        </div>
      </div>
    </div>
  )
} 