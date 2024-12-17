import { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import InvoiceFormModal from './InvoiceFormModal'

export default function InvoicePreview({
  invoice,
  onUpdateInvoice
}) {
  const componentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const calculateSubtotal = () => {
    return invoice.items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  }

 
  console.log(invoice);
  

  const calculateTotal = () => {
    return calculateSubtotal() 
  }

  const handlePrint = () => {
    window.print()
  }

  const handleEditInvoice = () => {
    setIsModalOpen(true)
  }

  const handleSaveInvoice = (updatedInvoice) => {
    onUpdateInvoice(updatedInvoice)
    setIsModalOpen(false)
  }

  return (
    (<div className="space-y-4">
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .invoice-preview, .invoice-preview * {
            visibility: visible;
          }
          .invoice-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 2rem;
          }
          .no-print {
            display: none;
          }
            @page {
    size: auto;
    margin: 5mm;
   
  }
        }
      `}</style>
      <div
        ref={componentRef}
        className="invoice-preview bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <h1 className="text-5xl font-bold tracking-tight pl-8">INVOICE</h1>
          <div className="border-2 border-black px-6 py-2">
            <span className="text-xl font-bold">{invoice.invoiceNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div>
              <h2 className="font-bold mb-1">Date Issued:</h2>
              <p>{invoice.dateIssued}</p>
            </div>
            <div>
              <h2 className="font-bold mb-1">Issued to:</h2>
              <p>{invoice.customerName}</p>
              {invoice.address && invoice.address.split("\n").map((line, index) => (
        <p key={index} className="mb-1">
          {line}
        </p>
      ))}
              
            </div>
            <div>
              <h2 className="font-bold mb-1">Transaction Type:</h2>
              <p>{invoice.transferType}</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <h2 className="font-bold mb-2">Vizavostok consultancy LLP</h2>
            <p>6/594,UK Tower, first floor, Machingal Bypass, Munduparamba Po, Malappuram 676509</p>
            <p>vizavostokconsultancy@gmail.com</p>
            <p>www.vizavostok.com</p>
            <p>+91 80890 61427</p>
          
           
          </div>
        </div>

        <table className="w-full mb-8">
          <thead >
            <tr className='bg-black'>
              <th className=" text-white text-left py-2 px-4">DESCRIPTION</th>
              <th className=" text-white text-center py-2 px-4">QTY</th>
              <th className=" text-white text-right py-2 px-4">PRICE</th>
              <th className=" text-white text-right py-2 px-4">TOTAL</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4 text-center">{item.quantity}</td>
                <td className="py-3 px-4 text-right"> {item.unitPrice.toFixed(2)}</td>
                <td className="py-3 px-4 text-right"> {(item.quantity * item.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
            {/* <tr>
              <td colSpan={2}></td>
              <td className="py-3 px-4 text-right font-bold">SUBTOTAL</td>
              <td className="py-3 px-4 text-right">₹ {calculateSubtotal().toFixed(2)}</td>
            </tr> */}
           
            <tr>
              <td colSpan={2}></td>
              <td className="py-3 px-4 text-right font-bold">GRAND TOTAL</td>
              <td className="py-3 px-4 text-right font-bold">₹ {calculateTotal().toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-8 mt-12">
       
          <div className="">
            <p className="text-5xl font-bold text-gray-300">THANK YOU</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2 no-print">
        <Button onClick={handleEditInvoice}>Edit Invoice</Button>
        <Button onClick={handlePrint}>Print Invoice</Button>
      </div>
      <InvoiceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveInvoice}
        initialInvoice={invoice} />
    </div>)
  );
}

