import AddLeadButton from "@/components/AddLeadButton";
import Layout from "@/components/Layout";
import LeadsTable from "@/components/LeadsTable";
import withAuth from "../../../app/leads/hooks/withAuth";
import { useLeads } from "../../../app/leads/hooks/useLeads";


function LeadsPage() {

 
  return (
    (<Layout>
    <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex-grow">
         <div className="flex justify-between items-center mb-4">
         <h1 className="text-2xl font-bold">Leads Management</h1>
         <AddLeadButton  />
          </div>
      <LeadsTable  />
       </div>
      </div>
    
    </Layout>)
  );
}

export default withAuth(LeadsPage);