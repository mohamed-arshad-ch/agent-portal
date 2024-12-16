import { useState } from 'react'
import InvoicePreview from './components/InvoicePreview'

const initialInvoice = {
  customerName: 'Harper Russo',
  customerEmail: 'hello@reallygreatsite.com',
  items: [
    { description: 'Photography service', quantity: 1, unitPrice: 500 },
    { description: 'Videography service', quantity: 1, unitPrice: 1000 },
    { description: 'Video editing', quantity: 2, unitPrice: 250 },
    { description: 'Transportation fee', quantity: 1, unitPrice: 100 },
  ],
  invoiceNumber: '01234',
  dateIssued: '20 August 2030',
  bankName: 'Rimberio',
  accountNo: '0123 4567 8901',
  accountName: 'Hannah Morales'
}

export default function CreateInvoicePage() {
  const [invoice, setInvoice] = useState(initialInvoice)

  const handleUpdateInvoice = (updatedInvoice) => {
    setInvoice(updatedInvoice)
  }

  return (
    (<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice</h1>
      <InvoicePreview invoice={invoice} onUpdateInvoice={handleUpdateInvoice} />
    </div>)
  );
}

