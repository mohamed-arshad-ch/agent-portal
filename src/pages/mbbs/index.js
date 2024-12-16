import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { AdminDashboardComponent } from "@/components/admin-dashboard";
import Layout from "@/components/Layout";
import { MbbsAdmissionPage } from "@/components/mbbs-admission-page";
import withAuth from "../../../app/leads/hooks/withAuth";



function MbbsAdmission() {
  return (
   <Layout>
    <MbbsAdmissionPage/>
   </Layout>
  );
}

export default withAuth(MbbsAdmission);