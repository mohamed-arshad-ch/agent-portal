'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Users, CreditCard, FileText, Bell, Settings, MoreVertical, Upload, UserCircle, LogOut } from "lucide-react"

export function AdminDashboardComponent() {
  const [activeTab, setActiveTab] = useState('Dashboard')

  const SidebarItem = ({
    icon,
    label
  }) => (
    <button
      className={`flex items-center space-x-2 w-full p-2 rounded ${
        activeTab === label ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
      }`}
      onClick={() => setActiveTab(label)}>
      {icon}
      <span>{label}</span>
    </button>
  )

  const DashboardCard = ({
    title,
    content
  }) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )

  const StatCard = ({
    icon,
    title,
    value
  }) => (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="p-2 bg-primary/10 rounded-full mr-4">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )

  const PaymentApprovalModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Approve Payment Slip</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Payment Slip</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="slipId">Slip ID</Label>
            <Input id="slipId" placeholder="Enter slip ID" />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="Enter amount" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Reject</Button>
            <Button>Approve</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const StatusUpdateModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update Client Status</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Client Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="clientId">Client ID</Label>
            <Input id="clientId" placeholder="Enter client ID" />
          </div>
          <div>
            <Label htmlFor="status">New Status</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Status</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Processing</DropdownMenuItem>
                <DropdownMenuItem>Passport Uploaded</DropdownMenuItem>
                <DropdownMenuItem>Completed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button className="w-full">Update Status</Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  const DocumentUploadModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Document</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="documentType">Document Type</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Document Type</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Submission Slip</DropdownMenuItem>
                <DropdownMenuItem>Invitation Letter</DropdownMenuItem>
                <DropdownMenuItem>Work Permit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-secondary/80">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <Button className="w-full">Upload</Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    (
      <>
         
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <StatCard
              icon={<Users className="w-6 h-6 text-primary" />}
              title="Total Clients"
              value="1,234" />
            <StatCard
              icon={<CreditCard className="w-6 h-6 text-primary" />}
              title="Pending Approvals"
              value="56" />
            <StatCard
              icon={<FileText className="w-6 h-6 text-primary" />}
              title="Total Documents"
              value="4,321" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              title="Notifications"
              content={
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>New client registration</span>
                      <span className="text-sm text-muted-foreground">2m ago</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span>Payment slip uploaded</span>
                      <span className="text-sm text-muted-foreground">1h ago</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span>Document approval required</span>
                      <span className="text-sm text-muted-foreground">3h ago</span>
                    </div>
                  </div>
                </ScrollArea>
              } />
            <DashboardCard
              title="Pending Tasks"
              content={
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="task1" />
                      <label htmlFor="task1">Review new applications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="task2" />
                      <label htmlFor="task2">Approve payment slips</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="task3" />
                      <label htmlFor="task3">Update client statuses</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="task4" />
                      <label htmlFor="task4">Send reminder emails</label>
                    </div>
                  </div>
                </ScrollArea>
              } />
            <DashboardCard
              title="Payment Approvals"
              content={
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    {['PAY001', 'PAY002', 'PAY003'].map((paymentId) => (
                      <div key={paymentId} className="flex justify-between items-center">
                        <span>{paymentId}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                            <DropdownMenuItem>Reject</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              } />
          </div>
         
          <div className="mt-8">
              <h4 className="text-gray-600">Recent Activities</h4>
              <div className="mt-4">
                <div className="bg-white shadow rounded-md overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Client
                        </th>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Action
                        </th>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src="/placeholder.svg?height=40&width=40"
                                alt="" />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">John Doe</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">Document Uploaded</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">2023-06-01</p>
                        </td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          
    </>)
  );
}