import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { DocumentPageComponent } from "@/components/document-page";
import Layout from "@/components/Layout";
import { NotificationPageComponent } from "@/components/notification-page";
import withAuth from "../../../app/leads/hooks/withAuth";



function Notification() {
  return (
   <Layout>
    <NotificationPageComponent/>
   </Layout>
  );
}
export default withAuth(Notification);