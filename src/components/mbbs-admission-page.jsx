'use client';
import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, Plus, GraduationCap, Edit, Trash2, X } from "lucide-react";

// Mock data for countries and universities
const initialCountries = [
  {
    id: 1,
    name: "Russia",
    status: "active",
    universities: [
      {
        id: 1,
        name: "Moscow State University",
        status: "Open",
        images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
        description: {
          short: "Top-ranked university in Russia",
          long: "Moscow State University is one of the oldest and most prestigious universities in Russia, known for its excellent MBBS program."
        },
        whyChooseUs: [
          "World-class faculty",
          "State-of-the-art facilities",
          "International student support",
          "Research opportunities"
        ],
        feeStructure: [
          { year: "1st year", inr: "4,40,000", ruble: "4,07,500" },
          { year: "2nd year", inr: "4,40,000", ruble: "4,07,500" },
          { year: "3rd year", inr: "4,40,000", ruble: "4,07,500" },
          { year: "4th year", inr: "4,40,000", ruble: "4,07,500" },
          { year: "5th year", inr: "4,40,000", ruble: "4,07,500" },
          { year: "6th year", inr: "4,40,000", ruble: "4,07,500" },
        ],
        otherExpenses: {
          food: "6000 Rubles",
          accommodation: "4000 Rubles",
          medicalInsurance: "4500 Rubles",
          visaExtension: "2500 Rubles"
        },
        installments: [
          { name: "Application", amount: "3,500 ₹" },
          { name: "Admission Letter", amount: "60,000 ₹" },
          { name: "Documentations, Apostille, Translation, Embassy Fee, Visa Processing", amount: "1,50,000 ₹" },
          { name: "Contract Preparation and Consultation", amount: "80,000 ₹" }
        ],
        cityDetails: "Moscow is the capital city of Russia, known for its rich history, culture, and educational institutions."
      }
    ]
  },
  {
    id: 2,
    name: "Ukraine",
    status: "inactive",
    universities: []
  }
]

