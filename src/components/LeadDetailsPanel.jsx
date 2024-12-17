import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LeadStageBadge } from './LeadStageBadge'
import { useLeads } from '../../app/leads/hooks/useLeads'
import axios from 'axios'

export default function LeadDetailsPanel({
  isOpen,
  onClose,
  lead
}) {
  const [currentLead, setCurrentLead] = useState(lead)
  const { updateLead } = useLeads()

  const handleStageChange = async (newStage) => {
    const updatedLead = { ...currentLead, stage: newStage }
    updateLead(updatedLead)
    setCurrentLead(updatedLead)

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/leads/${currentLead.documentId}`, {
        data: {
          stage: newStage
        }
      },{headers:{
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }})
      console.log('Lead stage updated successfully')
      window.location.reload()
    } catch (error) {
      console.error('Error updating lead stage:', error)
    }

    // window.location.reload();
  }

  return (
    (<Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Lead Details</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div>
            <strong>Full Name:</strong> {currentLead.fullName}
          </div>
          <div>
            <strong>Email:</strong> {currentLead.email}
          </div>
          <div>
            <strong>Phone Number:</strong> {currentLead.phoneNumber}
          </div>
          <div>
            <strong>Service Type:</strong> {currentLead.serviceType}
          </div>
          <div>
            <strong>Current Stage:</strong> <LeadStageBadge stage={currentLead.stage} />
          </div>
          <div>
            <strong>Update Stage:</strong>
            <Select onValueChange={handleStageChange} defaultValue={currentLead.stage}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select lead stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="closed won">Closed Won</SelectItem>
                <SelectItem value="closed lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Add more lead details here as needed */}
        </div>
      </SheetContent>
    </Sheet>)
  );
}

