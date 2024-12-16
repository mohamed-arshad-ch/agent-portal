// src/components/Sidebar.js
import { Home, Users, CreditCard, FileText, Bell, Settings, Menu, X, Users2, Printer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const SidebarItem = ({ icon, label, href }) => (
    <Link href={href} className="block">
      <button
        className={`flex items-center space-x-2 w-full p-2 rounded ${
          activeTab === label ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
        }`}
        onClick={() => {
          setActiveTab(label);
          setIsSidebarOpen(false); // Close sidebar on item click
        }}>
        {icon}
        <span>{label}</span>
      </button>
    </Link>
  );

  return (
    <>
      {/* Menu button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-full"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-card p-4 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:translate-x-0 md:static md:block z-40`}>
        
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/Vizavostok icon.jpg" // Replace with your image path
            alt="Vizavostok Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>

        <nav className="space-y-2">
          <SidebarItem icon={<Home className="w-5 h-5" />} label="Dashboard" href="/admin-dash" />
          <SidebarItem icon={<Users2 className="w-5 h-5" />} label="Leads" href="/leads" />
          <SidebarItem icon={<Users className="w-5 h-5" />} label="Clients" href="/clients" />
          <SidebarItem icon={<FileText className="w-5 h-5" />} label="Clients Docs" href="/client-details" />
          <SidebarItem icon={<CreditCard className="w-5 h-5" />} label="Payments" href="/payments" />
          <SidebarItem icon={<FileText className="w-5 h-5" />} label="Documents" href="/documents" />
          <SidebarItem icon={<FileText className="w-5 h-5" />} label="Visa" href="/visa" />
          <SidebarItem icon={<FileText className="w-5 h-5" />} label="MBBS" href="/mbbs" />
          <SidebarItem icon={<FileText className="w-5 h-5" />} label="Agreement" href="/agreement" />
          <SidebarItem icon={<Printer className="w-5 h-5" />} label="Invoice" href="/invoice" />
          <SidebarItem icon={<Bell className="w-5 h-5" />} label="Notifications" href="/notifications" />
          <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" href="/settings" />
        </nav>
      </aside>

      {/* Background overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
