import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { DocumentPageComponent } from "@/components/document-page";
import Layout from "@/components/Layout";
import { PaymentPageComponent } from "@/components/payment-page";
import withAuth from "../../../app/leads/hooks/withAuth";



function Payments() {
  return (
   <Layout>
    <PaymentPageComponent/>
   </Layout>
  );
}

export default withAuth(Payments);