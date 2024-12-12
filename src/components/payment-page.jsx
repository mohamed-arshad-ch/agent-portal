'use client'

import { useState } from 'react'
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

// Mock data for payments
const initialPayments = [
  { id: 1, clientName: "John Doe", date: "2023-06-15", status: "Processing", agentName: "Alice Smith", paidAmount: 500 },
  { id: 2, clientName: "Jane Smith", date: "2023-06-14", status: "Approved", agentName: "Bob Johnson", paidAmount: 750 },
  { id: 3, clientName: "Alice Johnson", date: "2023-06-13", status: "Rejected", agentName: "Charlie Brown", paidAmount: 1000 },
]

export function PaymentPageComponent() {
  const [payments, setPayments] = useState(initialPayments)
  const [selectedPayment, setSelectedPayment] = useState(null)

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.clientName}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.status}</TableCell>
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
                <div className="mt-1">{selectedPayment.clientName}</div>
              </div>
              <Separator />
              <div>
                <Label>Date</Label>
                <div className="mt-1">{selectedPayment.date}</div>
              </div>
              <Separator />
              <div>
                <Label>Status</Label>
                <div className="mt-1">{selectedPayment.status}</div>
              </div>
              <Separator />
              <div>
                <Label>Agent Name</Label>
                <div className="mt-1">{selectedPayment.agentName}</div>
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