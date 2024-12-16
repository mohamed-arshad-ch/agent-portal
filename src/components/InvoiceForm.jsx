'use client';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InvoiceItemForm from './InvoiceItemForm'
import InvoicePreview from './InvoicePreview'

export default function InvoiceForm() {
  const [invoice, setInvoice] = useState({
    customerName: '',
    customerEmail: '',
    items: [],
    invoiceNumber: '01234',
    dateIssued: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    bankName: 'Rimberio',
    accountNo: '0123 4567 8901',
    accountName: 'Hannah Morales'
  })

  const handleCustomerChange = (e) => {
    const { name, value } = e.target
    setInvoice(prev => ({ ...prev, [name]: value }))
  }

  const addItem = (item) => {
    setInvoice(prev => ({ ...prev, items: [...prev.items, item] }))
  }

  const removeItem = (index) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  return (
    (<div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            name="customerName"
            value={invoice.customerName}
            onChange={handleCustomerChange}
            required />
        </div>
        <div>
          <Label htmlFor="customerEmail">Customer Email</Label>
          <Input
            id="customerEmail"
            name="customerEmail"
            type="email"
            value={invoice.customerEmail}
            onChange={handleCustomerChange}
            required />
        </div>
      </div>
      <InvoiceItemForm onAddItem={addItem} />
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Invoice Items</h3>
        {invoice.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>{item.description} - {item.quantity} x ${item.unitPrice.toFixed(2)}</span>
            <Button variant="destructive" size="sm" onClick={() => removeItem(index)}>Remove</Button>
          </div>
        ))}
      </div>
      <InvoicePreview invoice={invoice} />
    </div>)
  );
}

