'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from 'react-hot-toast';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Settings, Save } from "lucide-react"

export function SettingsPageComponent() {
  const [settings, setSettings] = useState({
    projectName: "Vizavostok Portal",
    description: "A comprehensive portal for managing documents and payments.",
    language: "en",
    timezone: "UTC",
    notificationsEnabled: true,
    emailNotifications: true,
    autoSave: false,
    theme: "light",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name) => {
    setSettings(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const handleSelectChange = (name, value) => {
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically save the settings to your backend
    console.log("Saving settings:", settings)
    toast({
      title: "Settings saved",
      description: "Your project settings have been updated successfully.",
    })
  }

  return (
    (
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          <Settings className="mr-2 h-6 w-6" />
          Project Settings
        </h1>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              name="projectName"
              value={settings.projectName}
              onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              name="description"
              value={settings.description}
              onChange={handleInputChange}
              rows={3} />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={settings.language}
              onValueChange={(value) => handleSelectChange("language", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={settings.timezone}
              onValueChange={(value) => handleSelectChange("timezone", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                <SelectItem value="CET">Central European Time (CET)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notificationsEnabled">Enable Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications about important updates</p>
            </div>
            <Switch
              id="notificationsEnabled"
              checked={settings.notificationsEnabled}
              onCheckedChange={() => handleSwitchChange("notificationsEnabled")} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => handleSwitchChange("emailNotifications")} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoSave">Auto-save</Label>
              <p className="text-sm text-muted-foreground">Automatically save changes</p>
            </div>
            <Switch
              id="autoSave"
              checked={settings.autoSave}
              onCheckedChange={() => handleSwitchChange("autoSave")} />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={settings.theme}
              onValueChange={(value) => handleSelectChange("theme", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-4">
            <Button onClick={handleSave} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    )
  );
}