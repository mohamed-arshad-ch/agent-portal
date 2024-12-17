'use client';
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from './ui/textarea';

export default function InvoiceFormModal({
  isOpen,
  onClose,
  onSave,
  initialInvoice
}) {
  const [invoice, setInvoice] = useState(initialInvoice)

  useEffect(() => {
    setInvoice(initialInvoice)
  }, [initialInvoice])

  const handleChange = (e) => {
    const { name, value } = e.target
    setInvoice(prev => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (index, field, value) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: field === 'description' ? value : Number(value) } : item)
    }))
  }

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0 }]
    }))
  }

  const removeItem = (index) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  const handleSave = () => {
    onSave(invoice)
  }

  return (
    (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleChange}
                required />
            </div>
            <div>
              <Label htmlFor="dateIssued">Date Issued</Label>
              <Input
                id="dateIssued"
                name="dateIssued"
                value={invoice.dateIssued}
                onChange={handleChange}
                required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                name="customerName"
                value={invoice.customerName}
                onChange={handleChange}
                required />
            </div>
            <div>
              <Label htmlFor="customerEmail">Customer Email</Label>
              <Input
                id="customerEmail"
                name="customerEmail"
                type="email"
                value={invoice.customerEmail}
                onChange={handleChange}
                required />
            </div>

            <div>
              <Label htmlFor="customerPhone">Customer Phone</Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                value={invoice.customerPhone}
                onChange={handleChange}
                required />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="address">Customer Address</Label>
              <Textarea
                id="address"
                name="address"
                value={invoice.address}
                onChange={handleChange}
                required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="transferType">Transfer Type</Label>
              <select
                id="transferType"
                name="transferType"
                value={invoice.transferType}
                onChange={handleChange}
                className="input-class"
                required
              >
                <option value="">Select Transfer Type</option>
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
                <option value="upi">UPI</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Invoice Items</h3>
            {invoice.items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 items-end">
                <div>
                  <Label htmlFor={`item-${index}-description`}>Description</Label>
                  <Input
                    id={`item-${index}-description`}
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    required />
                </div>
                <div>
                  <Label htmlFor={`item-${index}-quantity`}>Quantity</Label>
                  <Input
                    id={`item-${index}-quantity`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    required />
                </div>
                <div>
                  <Label htmlFor={`item-${index}-unitPrice`}>Unit Price</Label>
                  <Input
                    id={`item-${index}-unitPrice`}
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                    required />
                </div>
                <Button variant="destructive" onClick={() => removeItem(index)}>Remove</Button>
              </div>
            ))}
            <Button onClick={addItem}>Add Item</Button>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Invoice</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>)
  );
}

