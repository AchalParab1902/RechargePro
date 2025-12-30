import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import toast from 'react-hot-toast';
import { FaHistory, FaCalendarAlt, FaUser, FaMobileAlt, FaTag } from 'react-icons/fa';

const RechargeHistory = () => {
  const [recharges, setRecharges] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const { data } = await api.get('/company/recharges');
      setRecharges(data);
    } catch (error) {
      toast.error('Failed to fetch transaction records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) return <div className="text-center p-10 font-black animate-pulse text-slate-400 italic uppercase">Syncing Ledger...</div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">REVENUE LEDGER</h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Real-time settlement history for your licensed plans</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Retailer</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Recipient</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Settlement</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recharges.length > 0 ? (
                recharges.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-50 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs font-black italic mr-4 uppercase border-2 border-white shadow-sm">
                          {r.user?.name.slice(0, 2)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-slate-800 text-xs uppercase italic tracking-tight">{r.user?.name}</span>
                          <span className="text-[9px] font-bold text-slate-400 lowercase">{r.user?.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center font-black text-slate-800 tracking-widest italic text-xs">
                        <FaMobileAlt className="mr-2 text-slate-400" />
                        {r.mobileNumber}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-800 uppercase italic leading-none mb-1">{r.plan?.name}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">SUCCESSFUL RECHARGE</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-emerald-600 font-black italic tracking-tighter text-sm">
                        +₹{r.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex flex-col items-end opacity-60 group-hover:opacity-100 transition-opacity">
                         <span className="text-[10px] font-black text-slate-800 uppercase italic tracking-tighter">
                            {new Date(r.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                         </span>
                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            {new Date(r.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                         </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center">
                       <FaHistory size={40} className="text-slate-100 mb-4" />
                       <p className="text-slate-400 font-black uppercase italic tracking-widest text-xs">No transaction revenue recorded in the ledger.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RechargeHistory;
