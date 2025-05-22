'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AddTransactionForm } from './transaction-form'
import { defaultCategories } from '@/data/categories'

export function AddTransactionModal({ open, onClose, accounts, categories = defaultCategories, editData }) {
  // Optionally handle form submission to close modal
  function handleSuccess() {
    if (onClose) onClose()
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose && onClose()}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>{editData ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        </DialogHeader>
        <AddTransactionForm
          accounts={accounts}
          categories={categories}
          editMode={!!editData}
          initialData={editData}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  )
} 