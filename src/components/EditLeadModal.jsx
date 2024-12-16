import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLeads } from '../../app/leads/hooks/useLeads'


export default function EditLeadModal({
  isOpen,
  onClose,
  lead
}) {
  const [formData, setFormData] = useState(lead)
  const { updateLead } = useLeads()

  useEffect(() => {
    setFormData(lead)
  }, [lead])

  const handleSubmit = (e) => {
    e.preventDefault()
    updateLead(formData)
    onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required />
          </div>
          <div>
            <Label htmlFor="serviceType">Service Type</Label>
            <Select
              onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="installation">Installation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="stage">Lead Stage</Label>
            <Select
              onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select lead stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Interested">Interested</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed Won">Closed Won</SelectItem>
                <SelectItem value="Closed Lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Update Lead</Button>
        </form>
      </DialogContent>
    </Dialog>)
  );
}

