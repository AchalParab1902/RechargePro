import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';
import Navbar from '../../../components/Navbar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans overflow-x-hidden">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64 transition-all duration-300">
        <Navbar 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          isSidebarOpen={isSidebarOpen}
        />
        
        <main className="flex-1 p-4 md:p-8 lg:p-12 bg-slate-50/50">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>

        <footer className="py-8 px-10 border-t border-slate-200 bg-white text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-4 italic">
          <span>&copy; 2025 RECHARGE MASTER PROTOCOL • NODE OPS</span>
          <span className="text-rose-600 px-3 py-1 bg-rose-50 rounded-lg border border-rose-100 italic tracking-[0.3em]">MASTER OVERRIDE ACTIVE</span>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
