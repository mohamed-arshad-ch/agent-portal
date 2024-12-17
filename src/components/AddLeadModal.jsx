'use client';
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLeads } from '../../app/leads/hooks/useLeads';
import { useRouter } from 'next/router';


export default function AddLeadModal({
  isOpen,
  onClose,
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    serviceType: '',
    city: '',
  })
  const router = useRouter();
  const { addLead } = useLeads()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Prepare the request body
    const requestBody = {
      data: formData
    }

    try {
      // Make the API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()
      console.log('Success:', result)

      // Optionally, you can call addLead here if you want to update local state
      addLead(formData)

      // Close the modal
      onClose()
      window.location.reload();
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
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
                <SelectItem value="job_visa">Job visa</SelectItem>
                <SelectItem value="visa_service">Visa service</SelectItem>
                <SelectItem value="mbbs_admission">Mbbs Admission</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add Lead</Button>
        </form>
      </DialogContent>
    </Dialog>)
  );
}

