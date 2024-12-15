'use client'

import { useState, useEffect } from 'react'
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
import axios from 'axios'

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
  const [documents, setDocuments] = useState([])
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [clientList, setClientList] = useState([])
  const [clientSearch, setClientSearch] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [releasingDate, setReleasingDate] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [localDocument, setLocalDocument] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [paidAmount, setPaidAmount] = useState("")
  const [displayClientName, setDisplayClientName] = useState("")

  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10);
const [searchTerm, setSearchTerm] = useState("");
const [filterDocumentType, setFilterDocumentType] = useState("");
const [filterStatus, setFilterStatus] = useState("");


const filteredDocuments = documents.filter(doc => {
  const matchesSearch = doc.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.document_type.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesDocType = filterDocumentType ? doc.document_type === filterDocumentType : true;
  const matchesStatus = filterStatus ? doc.document_status === filterStatus : true;
  
  return matchesSearch && matchesDocType && matchesStatus;
});

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredDocuments.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);



  useEffect(() => {
    const fetchClients = async () => {
      try {
        const agent = JSON.parse(localStorage.getItem("user"))
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clients?populate=*&filters[agent_id][$eq]=${agent.id}&sort=createdAt:desc`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
          }
        )
        console.log('Fetched clients:', response.data.data)
        setClientList(response.data.data)
      } catch (error) {
        console.error("Error fetching clients:", error)
      }
    }

    fetchClients()
  }, [])

  const handleClientSelect = (client) => {
    setSelectedClient(client)
    setDisplayClientName(client.name)
    setClientSearch("")
  }
  

  useEffect(()=>{
    
    const getDocumentDetails = async ()=>{
     try {
       const agent = JSON.parse(localStorage.getItem("user"))
 
      
       
       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/uploaded-documents?populate=*&filters[agent][$eq]=${agent.id}&sort=createdAt:desc`,{headers:{
         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
       }})
 
       console.log(res.data);
       
       setDocuments(res.data.data)
     } catch (error) {
       
     }
    }
 
    getDocumentDetails()
   },[])


  const handleUpload = async () => {
    // Here you would typically handle the upload logic
    try {
      const requestBody = {
        data: {
          client:selectedClient.id,
          document_type:documentType,
          agent: JSON.parse(localStorage.getItem("user")).id,
          document: localDocument.id,
          paidAmount: paidAmount,
          releasingDate:releasingDate,
          
        }
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/uploaded-documents`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          }
        }
      );

      if (response.data) {
        const agent = JSON.parse(localStorage.getItem("user"));
        const refreshedData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/uploaded-documents?populate=*&filters[agent][$eq]=${agent.id}&sort=createdAt:desc`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
          }
        );
        setDocuments(refreshedData.data.data)
        setIsUploadModalOpen(false)
        setSelectedFiles([]) // Clear selected files after upload
        setPaidAmount("") // Clear paid amount after upload
      }
    } catch (error) {
      console.error("Error adding client:", error);
      // Handle error appropriately (show error message to user)
    }

    
  }

  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id))
  }

  const handleViewDetails = (doc) => {
    setSelectedDocument(doc)
  }

  return (
    (<div className="container mx-auto p-4 max-w-4xl flex">
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
                  <div className="col-span-3 relative">
                    <Input
                      id="client"
                      value={displayClientName || clientSearch}
                      onChange={(e) => {
                        setDisplayClientName("")
                        setClientSearch(e.target.value)
                        setSelectedClient(null)
                      }}
                      placeholder="Search client"
                      className="w-full"
                    />
                    {clientSearch && !displayClientName && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                        {clientList
                          .filter(client => 
                            client.name.toLowerCase().includes(clientSearch.toLowerCase())
                          )
                          .map(client => (
                            <div
                              key={client.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleClientSelect(client)}
                            >
                              {client.name}
                            </div>
                          ))}
                      </div>
                    )}
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
                          onChange={async(e) => {
                            const fileList = e.target.files;
                            if (fileList) {
                              const filesArray = Array.from(fileList);
                              setSelectedFiles(filesArray);
                            }

                            try {
                              const file = e.target.files[0];
                              var formdata = new FormData();
  formdata.append("files", file);
                              const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload/`,formdata,{headers:{
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  
                            
                                
                                
                              }})
  
                              console.log(res.data);
                              const updatedClient = { ...client, document: file,passport_document:res.data[0].id };
                            
                              setLocalDocument(res.data[0]);
                              
                            } catch (error) {
                              
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
        <div className="mb-4 space-y-4">
  <div className="flex gap-4">
    <Input
      placeholder="Search documents..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="max-w-sm"
    />
     <Select onValueChange={setFilterDocumentType}>
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
    <Select  onValueChange={setFilterStatus}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
       
        <SelectItem value="processing">Processing</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Document Type</TableHead>
              <TableHead>Document Status</TableHead>
              <TableHead>Uploaded Date</TableHead>
             
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.client.name}</TableCell>
                <TableCell>{doc.document_type}</TableCell>
                <TableCell>{doc.document_status}</TableCell>
                <TableCell>{doc.createdAt}</TableCell>
               
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

        <div className="flex items-center justify-between space-x-2 py-4">
  <div className="text-sm text-muted-foreground">
    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDocuments.length)} of{" "}
    {filteredDocuments.length} entries
  </div>
  <div className="flex space-x-2">
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      Previous
    </Button>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <Button
        key={page}
        variant={currentPage === page ? "default" : "outline"}
        size="sm"
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </Button>
    ))}
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </div>
</div>
      </div>
      {selectedDocument && (
        <div
          className="lg:w-1/3 w-1/3  ml-4 bg-background border-l p-4 fixed right-0 top-0 h-full overflow-y-auto">
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
                <div className="mt-1">{selectedDocument.client.name}</div>
              </div>
              <Separator />
              <div>
                <Label>Document Type</Label>
                <div className="mt-1">{selectedDocument.document_type}</div>
              </div>
              <Separator />
              <div>
                <Label>Uploaded Date</Label>
                <div className="mt-1">{selectedDocument.createdAt}</div>
              </div>
              <Separator />
              <div>
                <Label>Status</Label>
                <div className="mt-1">{selectedDocument.document_status}</div>
              </div>
              <Separator />
              <div>
                <Label>Uploaded By</Label>
                <div className="mt-1">{selectedDocument.agent.username}</div>
              </div>
              <Separator />
              <div>
                <Label>File Name</Label>
                <div className="mt-1">{selectedDocument.document[0].name}</div>
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
                  onClick={async() =>{
                   
                    try {
                      const response = await fetch(selectedDocument.document[0].url, {
                        method: "GET",
                      });
                
                      if (!response.ok) {
                        throw new Error("Failed to fetch the file");
                      }
                
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", selectedDocument.document[0].name); // Set the file name
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url); // Clean up the object URL
                    } catch (error) {
                      console.error("Error while downloading the file:", error);
                    }
                    
                  }}>
                  <Download className="mr-2 h-4 w-4" /> Download Document
                </Button>
              </div>

              <div>
                <Button
                  className="w-full"
                  onClick={async() =>{
                   
                    window.open(selectedDocument.document[0].url, "_blank");
                    
                  }}>
                  <Eye className="mr-2 h-4 w-4" /> View Document
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>)
  );
}