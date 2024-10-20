// src/components/Layout.js
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  const [activeTab, setActiveTab] = useState('');


  const setACtiveTabIn = (tab)=>{
setActiveTab(tab)

  }
  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setACtiveTabIn} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
