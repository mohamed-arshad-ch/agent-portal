'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Edit, Trash2, Eye, Search, ChevronLeft, ChevronRight, Download, RemoveFormatting, Delete, DeleteIcon, TrashIcon } from "lucide-react"
import axios from 'axios';

// Mock client data

export function ClientsPageComponent() {
  const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState(null)
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false)
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false)
  const [newClient, setNewClient] = useState({ name: "", passportNumber: "", photo: null, document: null })
  const [editingClient, setEditingClient] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const clientsPerPage = 5

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.passport.toLowerCase().includes(searchTerm.toLowerCase()))

  const indexOfLastClient = currentPage * clientsPerPage
  const indexOfFirstClient = indexOfLastClient - clientsPerPage
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient)

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage)


  useEffect(()=>{
    
   const getClientDetails = async ()=>{
    try {
      const agent = JSON.parse(localStorage.getItem("user"))

     
      
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients?populate=*&filters[agent_id][$eq]=${agent.id}&sort=createdAt:desc`,{headers:{
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }})

      console.log(res.data);
      
      setClients(res.data.data)
    } catch (error) {
      
    }
   }

   getClientDetails()
  },[])
  const handleAddClient = async (updatedClient) => {
    try {
      const requestBody = {
        data: {
          name: updatedClient.name,
          passport: updatedClient.passportNumber,
          passport_document: updatedClient.document.id,
          passportsize_photo: updatedClient.photo.id,
          agent_id: JSON.parse(localStorage.getItem("user")).id
        }
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/clients`,
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
          `${process.env.NEXT_PUBLIC_API_URL}/clients?populate=*&filters[agent_id][$eq]=${agent.id}&sort=createdAt:desc`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
          }
        );
        
        setClients(refreshedData.data.data);
        setNewClient({ name: "", passportNumber: "", photo: null, document: null });
        setIsAddClientModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding client:", error);
      // Handle error appropriately (show error message to user)
    }
  }

  const handleEditClient = (updatedClient) => {
    setClients(
      clients.map(client => client.id === updatedClient.id ? updatedClient : client)
    )
    setIsEditClientModalOpen(false)
  }

  const handleDeleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id))
  }

  const ClientModal = ({ isOpen, onClose, client, onSave, isEditing }) => {
    const [localName, setLocalName] = useState(client?.name || "")
    const [localPassportNumber, setLocalPassportNumber] = useState(client?.passportNumber || "")
    const [localDocument, setLocalDocument] = useState(client?.document || null)
    const [localPhoto, setLocalPhoto] = useState(client?.photo || null)
    const [localPhotoId, setLocalPhotoId] = useState(null)


    return (
      (<Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Client" : "Add New Client"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="passportNumber">Passport Number</Label>
              <Input
                id="passportNumber"
                value={localPassportNumber}
                onChange={(e) => setLocalPassportNumber(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="document">Document Upload</Label>
              {localDocument ? (
                <div className="mt-2 flex items-center justify-between p-2 border rounded">
                  {localDocument.mime.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(localDocument)}
                      alt="Uploaded document"
                      className="w-16 h-16 object-cover" />
                  ) : (
                    <span>{localDocument.name}</span>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => setLocalDocument(null)}>
                    Remove
                  </Button>
                </div>
              ) : (
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
                      accept=".svg,.png,.jpg,.gif,.pdf"
                      onChange={async(e) => {
                        e.stopPropagation();
                        const file = e.target.files[0];
                        if (file) {

                          try {
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
                          
                        }
                      }} />
                  </label>
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="photo">Passport Size Photo</Label>
              {localPhoto ? (
                <div className="mt-2 flex items-center justify-between p-2 border rounded">
                  <img
                    src={localPhoto}
                    alt="Passport Size Photo"
                    className="w-16 h-16 object-cover" />
                  <Button variant="destructive" size="sm" onClick={() => setLocalPhoto(null)}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-photo"
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
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                      id="dropzone-photo"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={async(e) => {
                        e.stopPropagation();
                        const file = e.target.files[0];
                        if (file) {
                          

                          try {
                            var formdata = new FormData();
formdata.append("files", file);
                            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload/`,formdata,{headers:{
                              'Content-Type': 'multipart/form-data',
                              Authorization: `Bearer ${localStorage.getItem("jwt")}`,

                          
                              
                              
                            }})

                            console.log(res.data);
                            const updatedClient = { ...client, document: file,passport_document:res.data[0].id };
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              console.log(reader.result,"j");
                              
                              setLocalPhoto(reader.result);
                            };
                            reader.readAsDataURL(file);
                            setLocalPhotoId(res.data[0])
                            
                          } catch (error) {
                            
                          }
                        }
                      }} />
                  </label>
                </div>
              )}
            </div>
            <Button
              onClick={() => {
                const updatedClient = {
                  name: localName,
                  passportNumber: localPassportNumber,
                  document: localDocument,
                  photo: localPhotoId
                };
                onSave(updatedClient);
              }}>
              {isEditing ? "Save Changes" : "Add Client"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>)
    );
  }

  return (
    (<div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8" />
        </div>
        <Button onClick={() => setIsAddClientModalOpen(true)}>Add Client</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Passport Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={`${client.passportsize_photo[0].formats.small.url}`} />
                  <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.passport}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (client) {
                        setEditingClient({...client});
                        setIsEditClientModalOpen(true);
                      }
                    }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteClient(client.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setSelectedClient(client)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>
          Next <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      <ClientModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        client={newClient}
        onSave={handleAddClient}
        isEditing={false} />
      <ClientModal
        isOpen={isEditClientModalOpen}
        onClose={() => setIsEditClientModalOpen(false)}
        client={editingClient}
        onSave={handleEditClient}
        isEditing={true} />
      {selectedClient && (
        <div
          className="fixed inset-y-0 right-0 w-96 bg-background shadow-lg p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Client Details</h2>
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={`${selectedClient.passportsize_photo[0].formats.small.url}`} />
            <AvatarFallback>{selectedClient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <p><strong>Name:</strong> {selectedClient.name}</p>
            <p><strong>Passport Number:</strong> {selectedClient.passport}</p>
            {selectedClient?.passportsize_photo && (
              <div>
                <strong>Uploaded Document:</strong>
                <div className="mt-2 flex items-center justify-between p-2 border rounded">
                  <img
                    src={`${selectedClient.passportsize_photo[0].url}`}
                    alt="Passport Size Photo"
                    className="w-16 h-16 object-cover" />
                 <div className='flex gap-2'>
                 <Button variant="destructive" size="sm"   onClick={() => setLocalDocument(null)}>
                  <TrashIcon className="w-5 h-5" />
                  </Button>
                  <Button  size="sm" onClick={() => setLocalDocument(null)}>
                  <Download className="w-5 h-5" />
                  </Button>
                 </div>
                </div>

                <div className="mt-2 flex items-center justify-between p-2 border rounded">
                 
                    <span>{selectedClient.passport_document[0].name}</span>
                 
                    <div className='flex gap-2'>
                 <Button variant="destructive" size="sm"   onClick={() => setLocalDocument(null)}>
                  <TrashIcon className="w-5 h-5" />
                  </Button>
                  <Button  size="sm" onClick={() => setLocalDocument(null)}>
                  <Download className="w-5 h-5" />
                  </Button>
                 </div>
                </div>


                <p>{selectedClient.passport_document.name}</p>
                {/* <Button
                  className="mt-2"
                  onClick={() => {
                    const url = URL.createObjectURL(selectedClient.passport_document);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = selectedClient.passport_document;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}>
                  Download
                </Button> */}
              </div>
            )}
          </div>
          <Separator className="my-4" />
          <h3 className="font-bold mb-2">Activities</h3>
          <ScrollArea className="h-64">
            <ul className="space-y-2">
              <li>Application submitted - 2023-06-01</li>
              <li>Document verification - 2023-06-05</li>
              <li>Interview scheduled - 2023-06-10</li>
              {/* Add more activities as needed */}
            </ul>
          </ScrollArea>
          <Button className="mt-4 w-full" onClick={() => setSelectedClient(null)}>Close</Button>
        </div>
      )}
    </div>)
  );
}