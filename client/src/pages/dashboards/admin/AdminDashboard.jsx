import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import StatCard from '../../../components/StatCard';
import Table from '../../../components/Table';
import { FaBuilding, FaUsers, FaBolt, FaWallet, FaShieldAlt, FaPlusCircle, FaHistory } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard');
        setStats(data);
      } catch (error) {
        toast.error('Failed to fetch master analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const renderRechargeRow = (r, idx) => (
    <tr key={r._id || idx} className="hover:bg-slate-50 transition-all border-b border-slate-100 last:border-0 group/row">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-black text-slate-800 uppercase italic tracking-tighter text-[11px] group-hover/row:text-blue-600 transition-colors">{r.user?.name}</span>
          <span className="text-[9px] text-slate-400 lowercase italic">{r.user?.email}</span>
        </div>
      </td>
      <td className="px-6 py-4 font-black text-slate-600 text-[10px] uppercase italic">{r.company?.name || 'MASTER GRID'}</td>
      <td className="px-6 py-4 font-black text-slate-800 tracking-[0.1em] text-[11px]">{r.mobileNumber}</td>
      <td className="px-6 py-4 font-black text-slate-900 italic tabular-nums">₹{r.amount?.toLocaleString('en-IN')}</td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest italic border ${
          r.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
        }`}>
          {r.status}
        </span>
      </td>
      <td className="px-6 py-4 text-slate-400 font-bold text-[10px] text-right font-mono uppercase italic">
        {new Date(r.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
      </td>
    </tr>
  );

  if (loading) return <div className="p-24 text-center font-black animate-pulse text-slate-400 uppercase tracking-[0.3em] italic">Accessing Master Mainframe...</div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">MASTER <span className="text-rose-600">OVERRIDE</span></h1>
          <p className="text-slate-500 font-bold italic mt-1 tracking-tight">Global administrative control and real-time ledger audit.</p>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Core Operational Status: OPTIMAL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <StatCard title="Corporate Entities" value={stats?.totalCompanies || 0} icon={<FaBuilding />} colorClass="indigo" trend="Providers" trendUp={true} />
        <StatCard title="Retailer Nodes" value={stats?.totalUsers || 0} icon={<FaUsers />} colorClass="blue" trend="Active" trendUp={true} />
        <StatCard title="Grid Throughput" value={stats?.totalRecharges || 0} icon={<FaBolt />} colorClass="rose" trend="Total Txs" trendUp={true} />
        <StatCard title="Master Liquidity" value={`₹${stats?.totalRevenue?.toLocaleString('en-IN') || 0}`} icon={<FaWallet />} colorClass="emerald" trend="Settled" trendUp={true} />
        <StatCard title="Total Exposure" value={`₹${stats?.totalExposure?.toLocaleString('en-IN') || 0}`} icon={<FaShieldAlt />} colorClass="amber" trend="Liabilities" trendUp={false} />
      </div>

      <div className="space-y-8 overflow-hidden">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter flex items-center">
               <FaHistory className="mr-3 text-rose-500" /> Global Transaction Stream
           </h2>
        </div>
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden transition-all hover:shadow-2xl">
           <Table 
             headers={['Retailer Node', 'Entity Provider', 'Target Endpoint', 'Value', 'Status', 'Timestamp']}
             data={stats?.recentRecharges || []}
             renderRow={renderRechargeRow}
           />
           {(!stats?.recentRecharges || stats.recentRecharges.length === 0) && (
              <div className="p-24 text-center">
                 <p className="text-slate-400 font-extrabold uppercase italic tracking-[0.2em] text-xs opacity-50">No global transitions detected in matrix.</p>
              </div>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
         <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group border border-slate-900 transition-all hover:shadow-rose-900/10">
            <h3 className="text-2xl font-black uppercase mb-8 flex items-center italic tracking-tighter text-rose-500">
              <FaShieldAlt className="mr-4 animate-pulse" /> Security Matrix
            </h3>
            <div className="space-y-6 relative z-10">
               {[
                 { label: 'Neural Entity Lock', desc: 'Instant binary deactivation of high-risk network nodes.', color: 'rose' },
                 { label: 'Deep Ledger Audit', desc: 'Recursive forensic verification of all transactional metadata.', color: 'blue' }
               ].map((item, i) => (
                 <div key={i} className={`p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-${item.color}-500/10 transition-all duration-500 cursor-pointer group-hover:border-${item.color}-500/30`}>
                    <p className={`text-${item.color}-500 font-black text-[10px] uppercase tracking-widest italic mb-2`}>{item.label}</p>
                    <p className="text-sm font-bold text-slate-400 italic leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
            <div className="absolute -right-24 -bottom-24 text-white/5 rotate-12 group-hover:scale-110 group-hover:text-rose-500/10 transition-all duration-[2000ms]">
               <FaShieldAlt size={350} />
            </div>
         </div>

         <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-center transition-all hover:shadow-xl group/gov">
            <div className="flex items-center justify-between mb-8">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">System Governance</h4>
               <span className="w-12 h-px bg-slate-100"></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <button 
                  onClick={() => navigate('/admin-dashboard/companies')}
                  className="p-8 bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-100 rounded-[2rem] transition-all duration-500 group/btn"
               >
                  <FaBuilding className="text-3xl mb-4 text-slate-300 group-hover/btn:text-rose-500 transition-all group-hover/btn:scale-110" />
                  <p className="text-[11px] font-black uppercase tracking-widest italic text-slate-500 group-hover/btn:text-white transition-colors">Manage Entities</p>
               </button>
               <button 
                  onClick={() => navigate('/admin-dashboard/users')}
                  className="p-8 bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-100 rounded-[2rem] transition-all duration-500 group/btn"
               >
                  <FaUsers className="text-3xl mb-4 text-slate-300 group-hover/btn:text-blue-500 transition-all group-hover/btn:scale-110" />
                  <p className="text-[11px] font-black uppercase tracking-widest italic text-slate-500 group-hover/btn:text-white transition-colors">Retailer Audit</p>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
