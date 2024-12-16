'use server';
export async function getClientDetails(clientId) {
  // This is a mock implementation. In a real application, you would fetch this data from your database or API.
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay

  const clientsData = {
    'john-doe': {
      name: 'John Doe',
      passportNumber: 'A1234567',
      passportPhoto: '/placeholder.svg?height=200&width=200',
      passportDocument: '/placeholder.pdf',
      documents: [
        { type: 'pdf', url: '/placeholder.pdf', name: 'Visa Application' },
        { type: 'image', url: '/placeholder.svg?height=200&width=200', name: 'Travel Insurance' },
        { type: 'pdf', url: '/placeholder.pdf', name: 'Employment Contract' },
      ]
    },
    'jane-smith': {
      name: 'Jane Smith',
      passportNumber: 'B9876543',
      passportPhoto: '/placeholder.svg?height=200&width=200',
      passportDocument: '/placeholder.pdf',
      documents: [
        { type: 'pdf', url: '/placeholder.pdf', name: 'Work Permit' },
        { type: 'image', url: '/placeholder.svg?height=200&width=200', name: 'Medical Certificate' },
      ]
    },
    'bob-johnson': {
      name: 'Bob Johnson',
      passportNumber: 'C5678901',
      passportPhoto: '/placeholder.svg?height=200&width=200',
      passportDocument: '/placeholder.pdf',
      documents: [
        { type: 'pdf', url: '/placeholder.pdf', name: 'Housing Contract' },
        { type: 'image', url: '/placeholder.svg?height=200&width=200', name: 'Bank Statement' },
        { type: 'pdf', url: '/placeholder.pdf', name: 'Language Proficiency Certificate' },
      ]
    }
  }

  const clientData = clientsData[clientId]
  if (!clientData) {
    throw new Error('Client not found')
  }

  return {
    ...clientData,
    documents: clientData.documents || []
  }
}

