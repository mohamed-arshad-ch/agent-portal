import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ClientDetails from './ClientDetails'
import { Input } from './ui/input'
import axios from 'axios'


const clients = [
  { value: "john-doe", label: "John Doe" },
  { value: "jane-smith", label: "Jane Smith" },
  { value: "bob-johnson", label: "Bob Johnson" },
]

export default function ClientSearch() {
  const [selectedClient, setSelectedClient] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [displayClientName, setDisplayClientName] = useState("")
  const [clientSearch, setClientSearch] = useState("")
  const [clientList, setClientList] = useState([])
  const handleSelect = (value) => {
    setSelectedClient(value)
    setShowDetails(false)
  }

  const handleClientSelect = (client) => {
    setSelectedClient(client.documentId)
    setDisplayClientName(client.name)
    setClientSearch("")
  }

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

  return (
    (<div className="space-y-4">
      <div className="flex items-center space-x-4">
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

