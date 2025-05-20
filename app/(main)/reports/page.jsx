export default function ReportsPage() {
  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      </div>
      
      <div className="grid gap-4">
        {/* Report types */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Profit & Loss</h3>
            <p className="text-sm text-muted-foreground">View your income and expenses</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Balance Sheet</h3>
            <p className="text-sm text-muted-foreground">Track your assets and liabilities</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Cash Flow</h3>
            <p className="text-sm text-muted-foreground">Monitor your cash movements</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Tax Summary</h3>
            <p className="text-sm text-muted-foreground">View your tax obligations</p>
          </div>
        </div>

        {/* Date range selector */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            {/* Date range picker will go here */}
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Generate Report
          </button>
        </div>

        {/* Report content */}
        <div className="rounded-md border">
          <div className="p-4">
            <p className="text-muted-foreground">Select a report type and date range to generate a report</p>
          </div>
        </div>
      </div>
    </div>
  )
} 