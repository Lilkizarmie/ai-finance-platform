'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ImportTransactionsModal } from './import-transactions-modal'

export function ImportTransactionsButton() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsImportModalOpen(true)}>
        Import Transaction
      </Button>
      <ImportTransactionsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </>
  )
} 