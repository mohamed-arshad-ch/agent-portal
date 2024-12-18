import { useEffect, useState } from "react";

export function AgreementPreview({
  data
}) {

 
  return (
    (
      <div className="printable-agreement border  p-8  relative text-sm leading-relaxed  bg-white max-w-4xl mx-auto ">
     

     
       {/* Watermark */}
       <img
        src="Vizavostok-logo-full.png"
        alt="Watermark"
        className="absolute opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 pointer-events-none"
      />



      {/* Header */}
      <header className="text-center mb-10">
        <img src="/Vizavostok-logo-full.png" alt="Vizavostok Logo" className="h-36 mx-auto mb-4" />
        <h1 className="text-2xl font-extrabold uppercase text-gray-800">Agreement for Visa and Work Permit Services</h1>
        <div className="mt-2 border-b-2 border-gray-300 w-32 mx-auto"></div>
      </header>

      {/* Agreement Introduction */}
      <p className="mb-6 text-gray-700">
        This Agreement is made on this <span className="font-bold">{data.agreementDate}</span>, by and between:
      </p>

      {/* Parties Details */}
      <section className="mb-8 ">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">First Party:</h2>
          <p>Name: <span className="font-medium">{data.firstPartyName}</span></p>
          <p>Business Address: <span className="font-medium">{data.firstPartyAddress}</span></p>
        </div>
        <div className="mt-2 border-b-2 border-gray-300 w-full mx-auto"></div>
        <div className="pt-6">
          <h2 className="text-lg font-semibold text-gray-900">Second Party:</h2>
          <p>Name: <span className="font-medium">{data.secondPartyName}</span></p>
          <p>Address: <span className="font-medium">{data.secondPartyAddress}</span></p>
          <p>Aadhar Number: <span className="font-medium">{data.aadharNumber}</span></p>
        </div>
        <div className="mt-2 border-b-2 border-gray-300 w-full mx-auto"></div>
      </section>

      <p className="mb-6 text-gray-700">
        Whereas the First Party, {data.firstPartyName}, is a consultancy located at {data.firstPartyAddress}, and has the authority to assist in securing visas and work permits for employment abroad. The Second Party desires to apply for a visa and work permit through the First Party's services.
      </p>

      <h2 className="text-lg font-bold mb-4 text-gray-800">NOW, THEREFORE, the parties agree as follows:</h2>

      <ol className="list-decimal pl-6 space-y-4 text-gray-700">
        <li>
          <strong>Services to be Provided:</strong> The First Party agrees to assist the Second Party in obtaining a visa and work permit for employment abroad. The services include obtaining the visa, work permit, and arranging necessary travel documentation, including flight tickets.
        </li>
        <li>
          <strong>Total Cost:</strong> The total cost for obtaining the visa, work permit, and other services {data.flightTicket?",without flight tickets":",with flight tickets"}, is ₹<span className="font-medium">{data.totalCost.toLocaleString()}</span>.
        </li>
        
     




      
       
       <li className="page-break" >
          <strong>Advance Payment:</strong> The Second Party shall pay an advance amount of ₹<span className="font-medium">{data.advancePayment.toLocaleString()}</span> to the First Party on the signing of this agreement. The remaining balance of ₹<span className="font-medium">{data.remainingPayment.toLocaleString()}</span> shall be paid by <span className="font-medium">{data.remainingPaymentDate}</span> to complete the payment.
        </li>
        <li className="">
          <strong>Timeline for Service Completion:</strong> The First Party agrees to provide the visa and work permit services to the Second Party by <span className="font-medium">{data.completionDate}</span>, which is no later than <span className="font-medium">{data.remainingBetweenPayment}</span>.
        </li>
        <li>
          <strong>Refund Policy:</strong> If the First Party fails to provide the visa and work permit services as agreed by <span className="font-medium">{data.remainingBetweenPayment}</span>, the First Party shall refund the entire advance amount of ₹<span className="font-medium">{data.advancePayment.toLocaleString()}</span> to the Second Party.
        </li>
        <li>
          <strong>Liability for Damages:</strong> In case any party fails to fulfill the obligations or causes damages to the other party, the responsible party shall be liable for all costs and damages incurred by the other party due to non-performance.
        </li>
        <li>
          <strong>Miscellaneous:</strong> Any changes to this agreement must be made in writing and signed by both parties. This agreement is binding upon both parties and is enforceable in accordance with applicable laws.
        </li>
        <li>
          <strong>Acknowledgment of Terms and Conditions:</strong> The Second Party acknowledges that they have read and fully understood the terms and conditions of this Agreement. By signing this Agreement, the Second Party confirms their agreement to all terms, conditions, and obligations outlined herein.
        </li>
      </ol>

      <p className="mt-6 text-gray-700">
        IN WITNESS WHEREOF, the parties have executed this Agreement on the day and year first above written.
      </p>

      <div className=" flex justify-between mt-32">
        <div>
          <p><strong>First Party:</strong></p>
          <p>Signature: _________________________</p>
          <p>Name: {data.firstPartyName}</p>
          <p>Date: {data.agreementDate}</p>
        </div>
        <div>
          <p><strong>Second Party:</strong></p>
          <p>Signature: _________________________</p>
          <p>Name: {data.secondPartyName}</p>
          <p>Date: {data.agreementDate}</p>
        </div>
      </div>
     




     
     <div className="page-break">
        <h2 className="text-lg font-bold mb-4 text-gray-800 ">General Terms and Conditions for Consultancy Services</h2>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700">
          <li>
            <strong>Scope of Services:</strong> {data.firstPartyName}, located at {data.firstPartyAddress}, provides services such as visa processing, job applications, education consultancy, and tour packages. Service specifics are addressed in individual agreements.
          </li>
          <li>
            <strong>Client Responsibilities:</strong>
            <ul className="list-disc pl-6">
              <li>Clients must provide accurate and complete information and documents.</li>
              <li>Clients are responsible for meeting deadlines for document submission and payments.</li>
            </ul>
          </li>
          <li>
            <strong>Fees and Payment:</strong>
            <ul className="list-disc pl-6">
              <li>Fees must be paid according to agreed terms.</li>
              <li>Advance payments are required to start services; remaining amounts are payable upon completion or as scheduled. (The full amount must be paid within 3 days of receiving the visa and related documents in hand.)</li>
              <li>Payments are non-refundable unless otherwise specified in writing.</li>
            </ul>
          </li>
          <li>
            <strong>Service Timeline:</strong> {data.firstPartyName} will strive to deliver services within agreed timelines. Delays caused by external factors (e.g., government processing times) are beyond the consultancy's control.
          </li>
          <li>
            <strong>Confidentiality:</strong> All client data and documents are handled with confidentiality and will not be shared without authorization.
          </li>
          <li>
            <strong>Liability:</strong>
            <ul className="list-disc pl-6">
              <li>The consultancy acts as a facilitator and is not liable for decisions by embassies, consulates, or other authorities.</li>
              <li>The consultancy is not responsible for losses due to application rejections or external delays.</li>
            </ul>
          </li>
          <li>
            <strong>Amendments:</strong> Terms may be revised periodically. Clients will be informed of changes, and continued engagement indicates acceptance.
          </li>
          <li>
            <strong>Force Majeure:</strong> {data.firstPartyName} is not liable for failures or delays caused by events beyond its control, such as natural disasters or government restrictions.
          </li>
          <li>
            <strong>Acknowledgment:</strong> By engaging the consultancy, clients agree to these terms and conditions.
          </li>
        </ol>
      </div>
     




    </div>

    
    )
  );
}

