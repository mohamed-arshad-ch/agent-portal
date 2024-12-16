import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'

export function InputModal({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) {
  const [formData, setFormData] = useState(initialData)
  const [flightTicket, setFlightTicket] = useState(true)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleStatusChange = (id) => {
    setFlightTicket(flightTicket == true ?false:true)
    setFormData(prev => ({ ...prev, flightTicket: flightTicket }))
  }

  return (
    (<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-[600px]">
    <DialogHeader>
      <DialogTitle>Enter Agreement Data</DialogTitle>
    </DialogHeader>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Party Details Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Party Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="secondPartyName">Second Party Name</Label>
            <Input
              id="secondPartyName"
              name="secondPartyName"
              value={formData.secondPartyName}
              onChange={handleChange}
              required
            />
          </div>
         

     
        </div>
        <div>
            <Label htmlFor="secondPartyAddress">Second Party Address</Label>
            <Textarea
              id="secondPartyAddress"
              name="secondPartyAddress"
              value={formData.secondPartyAddress}
              onChange={handleChange}
              required
              
            />
          </div>
        <div>
    <Label htmlFor="aadharNumber">Aadhar Number</Label>
    <Input
      id="aadharNumber"
      name="aadharNumber"
      value={formData.aadharNumber}
      onChange={handleChange}
      required />
  </div>

  <div>
    <Label htmlFor="flight-ticket">Flight Ticket</Label>
    <Switch
    id="flight-ticket"
      
                    checked={flightTicket}
                    onCheckedChange={() => handleStatusChange()} />
  </div>
      </div>

      {/* Payment Details Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="totalCost">Total Cost (₹)</Label>
            <Input
              id="totalCost"
              name="totalCost"
              type="number"
              value={formData.totalCost}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="advancePayment">Advance Payment (₹)</Label>
            <Input
              id="advancePayment"
              name="advancePayment"
              type="number"
              value={formData.advancePayment}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="remainingPayment">Remaining Payment (₹)</Label>
            <Input
              id="remainingPayment"
              name="remainingPayment"
              type="number"
              value={formData.remainingPayment}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="remainingPaymentDate">Remaining Payment Date</Label>
            <Input
              id="remainingPaymentDate"
              name="remainingPaymentDate"
              type="date"
              value={formData.remainingPaymentDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Agreement Dates Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Agreement Dates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="agreementDate">Agreement Date</Label>
            <Input
              id="agreementDate"
              name="agreementDate"
              type="date"
              value={formData.agreementDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="completionDate">Completion Date</Label>
            <Input
              id="completionDate"
              name="completionDate"
              type="date"
              value={formData.completionDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  </DialogContent>
</Dialog>
)
  );
}

