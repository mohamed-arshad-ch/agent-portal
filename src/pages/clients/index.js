import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { AdminDashboardComponent } from "@/components/admin-dashboard";
import Layout from "@/components/Layout";
import { ClientsPageComponent } from "@/components/clients-page";
import withAuth from "../../../app/leads/hooks/withAuth";



function AdminDash() {
  return (
   <Layout>
    <ClientsPageComponent/>
   </Layout>
  );
}
export default withAuth(AdminDash);