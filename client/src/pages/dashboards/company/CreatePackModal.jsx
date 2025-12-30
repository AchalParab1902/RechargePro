import React, { useState, useEffect } from 'react';
import { FaTimes, FaCube, FaPlus } from 'react-icons/fa';
import api from '../../../api/axios';
import toast from 'react-hot-toast';

const CreatePackModal = ({ isOpen, onClose, onPackCreated }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [packName, setPackName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchPlans = async () => {
        try {
          const { data } = await api.get('/company/plans');
          setPlans(data.filter(p => p.status === 'Active'));
        } catch (error) {
          toast.error('Failed to load active plans for grouping');
        }
      };
      fetchPlans();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlanSelection = (id) => {
    setSelectedPlans(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const totalPrice = plans
    .filter(p => selectedPlans.includes(p._id))
    .reduce((sum, p) => sum + p.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPlans.length === 0) return toast.error('Select at least one plan for the pack');
    
    setLoading(true);
    try {
      await api.post('/company/packs/create', {
        packName,
        plans: selectedPlans,
        totalPrice
      });
      toast.success('GO-TO-MARKET PACK CREATED! 📦');
      onPackCreated();
      onClose();
    } catch (error) {
      toast.error('Pack creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors">
          <FaTimes size={18} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Assemble Pack</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Bundle multiple plans into a high-value corporate pack</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pack Designation</label>
            <input 
              required
              className="w-full px-5 py-3 h-12 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm italic uppercase text-slate-800"
              placeholder="E.G. FAMILY ULTIMATE BUNDLE"
              value={packName}
              onChange={e => setPackName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Select Composite Plans</label>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {plans.map(plan => (
                <div 
                  key={plan._id}
                  onClick={() => togglePlanSelection(plan._id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                    selectedPlans.includes(plan._id) 
                    ? 'border-blue-600 bg-blue-50/50' 
                    : 'border-slate-50 bg-slate-50/30 hover:border-slate-100'
                  }`}
                >
                  <div>
                    <p className="text-[10px] font-black text-slate-800 uppercase italic tracking-tight">{plan.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase italic">{plan.serviceType} • {plan.validity}</p>
                  </div>
                  <span className="text-xs font-black text-slate-700 italic">₹{plan.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl flex justify-between items-center shadow-lg">
             <div className="text-white">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Pack Valuation</p>
                <p className="text-xl font-black italic tracking-tighter text-blue-400">₹{totalPrice}</p>
             </div>
             <button 
                type="submit" 
                disabled={loading || selectedPlans.length === 0}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 shadow-xl shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center transform active:scale-95"
              >
                {loading ? 'Assembling...' : <><FaCube className="mr-2" /> Launch Pack</>}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePackModal;
