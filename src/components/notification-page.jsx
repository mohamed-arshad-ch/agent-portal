'use client';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, X } from "lucide-react"

// Mock data for notifications
const initialNotifications = [
  { id: 1, message: "New payment received from John Doe", timestamp: "2023-06-15 09:30 AM" },
  { id: 2, message: "Document approval required for Jane Smith", timestamp: "2023-06-14 02:45 PM" },
  { id: 3, message: "System maintenance scheduled for tonight", timestamp: "2023-06-13 11:00 AM" },
  { id: 4, message: "New client registration: Alice Johnson", timestamp: "2023-06-12 10:15 AM" },
  { id: 5, message: "Reminder: Team meeting at 3 PM today", timestamp: "2023-06-11 08:00 AM" },
]

export function NotificationPageComponent() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const handleCloseNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  return (
    (<div className="container mx-auto p-4 max-w-4xl">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          <Bell className="mr-2 h-6 w-6" />
          Notifications
        </h1>
        <ScrollArea className="h-[calc(100vh-8rem)] rounded-md border">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications to display.
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start justify-between bg-card rounded-lg p-4 shadow-sm">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.message}</p>
                    <p className="text-sm text-muted-foreground">{notification.timestamp}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCloseNotification(notification.id)}
                    className="shrink-0 ml-2 -mt-1">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close notification</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>)
  );
}