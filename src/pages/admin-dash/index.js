import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { AdminDashboardComponent } from "@/components/admin-dashboard";
import Layout from "@/components/Layout";



export default function AdminDash() {
  return (
   <Layout>
    <AdminDashboardComponent/>
   </Layout>
  );
}