export function MbbsAdmissionPage() {
  const [countries, setCountries] = useState(initialCountries)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedUniversity, setSelectedUniversity] = useState(null)
  const [isAddUniversityModalOpen, setIsAddUniversityModalOpen] = useState(false)
  const [isEditUniversityModalOpen, setIsEditUniversityModalOpen] = useState(false)
  const [isAddCountryModalOpen, setIsAddCountryModalOpen] = useState(false)
  const [editingUniversity, setEditingUniversity] = useState(null)
  const [newCountry, setNewCountry] = useState({ name: '', status: 'active' })
  const [newUniversity, setNewUniversity] = useState({
    name: '',
    status: 'Open',
    images: [],
    description: { short: '', long: '' },
    whyChooseUs: [''],
    feeStructure: [
      { year: "1st year", inr: "", ruble: "" },
      { year: "2nd year", inr: "", ruble: "" },
      { year: "3rd year", inr: "", ruble: "" },
      { year: "4th year", inr: "", ruble: "" },
      { year: "5th year", inr: "", ruble: "" },
      { year: "6th year", inr: "", ruble: "" },
    ],
    otherExpenses: {
      food: "",
      accommodation: "",
      medicalInsurance: "",
      visaExtension: ""
    },
    installments: [
      { name: "Application", amount: "" },
      { name: "Admission Letter", amount: "" },
      { name: "Documentations, Apostille, Translation, Embassy Fee, Visa Processing", amount: "" },
      { name: "Contract Preparation and Consultation", amount: "" }
    ],
    cityDetails: ""
  })

  const fileInputRef = useRef(null)

  const handleViewDetails = (country) => {
    setSelectedCountry(country)
  }

  const handleUniversityClick = (university) => {
    setSelectedUniversity(university)
  }

  const handleAddCountry = () => {
    const updatedCountries = [...countries, { ...newCountry, id: Date.now(), universities: [] }]
    setCountries(updatedCountries)
    setNewCountry({ name: '', status: 'active' })
    setIsAddCountryModalOpen(false)
  }

  const handleAddUniversity = () => {
    if (selectedCountry) {
      const updatedCountries = countries.map(country => {
        if (country.id === selectedCountry.id) {
          return {
            ...country,
            universities: [...country.universities, { ...newUniversity, id: Date.now() }]
          };
        }
        return country
      })
      setCountries(updatedCountries)
      setSelectedCountry(updatedCountries.find(c => c.id === selectedCountry.id))
      setIsAddUniversityModalOpen(false)
      setNewUniversity({
        name: '',
        status: 'Open',
        images: [],
        description: { short: '', long: '' },
        whyChooseUs: [''],
        feeStructure: [
          { year: "1st year", inr: "", ruble: "" },
          { year: "2nd year", inr: "", ruble: "" },
          { year: "3rd year", inr: "", ruble: "" },
          { year: "4th year", inr: "", ruble: "" },
          { year: "5th year", inr: "", ruble: "" },
          { year: "6th year", inr: "", ruble: "" },
        ],
        otherExpenses: {
          food: "",
          accommodation: "",
          medicalInsurance: "",
          visaExtension: ""
        },
        installments: [
          { name: "Application", amount: "" },
          { name: "Admission Letter", amount: "" },
          { name: "Documentations, Apostille, Translation, Embassy Fee, Visa Processing", amount: "" },
          { name: "Contract Preparation and Consultation", amount: "" }
        ],
        cityDetails: ""
      })
    }
  }

  const handleEditUniversity = (university) => {
    setEditingUniversity(university)
    setIsEditUniversityModalOpen(true)
  }

  const handleUpdateUniversity = () => {
    if (selectedCountry && editingUniversity) {
      const updatedCountries = countries.map(country => {
        if (country.id === selectedCountry.id) {
          return {
            ...country,
            universities: country.universities.map(uni => 
              uni.id === editingUniversity.id ? editingUniversity : uni)
          };
        }
        return country
      })
      setCountries(updatedCountries)
      setSelectedCountry(updatedCountries.find(c => c.id === selectedCountry.id))
      setIsEditUniversityModalOpen(false)
      setEditingUniversity(null)
    }
  }

  const handleDeleteUniversity = (universityId) => {
    if (selectedCountry) {
      const updatedCountries = countries.map(country => {
        if (country.id === selectedCountry.id) {
          return {
            ...country,
            universities: country.universities.filter(uni => uni.id !== universityId)
          };
        }
        return country
      })
      setCountries(updatedCountries)
      setSelectedCountry(updatedCountries.find(c => c.id === selectedCountry.id))
    }
  }

  const handleFileChange = (event, isEditing = false) => {
    const files = Array.from(event.target.files)
    const fileUrls = files.map(file => URL.createObjectURL(file))
    
    if (isEditing) {
      setEditingUniversity(prev => ({
        ...prev,
        images: [...prev.images, ...fileUrls]
      }))
    } else {
      setNewUniversity(prev => ({
        ...prev,
        images: [...prev.images, ...fileUrls]
      }))
    }
  }

  const handleRemoveImage = (index, isEditing = false) => {
    if (isEditing) {
      setEditingUniversity(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }))
    } else {
      setNewUniversity(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }))
    }
  }

  return (
    (<div className="container mx-auto p-4 flex">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold flex items-center">
            <GraduationCap className="mr-2 h-6 w-6" />
            MBBS Admission
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
                <TableCell>{country.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(country)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
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
            <h2 className="text-xl font-bold">{selectedCountry.name} Universities</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddUniversityModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add University
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-4">
              {selectedCountry.universities.map((university) => (
                <Card key={university.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{university.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Status:</strong> {university.status}</p>
                    <div className="flex justify-end mt-2 space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUniversityClick(university)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUniversity(university)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUniversity(university.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      {selectedUniversity && (
        <Dialog
          open={!!selectedUniversity}
          onOpenChange={() => setSelectedUniversity(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedUniversity.name}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
                <TabsTrigger value="city">City</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {selectedUniversity.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`University ${index + 1}`}
                      className="w-full h-40 object-cover rounded" />
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold">Short Description</h3>
                    <p>{selectedUniversity.description.short}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold">Long Description</h3>
                    <p>{selectedUniversity.description.long}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">Why Choose Us</h3>
                    <ul className="list-disc list-inside">
                      {selectedUniversity.whyChooseUs.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="fees">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold">Fee Structure</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Year</TableHead>
                          <TableHead>INR</TableHead>
                          <TableHead>Ruble</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedUniversity.feeStructure.map((fee, index) => (
                          <TableRow key={index}>
                            <TableCell>{fee.year}</TableCell>
                            <TableCell>{fee.inr}</TableCell>
                            <TableCell>{fee.ruble}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-bold">TOTAL FEES</TableCell>
                          <TableCell className="font-bold">
                            {selectedUniversity.feeStructure.reduce((total, fee) => total + parseInt(fee.inr.replace(/,/g, '')), 0).toLocaleString('en-IN')}
                          </TableCell>
                          <TableCell className="font-bold">
                            {selectedUniversity.feeStructure.reduce((total, fee) => total + parseInt(fee.ruble.replace(/,/g, '')), 0).toLocaleString('en-IN')}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <p className="text-sm mt-2">(1 INR = 108 RUB (APPROX FOR CALCULATION), ACTUAL RATE AT THE TIME OF PAYMENT WILL BE CALCULATED ACCORDING TO THE CURRENCY EXCHANGE RATE)</p>
                  </div>
                  <div>
                    <h3 className="font-bold">Other Expenses</h3>
                    <ul>
                      <li>FOOD/MONTH: {selectedUniversity.otherExpenses.food}</li>
                      <li>ACCOMMODATION/MONTH: {selectedUniversity.otherExpenses.accommodation}</li>
                      <li>MEDICAL INSURANCE/YEAR: {selectedUniversity.otherExpenses.medicalInsurance}</li>
                      <li>VISA EXTENSION/YEAR: {selectedUniversity.otherExpenses.visaExtension}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold">First Four Installments to Pay in India</h3>
                    <ul>
                      {selectedUniversity.installments.map((installment, index) => (
                        <li key={index}>{installment.name}: {installment.amount}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="city">
                <div>
                  <h3 className="font-bold">City Details</h3>
                  <p>{selectedUniversity.cityDetails}</p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
      <Dialog open={isAddCountryModalOpen} onOpenChange={setIsAddCountryModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Country</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country-name" className="text-right">
                Country Name
              </Label>
              <Input
                id="country-name"
                value={newCountry.name}
                onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country-status" className="text-right">
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
          <div className="flex justify-end mt-4">
            <Button onClick={handleAddCountry}>Add Country</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isAddUniversityModalOpen}
        onOpenChange={setIsAddUniversityModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New University</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                University Name
              </Label>
              <Input
                id="name"
                value={newUniversity.name}
                onChange={(e) => setNewUniversity({ ...newUniversity, name: e.target.value })}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="images" className="text-right">
                Images
              </Label>
              <div className="col-span-3">
                <Input
                  id="images"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e)}
                  className="hidden"
                  ref={fileInputRef} />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current.click()}>
                  Select Images
                </Button>
                <div className="mt-2 flex flex-wrap gap-2">
                  {newUniversity.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Selected ${index + 1}`}
                        className="w-20 h-20 object-cover rounded" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-0 right-0 h-5 w-5"
                        onClick={() => handleRemoveImage(index)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shortDescription" className="text-right">
                Short Description
              </Label>
              <Textarea
                id="shortDescription"
                value={newUniversity.description.short}
                onChange={(e) => setNewUniversity(
                  { ...newUniversity, description: { ...newUniversity.description, short: e.target.value } }
                )}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="longDescription" className="text-right">
                Long Description
              </Label>
              <Textarea
                id="longDescription"
                value={newUniversity.description.long}
                onChange={(e) => setNewUniversity(
                  { ...newUniversity, description: { ...newUniversity.description, long: e.target.value } }
                )}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Why Choose Us
              </Label>
              <div className="col-span-3 space-y-2">
                {newUniversity.whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={reason}
                      onChange={(e) => {
                        const newReasons = [...newUniversity.whyChooseUs];
                        newReasons[index] = e.target.value;
                        setNewUniversity({ ...newUniversity, whyChooseUs: newReasons });
                      }} />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newReasons = [...newUniversity.whyChooseUs];
                        newReasons.splice(index, 1);
                        setNewUniversity({ ...newUniversity, whyChooseUs: newReasons });
                      }}>
                      -
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNewUniversity({ ...newUniversity, whyChooseUs: [...newUniversity.whyChooseUs, ''] })}>
                  Add Reason
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Fee Structure
              </Label>
              <div className="col-span-3 space-y-2">
                {newUniversity.feeStructure.map((fee, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={fee.inr}
                      onChange={(e) => {
                        const newFees = [...newUniversity.feeStructure];
                        newFees[index].inr = e.target.value;
                        setNewUniversity({ ...newUniversity, feeStructure: newFees });
                      }}
                      placeholder="INR" />
                    <Input
                      value={fee.ruble}
                      onChange={(e) => {
                        const newFees = [...newUniversity.feeStructure];
                        newFees[index].ruble = e.target.value;
                        setNewUniversity({ ...newUniversity, feeStructure: newFees });
                      }}
                      placeholder="Ruble" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Other Expenses
              </Label>
              <div className="col-span-3 space-y-2">
                <Input
                  value={newUniversity.otherExpenses.food}
                  onChange={(e) => setNewUniversity(
                    { ...newUniversity, otherExpenses: { ...newUniversity.otherExpenses, food: e.target.value } }
                  )}
                  placeholder="FOOD/MONTH (Rubles)" />
                <Input
                  value={newUniversity.otherExpenses.accommodation}
                  onChange={(e) => setNewUniversity(
                    { ...newUniversity, otherExpenses: { ...newUniversity.otherExpenses, accommodation: e.target.value } }
                  )}
                  placeholder="ACCOMMODATION/MONTH (Rubles)" />
                <Input
                  value={newUniversity.otherExpenses.medicalInsurance}
                  onChange={(e) => setNewUniversity(
                    { ...newUniversity, otherExpenses: { ...newUniversity.otherExpenses, medicalInsurance: e.target.value } }
                  )}
                  placeholder="MEDICAL INSURANCE/YEAR (Rubles)" />
                <Input
                  value={newUniversity.otherExpenses.visaExtension}
                  onChange={(e) => setNewUniversity(
                    { ...newUniversity, otherExpenses: { ...newUniversity.otherExpenses, visaExtension: e.target.value } }
                  )}
                  placeholder="VISA EXTENSION/YEAR (Rubles)" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                First Four Installments
              </Label>
              <div className="col-span-3 space-y-2">
                {newUniversity.installments.map((installment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={installment.amount}
                      onChange={(e) => {
                        const newInstallments = [...newUniversity.installments];
                        newInstallments[index].amount = e.target.value;
                        setNewUniversity({ ...newUniversity, installments: newInstallments });
                      }}
                      placeholder={installment.name} />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cityDetails" className="text-right">
                City Details
              </Label>
              <Textarea
                id="cityDetails"
                value={newUniversity.cityDetails}
                onChange={(e) => setNewUniversity({ ...newUniversity, cityDetails: e.target.value })}
                className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleAddUniversity}>Add University</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isEditUniversityModalOpen}
        onOpenChange={setIsEditUniversityModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit University</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                University Name
              </Label>
              <Input
                id="edit-name"
                value={editingUniversity?.name || ''}
                onChange={(e) => setEditingUniversity({ ...editingUniversity, name: e.target.value })}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-images" className="text-right">
                Images
              </Label>
              <div className="col-span-3">
                <Input
                  id="edit-images"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, true)}
                  className="hidden"
                  ref={fileInputRef} />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current.click()}>
                  Select Images
                </Button>
                <div className="mt-2 flex flex-wrap gap-2">
                  {editingUniversity?.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Selected ${index + 1}`}
                        className="w-20 h-20 object-cover rounded" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-0 right-0 h-5 w-5"
                        onClick={() => handleRemoveImage(index, true)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-shortDescription" className="text-right">
                Short Description
              </Label>
              <Textarea
                id="edit-shortDescription"
                value={editingUniversity?.description.short || ''}
                onChange={(e) => setEditingUniversity(
                  { ...editingUniversity, description: { ...editingUniversity.description, short: e.target.value } }
                )}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-longDescription" className="text-right">
                Long Description
              </Label>
              <Textarea
                id="edit-longDescription"
                value={editingUniversity?.description.long || ''}
                onChange={(e) => setEditingUniversity(
                  { ...editingUniversity, description: { ...editingUniversity.description, long: e.target.value } }
                )}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Why Choose Us
              </Label>
              <div className="col-span-3 space-y-2">
                {editingUniversity?.whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={reason}
                      onChange={(e) => {
                        const newReasons = [...editingUniversity.whyChooseUs];
                        newReasons[index] = e.target.value;
                        setEditingUniversity({ ...editingUniversity, whyChooseUs: newReasons });
                      }} />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newReasons = [...editingUniversity.whyChooseUs];
                        newReasons.splice(index, 1);
                        setEditingUniversity({ ...editingUniversity, whyChooseUs: newReasons });
                      }}>
                      -
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingUniversity(
                    { ...editingUniversity, whyChooseUs: [...editingUniversity.whyChooseUs, ''] }
                  )}>
                  Add Reason
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Fee Structure
              </Label>
              <div className="col-span-3 space-y-2">
                {editingUniversity?.feeStructure.map((fee, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={fee.inr}
                      onChange={(e) => {
                        const newFees = [...editingUniversity.feeStructure];
                        newFees[index].inr = e.target.value;
                        setEditingUniversity({ ...editingUniversity, feeStructure: newFees });
                      }}
                      placeholder="INR" />
                    <Input
                      value={fee.ruble}
                      onChange={(e) => {
                        const newFees = [...editingUniversity.feeStructure];
                        newFees[index].ruble = e.target.value;
                        setEditingUniversity({ ...editingUniversity, feeStructure: newFees });
                      }}
                      placeholder="Ruble" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Other Expenses
              </Label>
              <div className="col-span-3 space-y-2">
                <Input
                  value={editingUniversity?.otherExpenses.food}
                  onChange={(e) => setEditingUniversity(
                    { ...editingUniversity, otherExpenses: { ...editingUniversity.otherExpenses, food: e.target.value } }
                  )}
                  placeholder="FOOD/MONTH (Rubles)" />
                <Input
                  value={editingUniversity?.otherExpenses.accommodation}
                  onChange={(e) => setEditingUniversity(
                    { ...editingUniversity, otherExpenses: { ...editingUniversity.otherExpenses, accommodation: e.target.value } }
                  )}
                  placeholder="ACCOMMODATION/MONTH (Rubles)" />
                <Input
                  value={editingUniversity?.otherExpenses.medicalInsurance}
                  onChange={(e) => setEditingUniversity(
                    { ...editingUniversity, otherExpenses: { ...editingUniversity.otherExpenses, medicalInsurance: e.target.value } }
                  )}
                  placeholder="MEDICAL INSURANCE/YEAR (Rubles)" />
                <Input
                  value={editingUniversity?.otherExpenses.visaExtension}
                  onChange={(e) => setEditingUniversity(
                    { ...editingUniversity, otherExpenses: { ...editingUniversity.otherExpenses, visaExtension: e.target.value } }
                  )}
                  placeholder="VISA EXTENSION/YEAR (Rubles)" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                First Four Installments
              </Label>
              <div className="col-span-3 space-y-2">
                {editingUniversity?.installments.map((installment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={installment.amount}
                      onChange={(e) => {
                        const newInstallments = [...editingUniversity.installments];
                        newInstallments[index].amount = e.target.value;
                        setEditingUniversity({ ...editingUniversity, installments: newInstallments });
                      }}
                      placeholder={installment.name} />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-cityDetails" className="text-right">
                City Details
              </Label>
              <Textarea
                id="edit-cityDetails"
                value={editingUniversity?.cityDetails || ''}
                onChange={(e) => setEditingUniversity({ ...editingUniversity, cityDetails: e.target.value })}
                className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleUpdateUniversity}>Update University</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>)
  );
}