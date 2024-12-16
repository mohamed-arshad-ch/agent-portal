import Image from "next/image";
import localFont from "next/font/local";
import { LoginScreenComponent } from "@/components/login-screen";
import { DocumentPageComponent } from "@/components/document-page";
import Layout from "@/components/Layout";
import withAuth from "../../../app/leads/hooks/withAuth";



function documentList() {
  return (
   <Layout>
    <DocumentPageComponent/>
   </Layout>
  );
}
export default withAuth(documentList);