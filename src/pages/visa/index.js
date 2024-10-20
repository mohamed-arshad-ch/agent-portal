import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { AdminDashboardComponent } from "@/components/admin-dashboard";
import Layout from "@/components/Layout";
import { SettingsPageComponent } from "@/components/settings-page";
import { VisaDetailsPageComponent } from "@/components/visa-details-page";



export default function AdminDash() {
  return (
   <Layout>
    <VisaDetailsPageComponent/>
   </Layout>
  );
}
