import ClientSearch from "@/components/ClientSearch";
import Layout from "@/components/Layout";


export default function ClientDetailsPage() {
  return (
    (<Layout>
        <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Client Details</h1>
      <ClientSearch />
    </div>
    </Layout>)
  );
}

