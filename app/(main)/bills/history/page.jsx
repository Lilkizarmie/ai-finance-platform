import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus } from 'lucide-react'

export default function BillsHistoryPage() {
  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bills History</h1>
      </div>
      
      <div className="grid gap-4">
        {/* Bills actions */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bills..."
                className="pl-8"
              />
            </div>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Bill
          </Button>
        </div>

        {/* Bills tabs */}
        <div className="flex gap-4 border-b">
          <button className="px-4 py-2 border-b-2 border-primary">All Bills</button>
          <button className="px-4 py-2 text-muted-foreground">Recurring</button>
          <button className="px-4 py-2 text-muted-foreground">Upcoming</button>
          <button className="px-4 py-2 text-muted-foreground">Paid</button>
        </div>

        {/* Bills list */}
        <div className="rounded-md border">
          <div className="p-4">
            <p className="text-muted-foreground">No bills found</p>
          </div>
        </div>
      </div>
    </div>
  )
}
