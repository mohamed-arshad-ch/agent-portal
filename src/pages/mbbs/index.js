import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { AdminDashboardComponent } from "@/components/admin-dashboard";
import Layout from "@/components/Layout";
import { MbbsAdmissionPage } from "@/components/mbbs-admission-page";



export default function AdminDash() {
  return (
   <Layout>
    <MbbsAdmissionPage/>
   </Layout>
  );
}
