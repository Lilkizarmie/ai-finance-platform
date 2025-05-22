'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, FileText, Database, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ImportDataModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null)
  const [source, setSource] = useState('csv')
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size exceeds 10MB limit')
        return
      }
      if (!selectedFile.name.match(/\.(csv|xlsx)$/i)) {
        setError('Please upload a CSV or Excel file')
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleImport = async () => {
    if (!file && source === 'csv') {
      setError('Please select a file to upload')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      if (source === 'csv') {
        const formData = new FormData()
        formData.append('file', file)
        
        // Replace with your actual API endpoint
        const response = await fetch('/api/products/import', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('Failed to import data')
        }

        onClose()
      } else {
        // Handle API integration
        // Replace with your actual API integration logic
        await new Promise(resolve => setTimeout(resolve, 2000))
        onClose()
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import Product Data</DialogTitle>
          <DialogDescription>
            Import your product data from a CSV file or connect to an e-commerce platform.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="csv" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="csv" onClick={() => setSource('csv')}>
              <FileText className="mr-2 h-4 w-4" />
              CSV Upload
            </TabsTrigger>
            <TabsTrigger value="api" onClick={() => setSource('api')}>
              <Database className="mr-2 h-4 w-4" />
              API Integration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="csv" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload CSV File</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Supported formats: CSV, Excel (max 10MB)
                </p>
              </div>

              <div className="space-y-2">
                <Label>File Format</Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Format</SelectItem>
                    <SelectItem value="custom">Custom Format</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Platform</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="woocommerce">WooCommerce</SelectItem>
                    <SelectItem value="amazon">Amazon Seller</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" placeholder="Enter your API key" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 