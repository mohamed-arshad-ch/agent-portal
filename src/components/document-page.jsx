'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Edit, Trash2, Eye, X, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Mock data for documents
const mockDocuments = [
  { id: 1, clientName: "John Doe", documentType: "Payment Slip", uploadedDate: "2023-06-15", status: "Processing", agentName: "Alice Smith", fileName: "payment_slip_001.pdf", paidAmount: 500 },
  { id: 2, clientName: "Jane Smith", documentType: "Submission Slip", uploadedDate: "2023-06-14", status: "Approved", agentName: "Bob Johnson", fileName: "submission_slip_002.pdf" },
  { id: 3, clientName: "Alice Johnson", documentType: "Work Permit", uploadedDate: "2023-06-13", status: "Rejected", agentName: "Charlie Brown", fileName: "work_permit_003.pdf" },
]

// Mock data for clients (for autocomplete)
const mockClients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
  { id: 4, name: "Bob Williams" },
  { id: 5, name: "Emma Brown" },
]

export function DocumentPageComponent() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [documentType, setDocumentType] = useState("")
  const [releasingDate, setReleasingDate] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [paidAmount, setPaidAmount] = useState("")

  const handleUpload = () => {
    // Here you would typically handle the upload logic
    console.log(
      "Uploading:",
      { selectedClient, documentType, releasingDate, selectedFiles, paidAmount }
    )
    setIsUploadModalOpen(false)
    setSelectedFiles([]) // Clear selected files after upload
    setPaidAmount("") // Clear paid amount after upload
  }

  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id))
  }

  const handleViewDetails = (doc) => {
    setSelectedDocument(doc)
  }

  return (
    (<div className="container mx-auto p-4 max-w-2xl flex">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Documents</h1>
          <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
            <DialogTrigger asChild>
              <Button>Upload Document</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="client" className="text-right">
                    Client
                  </Label>
                  <div className="col-span-3">
                    <Select
                      onValueChange={(value) => setSelectedClient(mockClients.find(client => client.id === parseInt(value)))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockClients.map((client) => (
                          <SelectItem key={client.id} value={client.id.toString()}>{client.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="documentType" className="text-right">
                    Document Type
                  </Label>
                  <div className="col-span-3">
                    <Select onValueChange={setDocumentType}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="payment_slip">Payment Slip</SelectItem>
                        <SelectItem value="submission_slip">Submission Slip</SelectItem>
                        <SelectItem value="releasing_date">Invitation Releasing Date Document</SelectItem>
                        <SelectItem value="work_permit">Work Permit</SelectItem>
                        <SelectItem value="invitation">Invitation</SelectItem>
                        <SelectItem value="offer_letter">Offer Letter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {documentType === 'payment_slip' && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="paidAmount" className="text-right">
                      Paid Amount
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="paidAmount"
                        type="number"
                        value={paidAmount}
                        onChange={(e) => setPaidAmount(e.target.value)}
                        placeholder="Enter paid amount" />
                    </div>
                  </div>
                )}
                {documentType === 'releasing_date' && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="releasingDate" className="text-right">
                      Releasing Date
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !releasingDate && "text-muted-foreground"
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {releasingDate ? format(releasingDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={releasingDate}
                            onSelect={setReleasingDate}
                            initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="files" className="text-right mt-2">
                    Files
                  </Label>
                  <div className="col-span-3 space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16">
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, GIF or PDF (MAX. 800x400px)</p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          multiple
                          onChange={(e) => {
                            const fileList = e.target.files;
                            if (fileList) {
                              const filesArray = Array.from(fileList);
                              setSelectedFiles(filesArray);
                            }
                          }} />
                      </label>
                    </div>
                    {selectedFiles.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Selected Files:</h3>
                        <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="relative border rounded p-2">
                              {file.type.startsWith('image/') ? (
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  className="w-full h-32 object-cover" />
                              ) : (
                                <div className="flex items-center justify-center h-32 bg-gray-100">
                                  <span className="text-sm text-gray-500">{file.name}</span>
                                </div>
                              )}
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1"
                                onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}>
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={handleUpload}>Upload</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Document Type</TableHead>
              <TableHead>Uploaded Date</TableHead>
             
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.clientName}</TableCell>
                <TableCell>{doc.documentType}</TableCell>
                <TableCell>{doc.uploadedDate}</TableCell>
               
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(doc.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleViewDetails(doc)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedDocument && (
        <div
          className="lg:w-2/3 w-2/3  ml-4 bg-background border-l p-4 fixed right-0 top-0 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Document Details</h2>
            <Button variant="ghost" size="icon" onClick={() => setSelectedDocument(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-4">
              <div>
                <Label>Client Name</Label>
                <div className="mt-1">{selectedDocument.clientName}</div>
              </div>
              <Separator />
              <div>
                <Label>Document Type</Label>
                <div className="mt-1">{selectedDocument.documentType}</div>
              </div>
              <Separator />
              <div>
                <Label>Uploaded Date</Label>
                <div className="mt-1">{selectedDocument.uploadedDate}</div>
              </div>
              <Separator />
              <div>
                <Label>Status</Label>
                <div className="mt-1">{selectedDocument.status}</div>
              </div>
              <Separator />
              <div>
                <Label>Uploaded By</Label>
                <div className="mt-1">{selectedDocument.agentName}</div>
              </div>
              <Separator />
              <div>
                <Label>File Name</Label>
                <div className="mt-1">{selectedDocument.fileName}</div>
              </div>
              {selectedDocument.documentType === "Payment  Slip" && (
                <>
                  <Separator />
                  <div>
                    <Label>Paid Amount</Label>
                    <div className="mt-1">${selectedDocument.paidAmount}</div>
                  </div>
                </>
              )}
              <Separator />
              <div>
                <Button
                  className="w-full"
                  onClick={() => console.log(`Downloading ${selectedDocument.fileName}`)}>
                  <Download className="mr-2 h-4 w-4" /> Download Document
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>)
  );
}