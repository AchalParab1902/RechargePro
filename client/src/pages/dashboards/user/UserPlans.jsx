import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTag, FaCheckCircle } from 'react-icons/fa';
import api from '../../../api/axios';
import toast from 'react-hot-toast';

const UserPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await api.get('/user/recharge-plans');
        setPlans(data);
      } catch (error) {
        toast.error('Failed to fetch plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) return <div className="text-center p-10 font-bold text-slate-500 italic">LOADNG ACTIVE PLANS...</div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">AVAILABLE PLANS</h1>
        <p className="text-slate-500 font-medium italic">Select a plan to proceed with recharge.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.length === 0 ? (
          <div className="col-span-full text-center p-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold italic">
            No active plans available at the moment.
          </div>
        ) : (
          plans.map(plan => (
            <div key={plan._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all p-8 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest italic mb-2">
                       {plan.operator}
                    </div>
                    <h3 className="font-black text-slate-800 uppercase tracking-tight">{plan.title}</h3>
                 </div>
                 <div className="text-3xl font-black text-slate-800">
                    <span className="text-slate-300 text-xl font-black italic mr-1">₹</span>
                    {plan.amount}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="p-3 bg-slate-50 rounded-2xl text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Validity</p>
                    <p className="text-sm font-bold text-slate-700 italic tracking-tight">{plan.validity}</p>
                 </div>
                 <div className="p-3 bg-slate-50 rounded-2xl text-center flex items-center justify-center">
                    <FaTag className="text-blue-500 shrink-0 mr-2" />
                    <span className="text-xs font-bold text-slate-600">PREPAID</span>
                 </div>
              </div>

              <div className="space-y-3 mb-8">
                 <p className="text-xs font-medium text-slate-500 italic leading-relaxed">
                    {plan.description}
                 </p>
                 <div className="flex items-center text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    <FaCheckCircle className="mr-2 shrink-0" /> Verified Pack
                 </div>
              </div>

              <div className="text-[10px] font-bold text-slate-400 uppercase mb-4 italic">
                Sold By: {plan?.company?.name || 'Authorized Provider'}
              </div>

              <button 
                onClick={() => navigate('/user-dashboard/recharge', { state: { selectedPlan: plan } })}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] group-hover:bg-blue-600 transition-colors"
              >
                 Select Plan
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserPlans;
