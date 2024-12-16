import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { AdminDashboardComponent } from "@/components/admin-dashboard";
import Layout from "@/components/Layout";
import withAuth from "../../../app/leads/hooks/withAuth";



function AdminDash() {
  return (
   <Layout>
    <AdminDashboardComponent/>
   </Layout>
  );
}

export default withAuth(AdminDash);