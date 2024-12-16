import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InvoiceItemForm({
  onAddItem
}) {
  const [item, setItem] = useState({
    description: '',
    quantity: 1,
    unitPrice: 0
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setItem(
      prev => ({ ...prev, [name]: name === 'description' ? value : Number(value) })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddItem(item)
    setItem({ description: '', quantity: 1, unitPrice: 0 })
  }

  return (
    (<form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="description">Item Description</Label>
        <Input
          id="description"
          name="description"
          value={item.description}
          onChange={handleChange}
          required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleChange}
            required />
        </div>
        <div>
          <Label htmlFor="unitPrice">Unit Price</Label>
          <Input
            id="unitPrice"
            name="unitPrice"
            type="number"
            min="0"
            step="0.01"
            value={item.unitPrice}
            onChange={handleChange}
            required />
        </div>
      </div>
      <Button type="submit">Add Item</Button>
    </form>)
  );
}

