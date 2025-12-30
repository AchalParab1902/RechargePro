import React, { useState } from 'react';
import { FaTimes, FaRocket } from 'react-icons/fa';
import api from '../../../api/axios';
import toast from 'react-hot-toast';

const CreatePlanModal = ({ isOpen, onClose, onPlanCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    serviceType: 'Mobile',
    price: '',
    validity: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/company/plans/create', formData);
      toast.success('NEW PLAN LAUNCHED! 🚀');
      onPlanCreated();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Launch failed');
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
          <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Launch New Plan</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Define a new recharge product for your retailers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Plan Identity</label>
              <input 
                required
                className="w-full px-5 py-3 h-12 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm italic uppercase text-slate-800 focus:ring-2 focus:ring-blue-500/10 transition-all"
                placeholder="E.G. UNLIMITED 5G PREMIUM"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Service Domain</label>
              <select 
                className="w-full h-12 px-5 bg-slate-50 border border-slate-100 rounded-xl outline-none font-black text-[10px] uppercase italic text-slate-600 appearance-none"
                value={formData.serviceType}
                onChange={e => setFormData({...formData, serviceType: e.target.value})}
              >
                <option value="Mobile">Mobile Infrastructure</option>
                <option value="DTH">Satellite DTH</option>
                <option value="DataCard">Broadband/Data</option>
                <option value="Electricity">Utility: Power</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cost (INR)</label>
              <input 
                type="number"
                required
                className="w-full px-5 py-3 h-12 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm h-12 text-slate-800"
                placeholder="0.00"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Validity Span</label>
              <input 
                required
                className="w-full px-5 py-3 h-12 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm h-12 italic text-slate-800 uppercase"
                placeholder="E.G. 28 DAYS"
                value={formData.validity}
                onChange={e => setFormData({...formData, validity: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Capabilities / Details</label>
            <textarea 
              required
              rows="3"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm text-slate-600 italic resize-none"
              placeholder="What makes this plan unique?"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
          >
            {loading ? 'Processing Mission...' : <><FaRocket className="mr-2" /> Activate Plan</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanModal;
