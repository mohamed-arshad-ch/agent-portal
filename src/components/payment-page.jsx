'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, Trash2, X } from "lucide-react"
import axios from 'axios'
import { Input } from './ui/input'

// Mock data for payments
const initialPayments = [
  { id: 1, clientName: "John Doe", date: "2023-06-15", status: "Processing", agentName: "Alice Smith", paidAmount: 500 },
  { id: 2, clientName: "Jane Smith", date: "2023-06-14", status: "Approved", agentName: "Bob Johnson", paidAmount: 750 },
  { id: 3, clientName: "Alice Johnson", date: "2023-06-13", status: "Rejected", agentName: "Charlie Brown", paidAmount: 1000 },
]

export function PaymentPageComponent() {
  const [payments, setPayments] = useState([])
  const [selectedPayment, setSelectedPayment] = useState(null)


   // Add new states for pagination, search, and filtering
   const [currentPage, setCurrentPage] = useState(1)
   const [searchQuery, setSearchQuery] = useState("")
   const [statusFilter, setStatusFilter] = useState("all")
   const itemsPerPage = 10 // Number of items per page
 
   useEffect(() => {
     const fetchPayments = async () => {
       try {
         const agent = JSON.parse(localStorage.getItem("user"))
         const response = await axios.get(
           `${process.env.NEXT_PUBLIC_API_URL}/uploaded-documents?populate=*&filters[agent][$eq]=${agent.id}&sort=createdAt:desc&filters[document_type][$eq]=payment_slip`,
           {
             headers: {
               Authorization: `Bearer ${localStorage.getItem("jwt")}`,
             }
           }
         )
         setPayments(response.data.data)
       } catch (error) {
         console.error("Error fetching clients:", error)
       }
     }
 
     fetchPayments()
   }, [])
 
   // Filter and search logic
   const filteredPayments = payments.filter(payment => {
     const matchesSearch = payment.client.name.toLowerCase().includes(searchQuery.toLowerCase())
     const matchesStatus = statusFilter === "all" || payment.document_status === statusFilter
     return matchesSearch && matchesStatus
   })
 
   // Pagination logic
   const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
   const paginatedPayments = filteredPayments.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   )
 
   // Add these functions for handling pagination, search, and filtering
   const handlePageChange = (page) => {
     setCurrentPage(page)
   }
 
   const handleSearch = (e) => {
     setSearchQuery(e.target.value)
     setCurrentPage(1) // Reset to first page when searching
   }
 
   const handleStatusFilter = (status) => {
     setStatusFilter(status)
     setCurrentPage(1) // Reset to first page when filtering
   }

  


  const handleDelete = (id) => {
    setPayments(payments.filter(payment => payment.id !== id))
    if (selectedPayment && selectedPayment.id === id) {
      setSelectedPayment(null)
    }
  }

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment)
  }

  const handleStatusChange = (newStatus) => {
    setPayments(payments.map(payment => 
      payment.id === selectedPayment.id ? { ...payment, status: newStatus } : payment))
    setSelectedPayment({ ...selectedPayment, status: newStatus })
  }

  return (
    (<div className="container mx-auto p-4 max-w-4xl flex">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4">Payments</h1>

        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search by client name..."
            value={searchQuery}
            onChange={handleSearch}
            className="max-w-xs"
          />
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Paid Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.client.name}</TableCell>
                <TableCell>{payment.paidAmount}</TableCell>
                <TableCell>{payment.createdAt}</TableCell>
                <TableCell>{payment.document_status}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleViewDetails(payment)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(payment.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
        
      </div>
      {selectedPayment && (
        <div
          className="w-1/3 ml-4 bg-background border-l p-4 fixed right-0 top-0 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Payment Details</h2>
            <Button variant="ghost" size="icon" onClick={() => setSelectedPayment(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-4">
              <div>
                <Label>Client Name</Label>
                <div className="mt-1">{selectedPayment.client.name}</div>
              </div>
              <Separator />
              <div>
                <Label>Date</Label>
                <div className="mt-1">{selectedPayment.createdAt}</div>
              </div>
              <Separator />
              <div>
                <Label>Status</Label>
                <div className="mt-1">{selectedPayment.document_status}</div>
              </div>
              <Separator />
              <div>
                <Label>Agent Name</Label>
                <div className="mt-1">{selectedPayment.agent.username}</div>
              </div>
              <Separator />
              <div>
                <Label>Paid Amount</Label>
                <div className="mt-1">${selectedPayment.paidAmount}</div>
              </div>
              <Separator />
              <div>
                <Label>Change Payment Status</Label>
                <Select onValueChange={handleStatusChange} defaultValue={selectedPayment.status}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>)
  );
}