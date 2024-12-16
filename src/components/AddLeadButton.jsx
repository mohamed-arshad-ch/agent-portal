import { useState } from 'react'
import { Button } from "@/components/ui/button"
import AddLeadModal from './AddLeadModal'

export default function AddLeadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (<>
    <Button onClick={() => setIsModalOpen(true)}>Add Lead</Button>
    <AddLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  </>);
}

