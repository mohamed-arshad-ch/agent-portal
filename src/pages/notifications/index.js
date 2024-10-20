import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { DocumentPageComponent } from "@/components/document-page";
import Layout from "@/components/Layout";
import { NotificationPageComponent } from "@/components/notification-page";



export default function AdminDash() {
  return (
   <Layout>
    <NotificationPageComponent/>
   </Layout>
  );
}
