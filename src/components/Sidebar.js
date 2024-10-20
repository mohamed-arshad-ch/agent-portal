// src/components/Sidebar.js
import { Home, Users, CreditCard, FileText, Bell, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const SidebarItem = ({ icon, label }) => (
    <button
      className={`flex items-center space-x-2 w-full p-2 rounded ${
        activeTab === label ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
      }`}
      onClick={() => setActiveTab(label)}>
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <aside className="w-64 bg-card p-4 hidden md:block pt-32">
        
      <nav className="space-y-2">
       <Link href="/admin-dash"> <SidebarItem icon={<Home className="w-5 h-5" />} label="Dashboard" /></Link>
       <Link href="/clients"> <SidebarItem icon={<Users className="w-5 h-5" />} label="Clients" /></Link>
        <Link href="/payments"><SidebarItem icon={<CreditCard className="w-5 h-5" />} label="Payments" /></Link>
        <Link href="/documents"><SidebarItem icon={<FileText className="w-5 h-5" />} label="Documents" /></Link>
        <Link href="/visa"><SidebarItem icon={<FileText className="w-5 h-5" />} label="Visa" /></Link>
        <Link href="/mbbs"><SidebarItem icon={<FileText className="w-5 h-5" />} label="MBBS" /></Link>
        <Link href="/notifications"><SidebarItem icon={<Bell className="w-5 h-5" />} label="Notifications" /></Link>
        <Link href="/settings"><SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" /></Link>
      </nav>
    </aside>
  );
}
