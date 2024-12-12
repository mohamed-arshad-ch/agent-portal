import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { InputModal } from './components/input-modal'
import { AgreementPreview } from './components/agreement-preview'

export default function AgreementGenerator() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [agreementData, setAgreementData] = useState({
    firstPartyName: 'VIZAVOSTOK INTERNATIONAL LLP',
    firstPartyAddress: '6/594, UK Tower, First Floor, Machingal Bypass, Munduparamba PO, Malappuram 676509',
    secondPartyName: '',
    secondPartyAddress: '',
    aadharNumber: '',
    totalCost: 400000,
    advancePayment: 100000,
    remainingPayment: 200000,
    remainingPaymentDate: '2025-01-28',
    agreementDate: '2024-12-09',
    completionDate: '2025-01-28'
  })

  const handleDataSubmit = (data) => {
    setAgreementData(data)
    setIsModalOpen(false)
  }

  const handlePrint = () => {
    const printContent = document.querySelector('.printable-agreement');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  return (
    (<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vizavostok Agreement Generator</h1>
      <div className="flex space-x-4 mb-4">
        <Button onClick={() => setIsModalOpen(true)}>Enter Agreement Data</Button>
        <Button onClick={handlePrint}>Print Agreement</Button>
      </div>
      <AgreementPreview data={agreementData} />
      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDataSubmit}
        initialData={agreementData} />
    </div>)
  );
}

