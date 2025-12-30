import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../../components/StatCard';
import Table from '../../../components/Table';
import WalletCard from '../../../components/WalletCard';
import AddMoneyModal from '../../../components/AddMoneyModal';
import api from '../../../api/axios';
import { 
  FaWallet, 
  FaMobileAlt, 
  FaHistory, 
  FaCoins, 
  FaArrowRight,
  FaBolt
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

const UserDashboard = () => {
  const { user, setBalance } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const dashboardRes = await api.get('/user/dashboard');
      setData(dashboardRes.data);
      // Sync the global balance if the dashboard returns it (optional but good for consistency)
      if (dashboardRes.data?.walletBalance !== undefined) {
        setBalance(dashboardRes.data.walletBalance);
      }
    } catch (error) {
      toast.error('Failed to sync data with gateway');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderRecentActivityRow = (act, idx) => (
    <tr key={act.id || idx} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 uppercase tracking-tighter italic">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            act.type === 'RECHARGE' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
          }`}>
            {act.type === 'RECHARGE' ? <FaBolt size={12} /> : <FaWallet size={12} />}
          </div>
          <span className="font-black text-slate-800">{act.type === 'RECHARGE' ? 'DEBIT' : 'CREDIT'}</span>
        </div>
      </td>
      <td className="px-6 py-4 font-bold text-slate-600 truncate max-w-[150px]">{act.description}</td>
      <td className="px-6 py-4 font-black text-slate-800">₹{act.amount}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
          act.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 
          act.status === 'FAILED' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {act.status}
        </span>
      </td>
      <td className="px-6 py-4 text-[9px] font-bold text-slate-400">
        {new Date(act.createdAt).toLocaleString()}
      </td>
    </tr>
  );

  const renderActiveOrderRow = (order, idx) => (
    <tr key={order._id || idx} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 uppercase tracking-tighter italic">
      <td className="px-6 py-4 font-black text-blue-600">#{order._id?.slice(-6)}</td>
      <td className="px-6 py-4 font-black text-slate-800 tracking-widest">{order.mobileNumber}</td>
      <td className="px-6 py-4">
         <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold">{order.plan?.operator}</span>
            <span className="text-xs font-black">{order.plan?.title}</span>
         </div>
      </td>
      <td className="px-6 py-4 font-black text-slate-800">₹{order.amount}</td>
      <td className="px-6 py-4 animate-pulse">
        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 border border-blue-200">
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4 text-[9px] font-bold text-slate-400">
        {new Date(order.createdAt).toLocaleTimeString()}
      </td>
    </tr>
  );

  if (loading) return <div className="text-center p-20 font-black text-slate-400 uppercase italic tracking-widest animate-pulse">Initializing Data Stream...</div>;

  const stats = [
    { title: 'Available Balance', value: `₹${user?.walletBalance?.toLocaleString('en-IN') || 0}`, icon: <FaWallet />, colorClass: 'blue' },
    { title: 'Total Success', value: data?.totalRecharges || 0, icon: <FaHistory />, colorClass: 'indigo' },
    { title: 'Total Spent', value: `₹${data?.totalSpent?.toLocaleString('en-IN') || 0}`, icon: <FaBolt />, colorClass: 'rose' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">RETAILER <span className="text-blue-600">HUB</span></h1>
          <p className="text-slate-500 font-bold italic mt-1">Operational command center for real-time fulfillment.</p>
        </div>
        <button 
          onClick={() => navigate('/user-dashboard/recharge')}
          className="flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 italic group"
        >
          <FaBolt className="mr-3 group-hover:scale-125 transition-transform" /> Quick Launch
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-12">
        <div className="xl:col-span-1">
          <WalletCard 
            balance={user?.walletBalance} 
            onAddMoney={() => setIsModalOpen(true)} 
          />
        </div>
        <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
           {stats.map((stat, idx) => (
             <StatCard key={idx} {...stat} />
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Left Column: Recent Activity */}
        <div className="xl:col-span-2 space-y-8 overflow-hidden">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter flex items-center">
              <FaHistory className="mr-3 text-emerald-500" /> Recent Activity Log
            </h2>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden transition-all hover:shadow-2xl">
             <Table 
               headers={['Type', 'Description', 'Amount', 'Status', 'Timestamp']}
               data={data?.recentActivity || []}
               renderRow={renderRecentActivityRow}
             />
             {(!data?.recentActivity || data.recentActivity.length === 0) && (
               <div className="p-24 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                     <FaHistory size={24} />
                  </div>
                  <p className="text-slate-400 font-black uppercase italic tracking-widest text-[10px]">No encrypted activity found in current session.</p>
               </div>
             )}
          </div>
        </div>

        {/* Right Column: Featured Plans */}
        <div className="space-y-8">

          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm transition-all hover:shadow-xl group/featured">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Top Performers</h3>
                <span className="w-8 h-px bg-slate-100"></span>
             </div>
             <div className="space-y-5">
                {data?.activePlans?.slice(0, 4).map(plan => (
                   <div 
                     key={plan._id} 
                     onClick={() => navigate('/user-dashboard/recharge', { state: { selectedPlan: plan } })}
                     className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl hover:bg-slate-900 hover:text-white transition-all duration-500 border border-transparent hover:border-slate-800 cursor-pointer group/plan relative overflow-hidden"
                   >
                      <div className="relative z-10">
                         <p className="text-[9px] font-black uppercase text-blue-600 group-hover/plan:text-blue-400 transition-colors">{plan.operator}</p>
                         <p className="font-black text-slate-800 group-hover/plan:text-white text-sm tracking-tight italic mt-0.5">{plan.title}</p>
                      </div>
                      <div className="text-right relative z-10">
                         <p className="font-black text-slate-900 group-hover/plan:text-white transition-colors">₹{plan.amount}</p>
                         <p className="text-[8px] font-bold text-slate-400 group-hover/plan:text-slate-500 uppercase tracking-widest">{plan.validity}</p>
                      </div>
                      {/* Hover Flash */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover/plan:translate-x-[100%] transition-transform duration-1000"></div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <AddMoneyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchData} 
      />
    </div>
  );
};

export default UserDashboard;
