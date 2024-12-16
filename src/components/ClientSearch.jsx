import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ClientDetails from './ClientDetails'


const clients = [
  { value: "john-doe", label: "John Doe" },
  { value: "jane-smith", label: "Jane Smith" },
  { value: "bob-johnson", label: "Bob Johnson" },
]

export default function ClientSearch() {
  const [selectedClient, setSelectedClient] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const handleSelect = (value) => {
    setSelectedClient(value)
    setShowDetails(false)
  }

  return (
    (<div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.value} value={client.value}>
                {client.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => setShowDetails(true)} disabled={!selectedClient}>
          Get Client Details
        </Button>
      </div>
      {showDetails && selectedClient && (
        <ClientDetails clientId={selectedClient} />
      )}
    </div>)
  );
}

