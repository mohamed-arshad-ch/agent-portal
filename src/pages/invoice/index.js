import InvoicePreview from '@/components/InvoicePreview'
import Layout from '@/components/Layout'
import { useState } from 'react'
import withAuth from '../../../app/leads/hooks/withAuth'


const initialInvoice = {
  customerName: 'Harper Russo',
  customerEmail: 'hello@reallygreatsite.com',
  customerPhone:"987742378234",
  items: [
    { description: '', quantity: 1, unitPrice: 500 },
   
  ],
  invoiceNumber: '01234',
  dateIssued: '20 August 2030',
  bankName: 'Rimberio',
  accountNo: '0123 4567 8901',
  accountName: 'Hannah Morales'
}

 function CreateInvoicePage() {
  const [invoice, setInvoice] = useState(initialInvoice)

  const handleUpdateInvoice = (updatedInvoice) => {
    setInvoice(updatedInvoice)
  }

  return (
    (<Layout>
        <div className="container mx-auto p-4 max-w-4xl">
      
      <InvoicePreview invoice={invoice} onUpdateInvoice={handleUpdateInvoice} />
    </div>
    </Layout>)
  );
}

export default withAuth(CreateInvoicePage)

