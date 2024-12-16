'use client';
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import LeadDetailsPanel from './LeadDetailsPanel'
import EditLeadModal from './EditLeadModal'
import { LeadStageBadge } from './LeadStageBadge'
import { Edit, Eye, Trash2 } from 'lucide-react'
import { useLeads } from '../../app/leads/hooks/useLeads';

export default function LeadsTable() {
  const { leads, isLoading, error, deleteLead } = useLeads()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLead, setSelectedLead] = useState(null) // Update 1: State for selectedLead
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false)

  const leadsPerPage = 10
  const indexOfLastLead = currentPage * leadsPerPage
  const indexOfFirstLead = indexOfLastLead - leadsPerPage
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead)

  const totalPages = Math.ceil(leads.length / leadsPerPage)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    (<div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Service Type</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentLeads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.fullName}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phoneNumber}</TableCell>
              <TableCell>{lead.serviceType}</TableCell>
              <TableCell>
                <LeadStageBadge stage={lead.stage} />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedLead(lead)
                      setIsEditModalOpen(true)
                    }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedLead(lead)
                      setIsDetailsPanelOpen(true)
                    }}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this lead?')) {
                        deleteLead(lead.id)
                      }
                    }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
      {selectedLead && ( // Update 2: Rendering LeadDetailsPanel
        (<>
          <EditLeadModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            lead={selectedLead} />
          <LeadDetailsPanel
            isOpen={isDetailsPanelOpen}
            onClose={() => setIsDetailsPanelOpen(false)}
            lead={selectedLead} />
        </>)
      )}
    </div>)
  );
}

