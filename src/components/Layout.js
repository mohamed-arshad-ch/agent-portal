// src/components/Layout.js
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AgentSidebar from './AgentSidebar';

export default function Layout({ children }) {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab"));
  const [hostType,setHostType] = useState(null)

  useEffect(()=>{
    const role = localStorage.getItem("flag")
    setHostType(role)
  },[])

  const setACtiveTabIn = (tab)=>{
    localStorage.setItem("activeTab",tab)
setActiveTab(tab)

  }

  


  return (
    <div className="flex h-screen">
      {hostType == "0"  && <Sidebar activeTab={activeTab} setActiveTab={setACtiveTabIn} />}
      {hostType == "1"  && <AgentSidebar activeTab={activeTab} setActiveTab={setACtiveTabIn} />}
      
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
