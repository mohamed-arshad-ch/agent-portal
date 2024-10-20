'use client';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Globe, Eye, Edit, Trash2, Plus } from "lucide-react"

// Mock data for countries and their visa details
const initialCountries = [
  {
    id: 1,
    name: "United States",
    status: "active",
    visaDetails: [
      { id: 1, description: "Tourist Visa", type: "B2", cost: 160 },
      { id: 2, description: "Business Visa", type: "B1", cost: 160 },
    ]
  },
  {
    id: 2,
    name: "United Kingdom",
    status: "active",
    visaDetails: [
      { id: 3, description: "Standard Visitor Visa", type: "Short-term", cost: 95 },
    ]
  },
  {
    id: 3,
    name: "Japan",
    status: "inactive",
    visaDetails: [
      { id: 4, description: "Tourist Visa", type: "Single Entry", cost: 3000 },
      { id: 5, description: "Work Visa", type: "Long-term", cost: 6000 },
    ]
  },
]

export function VisaDetailsPageComponent() {
  const [countries, setCountries] = useState(initialCountries)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [newVisaDetail, setNewVisaDetail] = useState({ description: '', type: '', cost: '' })
  const [editingCountry, setEditingCountry] = useState(null)
  const [editingVisa, setEditingVisa] = useState(null)
  const [isAddCountryModalOpen, setIsAddCountryModalOpen] = useState(false)
  const [newCountry, setNewCountry] = useState({ name: '', status: 'active' })

  const handleStatusChange = (id) => {
    setCountries(countries.map(country => 
      country.id === id ? { ...country, status: country.status === 'active' ? 'inactive' : 'active' } : country))
  }

  const handleViewDetails = (country) => {
    setSelectedCountry(country)
  }

  const handleAddVisaDetail = () => {
    if (selectedCountry) {
      const updatedCountries = countries.map(country => {
        if (country.id === selectedCountry.id) {
          return {
            ...country,
            visaDetails: [
              ...country.visaDetails,
              { id: Date.now(), ...newVisaDetail, cost: Number(newVisaDetail.cost) }
            ]
          };
        }
        return country
      })
      setCountries(updatedCountries)
      setSelectedCountry(updatedCountries.find(c => c.id === selectedCountry.id))
      setNewVisaDetail({ description: '', type: '', cost: '' })
      setIsAddModalOpen(false)
    }
  }

  const handleDeleteVisaDetail = (countryId, visaDetailId) => {
    const updatedCountries = countries.map(country => {
      if (country.id === countryId) {
        return {
          ...country,
          visaDetails: country.visaDetails.filter(detail => detail.id !== visaDetailId)
        };
      }
      return country
    })
    setCountries(updatedCountries)
    setSelectedCountry(updatedCountries.find(c => c.id === countryId))
  }

  const handleEditClick = (country, visa = null) => {
    setEditingCountry(country)
    setEditingVisa(visa)
    setIsEditModalOpen(true)
  }

  const handleEditSave = () => {
    const updatedCountries = countries.map(country => {
      if (country.id === editingCountry.id) {
        if (editingVisa) {
          return {
            ...country,
            visaDetails: country.visaDetails.map(visa =>
              visa.id === editingVisa.id ? editingVisa : visa)
          };
        } else {
          return editingCountry
        }
      }
      return country
    })
    setCountries(updatedCountries)
    setSelectedCountry(updatedCountries.find(c => c.id === editingCountry.id))
    setIsEditModalOpen(false)
    setEditingCountry(null)
    setEditingVisa(null)
  }

  const handleAddCountry = () => {
    const newCountryWithId = { ...newCountry, id: Date.now(), visaDetails: [] }
    setCountries([...countries, newCountryWithId])
    setNewCountry({ name: '', status: 'active' })
    setIsAddCountryModalOpen(false)
  }

  return (
    (<div className="container mx-auto p-4 flex">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold flex items-center">
            <Globe className="mr-2 h-6 w-6" />
            Visa Details by Country
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddCountryModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Country
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {countries.map((country) => (
              <TableRow key={country.id}>
                <TableCell>{country.name}</TableCell>
                <TableCell>
                  <Switch
                    checked={country.status === 'active'}
                    onCheckedChange={() => handleStatusChange(country.id)} />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(country)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(country)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedCountry && (
        <div
          className="w-1/3 ml-4 bg-background border-l p-4 fixed right-0 top-0 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{selectedCountry.name} Visa Details</h2>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Visa
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-4">
              {selectedCountry.visaDetails.map((visa) => (
                <Card key={visa.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{visa.description}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Type of Visa:</strong> {visa.type}</p>
                    <p><strong>Cost of Visa:</strong> ${visa.cost}</p>
                    <div className="flex justify-end mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleEditClick(selectedCountry, visa)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteVisaDetail(selectedCountry.id, visa.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Visa Detail</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newVisaDetail.description}
                onChange={(e) => setNewVisaDetail({ ...newVisaDetail, description: e.target.value })}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type of Visa
              </Label>
              <Input
                id="type"
                value={newVisaDetail.type}
                onChange={(e) => setNewVisaDetail({ ...newVisaDetail, type: e.target.value })}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cost" className="text-right">
                Cost of Visa
              </Label>
              <Input
                id="cost"
                type="number"
                value={newVisaDetail.cost}
                onChange={(e) => setNewVisaDetail({ ...newVisaDetail, cost: e.target.value })}
                className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleAddVisaDetail}>Add Visa Detail</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingVisa ? 'Edit Visa Detail' : 'Edit Country'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!editingVisa && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="countryName" className="text-right">
                  Country Name
                </Label>
                <Input
                  id="countryName"
                  value={editingCountry?.name || ''}
                  onChange={(e) => setEditingCountry({ ...editingCountry, name: e.target.value })}
                  className="col-span-3" />
              </div>
            )}
            {editingVisa && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={editingVisa.description}
                    onChange={(e) => setEditingVisa({ ...editingVisa, description: e.target.value })}
                    className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type of Visa
                  </Label>
                  <Input
                    id="type"
                    value={editingVisa.type}
                    onChange={(e) => setEditingVisa({ ...editingVisa, type: e.target.value })}
                    className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cost" className="text-right">
                    Cost of Visa
                  </Label>
                  <Input
                    id="cost"
                    type="number"
                    value={editingVisa.cost}
                    onChange={(e) => setEditingVisa({ ...editingVisa, cost: Number(e.target.value) })}
                    className="col-span-3" />
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleEditSave}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddCountryModalOpen} onOpenChange={setIsAddCountryModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Country</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="countryName" className="text-right">
                Country Name
              </Label>
              <Input
                id="countryName"
                value={newCountry.name}
                onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="countryStatus" className="text-right">
                Status
              </Label>
              <Select
                value={newCountry.status}
                onValueChange={(value) => setNewCountry({ ...newCountry, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleAddCountry}>Add Country</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>)
  );
}