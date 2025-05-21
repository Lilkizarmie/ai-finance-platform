'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ImportTransactionsModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null)
  const [account, setAccount] = useState('')
  const [format, setFormat] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Auto-detect format based on file extension
      const extension = selectedFile.name.split('.').pop().toLowerCase()
      if (['csv', 'xlsx', 'pdf'].includes(extension)) {
        setFormat(extension)
      }
    }
  }

  const handleImport = async () => {
    if (!file || !account || !format) return

    setIsUploading(true)
    setUploadStatus(null)

    try {
      // Create FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('account', account)
      formData.append('format', format)

      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/transactions/import', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Import failed')

      setUploadStatus('success')
      setTimeout(() => {
        onClose()
        // Reset state
        setFile(null)
        setAccount('')
        setFormat('')
        setUploadStatus(null)
      }, 2000)
    } catch (error) {
      setUploadStatus('error')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import Transactions</DialogTitle>
          <DialogDescription>
            Upload your bank statement or transaction file to import transactions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* File Upload */}
          <div className="space-y-2">
            <Label>File</Label>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                file ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-[#32AE4C]"
              )}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".csv,.xlsx,.pdf"
                onChange={handleFileChange}
              />
              {file ? (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <FileText className="h-5 w-5" />
                  <span>{file.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <div className="text-sm text-gray-500">
                    Click to upload or drag and drop
                  </div>
                  <div className="text-xs text-gray-400">
                    CSV, XLSX, or PDF up to 10MB
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Selection */}
          <div className="space-y-2">
            <Label>Account</Label>
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking Account</SelectItem>
                <SelectItem value="savings">Savings Account</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Format */}
          <div className="space-y-2">
            <Label>File Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Message */}
          {uploadStatus && (
            <div className={cn(
              "flex items-center gap-2 p-3 rounded-lg",
              uploadStatus === 'success' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            )}>
              {uploadStatus === 'success' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span>
                {uploadStatus === 'success'
                  ? 'Transactions imported successfully!'
                  : 'Failed to import transactions. Please try again.'}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || !account || !format || isUploading}
              className="bg-[#32AE4C] hover:bg-green-600"
            >
              {isUploading ? 'Importing...' : 'Import'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 