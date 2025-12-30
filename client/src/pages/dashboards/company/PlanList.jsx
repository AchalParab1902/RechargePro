import React, { useState, useEffect } from 'react';
import { FaTrash, FaPowerOff, FaCog } from 'react-icons/fa';
import api from '../../../api/axios';
import toast from 'react-hot-toast';

const PlanList = ({ refreshTrigger }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const { data } = await api.get('/company/plans');
      setPlans(data);
    } catch (error) {
      toast.error('Failed to sync plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [refreshTrigger]);

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/company/plans/${id}/status`);
      toast.success('PLAN STATUS UPDATED! 🔄');
      fetchPlans();
    } catch (error) {
      toast.error('Status sync failed');
    }
  };

  const deletePlan = async (id) => {
    if (!window.confirm('CRITICAL ACTION: Terminate this plan?')) return;
    try {
      await api.delete(`/company/plans/${id}`);
      toast.success('PLAN DECOMMISSIONED! 🗑️');
      fetchPlans();
    } catch (error) {
      toast.error('Decommissioning failed');
    }
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-slate-300 italic">Reading Plan Repository...</div>;

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
      <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-sm font-black text-slate-800 uppercase italic tracking-widest">Plan Repository</h2>
        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase italic">{plans.length} Entires Found</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Identity</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Domain</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Valuation</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Status</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {plans.map((plan) => (
              <tr key={plan._id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <p className="text-sm font-black text-slate-800 uppercase italic tracking-tight">{plan.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 italic truncate max-w-[200px]">{plan.description}</p>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[10px] font-black text-slate-500 uppercase italic border border-slate-100 px-3 py-1 rounded-lg bg-white shadow-sm">
                    {plan.serviceType}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800 italic">₹{plan.price}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{plan.validity} SPAN</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`text-[10px] font-black uppercase tracking-widest italic px-3 py-1 rounded-full ${
                    plan.status === 'Active' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-500 bg-rose-50'
                  }`}>
                    {plan.status}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => toggleStatus(plan._id)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all h-8 w-8 flex items-center justify-center">
                      <FaPowerOff size={12} />
                    </button>
                    <button onClick={() => deletePlan(plan._id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all h-8 w-8 flex items-center justify-center">
                      <FaTrash size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {plans.length === 0 && (
              <tr>
                <td colSpan="5" className="p-20 text-center">
                  <div className="flex flex-col items-center opacity-30">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <FaCog className="text-slate-400 animate-spin-slow" />
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">No Plans Found in Repository</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanList;
