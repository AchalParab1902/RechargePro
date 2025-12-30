import React, { useState, useEffect } from 'react';
import { FaPlus, FaCube, FaShieldAlt, FaExchangeAlt, FaLayerGroup } from 'react-icons/fa';
import api from '../../../api/axios';
import toast from 'react-hot-toast';
import DashboardStats from './DashboardStats';
import PlanList from './PlanList';
import CreatePlanModal from './CreatePlanModal';
import CreatePackModal from './CreatePackModal';

import { useAuth } from '../../../context/AuthContext';

const CompanyDashboard = () => {
  const { user: authUser, refreshUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isPackModalOpen, setIsPackModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
 
  const fetchData = async () => {
    try {
      const statsRes = await api.get('/company/dashboard-metrics');
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Initialization failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger, authUser?.walletBalance]); // Refresh stats when balance updates (polling)

  if (loading || !authUser) return <div className="p-10 text-center font-black animate-pulse text-slate-400 italic uppercase">Loading Intelligence...</div>;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 italic tracking-tighter uppercase mb-2">
            PROVIDER <span className="text-blue-600">CENTRAL</span>
          </h1>
          <p className="text-slate-500 font-bold italic tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Operational Intelligence • {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPackModalOpen(true)}
            className="px-8 py-4 bg-white border border-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center shadow-sm"
          >
             <FaCube className="mr-3 text-blue-600 transition-transform group-hover:rotate-12" /> Build Node
          </button>
          <button 
            onClick={() => setIsPlanModalOpen(true)}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 shadow-2xl shadow-blue-500/20 transition-all flex items-center transform active:scale-95 italic group"
          >
             <FaPlus className="mr-3 group-hover:rotate-90 transition-transform duration-500" /> Launch Plan
          </button>
        </div>
      </div>

      <DashboardStats stats={stats} walletBalance={authUser?.walletBalance || 0} />
      
      <div className="grid grid-cols-1 gap-12">
        <div className="space-y-8">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter flex items-center">
                 <FaLayerGroup className="mr-3 text-blue-500" /> Managed Assets
              </h2>
           </div>
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden transition-all hover:shadow-2xl">
              <PlanList refreshTrigger={refreshTrigger} />
           </div>
        </div>
      </div>

      <CreatePlanModal 
        isOpen={isPlanModalOpen} 
        onClose={() => setIsPlanModalOpen(false)} 
        onPlanCreated={() => setRefreshTrigger(prev => prev + 1)}
      />

      <CreatePackModal 
        isOpen={isPackModalOpen} 
        onClose={() => setIsPackModalOpen(false)} 
        onPackCreated={() => setRefreshTrigger(prev => prev + 1)}
      />
    </div>
  );
};



export default CompanyDashboard;
