import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { AdminDashboardComponent } from "@/components/admin-dashboard";
import Layout from "@/components/Layout";
import { SettingsPageComponent } from "@/components/settings-page";
import withAuth from "../../../app/leads/hooks/withAuth";



function Settings() {
  return (
   <Layout>
    <SettingsPageComponent/>
   </Layout>
  );
}

export default withAuth(Settings);