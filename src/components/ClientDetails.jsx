import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientDetails({
  clientId
}) {
  const [clientData, setClientData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchClientDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        // const data = await getClientDetails(clientId)
        setClientData(data)
      } catch (error) {
        console.error('Error fetching client details:', error)
        setError('Failed to fetch client details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchClientDetails()
  }, [clientId])

  if (loading) {
    return <div>Loading client details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!clientData) {
    return <div>No client data found.</div>;
  }

  return (
    (<Card>
      <CardHeader>
        <CardTitle>{clientData.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <strong>Passport Number:</strong> {clientData.passportNumber}
        </div>
        <div>
          <strong>Passport Photo:</strong>
          <div className="mt-2">
            <Image
              src={clientData.passportPhoto}
              alt="Passport Photo"
              width={200}
              height={200}
              className="rounded-md" />
          </div>
        </div>
        <div>
          <strong>Passport Document:</strong>
          <div className="mt-2">
            <a
              href={clientData.passportDocument}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline">
              View Passport Document (PDF)
            </a>
          </div>
        </div>
        <div>
          <strong>Related Documents:</strong>
          {clientData.documents && clientData.documents.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {clientData.documents.map((doc, index) => (
                <li key={index}>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline">
                    {doc.name} ({doc.type.toUpperCase()})
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2">No related documents found.</p>
          )}
        </div>
      </CardContent>
    </Card>)
  );
}

