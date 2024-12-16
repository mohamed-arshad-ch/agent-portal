import LeadsTable from './components/LeadsTable'
import AddLeadButton from './components/AddLeadButton'

export default function LeadsPage() {
  return (
    (<div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leads Management</h1>
        <AddLeadButton />
      </div>
      <LeadsTable />
    </div>)
  );
}

