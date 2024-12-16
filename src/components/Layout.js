// src/components/Layout.js
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AgentSidebar from './AgentSidebar';

export default function Layout({ children }) {
  const [activeTab, setActiveTab] = useState('');

  const role = localStorage.getItem("flag")

  const setACtiveTabIn = (tab)=>{
setActiveTab(tab)

  }
  return (
    <div className="flex h-screen">
      {role == "0"  && <Sidebar activeTab={activeTab} setActiveTab={setACtiveTabIn} />}
      {role == "1"  && <AgentSidebar activeTab={activeTab} setActiveTab={setACtiveTabIn} />}
      
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
