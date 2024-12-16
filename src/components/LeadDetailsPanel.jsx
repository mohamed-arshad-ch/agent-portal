import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LeadStageBadge } from './LeadStageBadge'
import { useLeads } from '../../app/leads/hooks/useLeads'


export default function LeadDetailsPanel({
  isOpen,
  onClose,
  lead
}) {
  const [currentLead, setCurrentLead] = useState(lead)
  const { updateLead } = useLeads()

  const handleStageChange = (newStage) => {
    const updatedLead = { ...currentLead, stage: newStage }
    updateLead(updatedLead)
    setCurrentLead(updatedLead)
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
          {/* Add more lead details here as needed */}
        </div>
      </SheetContent>
    </Sheet>)
  );
}

