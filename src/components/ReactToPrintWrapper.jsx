'use client';
import React from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from "@/components/ui/button"

const ReactToPrintWrapper = ({ contentRef }) => {
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  })

  return <Button onClick={handlePrint}>Print Invoice</Button>;
}

export default ReactToPrintWrapper

