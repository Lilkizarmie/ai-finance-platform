"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, FileText, AlertTriangle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data - replace with actual data fetching
const mockData = {
  imports: [
    {
      id: 1,
      name: 'Q1 Transactions.csv',
      type: 'csv',
      status: 'completed',
      date: new Date('2024-03-15'),
      records: 150,
      errors: 0
    },
    {
      id: 2,
      name: 'Bank Statement.pdf',
      type: 'pdf',
      status: 'processing',
      date: new Date('2024-03-14'),
      records: 0,
      errors: 0
    },
    {
      id: 3,
      name: 'Expenses.xlsx',
      type: 'excel',
      status: 'error',
      date: new Date('2024-03-13'),
      records: 75,
      errors: 3
    }
  ],
  integrations: [
    {
      name: 'QuickBooks',
      status: 'connected',
      lastSync: new Date('2024-03-15T10:30:00'),
      errors: 0
    },
    {
      name: 'Xero',
      status: 'disconnected',
      lastSync: null,
      errors: 0
    },
    {
      name: 'Bank Feed',
      status: 'error',
      lastSync: new Date('2024-03-14T15:45:00'),
      errors: 2
    }
  ]
}

export default function DataSourcesPage() {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Data Sources</h1>
      </div>
      
      <div className="grid gap-4">
        {/* Manual Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-normal">Upload Data</CardTitle>
            <CardDescription>
              Import your financial data from CSV, Excel, or PDF files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center",
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your files here, or click to browse
              </p>
              <Button variant="outline">
                Select Files
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: CSV, Excel (.xlsx), PDF
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Imports */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-normal">Recent Imports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.imports.map((import_) => (
                <div key={import_.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{import_.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {import_.records} records • {import_.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {import_.errors > 0 && (
                      <div className="flex items-center gap-1 text-red-500">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">{import_.errors} errors</span>
                      </div>
                    )}
                    <div className={cn(
                      "flex items-center gap-1",
                      import_.status === 'completed' ? "text-green-500" :
                      import_.status === 'error' ? "text-red-500" :
                      "text-yellow-500"
                    )}>
                      {import_.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : import_.status === 'error' ? (
                        <XCircle className="h-4 w-4" />
                      ) : (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      )}
                      <span className="text-sm capitalize">{import_.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Integration Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-normal">Integration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.integrations.map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {integration.status === 'connected' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : integration.status === 'error' ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{integration.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {integration.lastSync 
                          ? `Last sync: ${integration.lastSync.toLocaleString()}`
                          : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {integration.errors > 0 && (
                      <div className="flex items-center gap-1 text-red-500">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">{integration.errors} errors</span>
                      </div>
                    )}
                    <Button variant="outline" size="sm">
                      {integration.status === 'connected' ? 'Reconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 