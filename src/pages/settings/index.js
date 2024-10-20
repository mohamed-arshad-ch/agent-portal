import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { AdminDashboardComponent } from "@/components/admin-dashboard";
import Layout from "@/components/Layout";
import { SettingsPageComponent } from "@/components/settings-page";



export default function AdminDash() {
  return (
   <Layout>
    <SettingsPageComponent/>
   </Layout>
  );
}
