import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../../../components/UserSidebar';
import Navbar from '../../../components/Navbar';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
      {/* Sidebar */}
      <UserSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64 transition-all duration-300">
        <Navbar 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          isSidebarOpen={isSidebarOpen}
        />
        
        <main className="flex-1 p-4 md:p-8 lg:p-12">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>

        <footer className="py-8 px-8 border-t border-slate-100 bg-white text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] text-center italic">
          &copy; 2025 RECHARGE SYSTEM • SECURE HUB PROTOCOL
        </footer>
      </div>
    </div>
  );
};

export default UserLayout;
