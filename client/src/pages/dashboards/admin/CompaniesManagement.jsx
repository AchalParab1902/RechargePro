import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table';
import { FaPlus, FaCheckCircle, FaTimesCircle, FaTrash, FaPowerOff } from 'react-icons/fa';
import api from '../../../api/axios';
import toast from 'react-hot-toast';

const CompaniesManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', email: '', password: '' });

  const fetchCompanies = async () => {
    try {
      const { data } = await api.get('/admin/companies');
      setCompanies(data);
    } catch (error) {
      toast.error('Failed to fetch corporate partners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/company', newCompany);
      toast.success('COMPANY REGISTERED!');
      setShowModal(false);
      setNewCompany({ name: '', email: '', password: '' });
      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/admin/user/${id}/status`);
      toast.success('Partner status updated');
      fetchCompanies();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const renderRow = (company, idx) => (
    <tr key={idx} className="hover:bg-slate-50 border-b border-slate-100 last:border-0 group transition-all">
      <td className="px-6 py-4 font-black">
         <div className="flex flex-col">
            <span className="text-slate-800 text-xs uppercase italic tracking-tighter">{company.name}</span>
            <span className="text-[10px] text-slate-400 font-black tracking-widest mt-0.5">{company.email}</span>
         </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-black text-rose-600 text-sm tracking-tight">₹{company.walletBalance}</span>
      </td>
      <td className="px-6 py-4 font-black text-slate-800 text-[10px] uppercase tracking-widest italic font-sans">{company.role}</td>
      <td className="px-6 py-4 text-xs font-bold text-slate-400 italic">
        <span className={`flex items-center ${company.isActive ? 'text-emerald-500' : 'text-slate-300'}`}>
          {company.isActive ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
          <span className="uppercase text-[9px] font-black tracking-widest">{company.isActive ? 'Active' : 'Locked'}</span>
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
           <button 
             onClick={() => toggleStatus(company._id)}
             title="Toggle Access"
             className={`p-2 rounded-lg transition-all ${company.isActive ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50' : 'text-emerald-500 hover:bg-emerald-50'}`}
           >
             <FaPowerOff />
           </button>
        </div>
      </td>
    </tr>
  );

  if (loading) return <div className="text-center p-10 font-bold text-slate-500 italic">GATEWAY CONNECTION ACTIVE... PULLING DATA...</div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">CORPORATE <span className="text-rose-600">ENTITIES</span></h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1 italic">Licensed Gateway Service Providers</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-rose-600 transition-all flex items-center italic group"
        >
          <FaPlus className="mr-3 group-hover:rotate-90 transition-transform duration-500" /> New Entity
        </button>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden transition-all hover:shadow-2xl">
        <Table 
          headers={['Provider Identity', 'Wallet Exposure', 'Entity Type', 'Service Status', 'Protocol Control']}
          data={companies}
          renderRow={renderRow}
        />
        {companies.length === 0 && (
          <div className="p-24 text-center">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                <FaPlus size={24} />
             </div>
             <p className="text-slate-400 font-black uppercase italic tracking-widest text-[10px]">No corporate providers detected in network grid.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
           <div 
             className="bg-white rounded-[3rem] w-full max-w-lg p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-500 relative overflow-hidden group/modal"
           >
              {/* Abstract Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover/modal:scale-110 transition-transform duration-[2000ms]"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                   <div>
                      <h2 className="text-2xl font-black uppercase italic tracking-tighter">Entity <span className="text-rose-600">Onboarding</span></h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Master Node Protocol V2.1</p>
                   </div>
                   <button 
                     onClick={() => setShowModal(false)}
                     className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
                   >
                     <FaPlus className="rotate-45" />
                   </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-8">
                   <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Provider Name</label>
                        <input 
                          onChange={e => setNewCompany({...newCompany, name: e.target.value})} 
                          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-rose-500/20 focus:ring-8 focus:ring-rose-500/5 transition-all font-bold text-sm h-14" 
                          placeholder="e.g. Reliance JIO" 
                          required 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Gateway Destination URL (Email)</label>
                        <input 
                          type="email" 
                          onChange={e => setNewCompany({...newCompany, email: e.target.value})} 
                          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-rose-500/20 focus:ring-8 focus:ring-rose-500/5 transition-all font-bold text-sm h-14" 
                          placeholder="admin@provider.com" 
                          required 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Encryption Key (Password)</label>
                        <input 
                          type="password" 
                          onChange={e => setNewCompany({...newCompany, password: e.target.value})} 
                          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-rose-500/20 focus:ring-8 focus:ring-rose-500/5 transition-all font-bold text-sm h-14" 
                          placeholder="••••••••" 
                          required 
                        />
                     </div>
                   </div>

                   <div className="flex items-center gap-6 pt-6">
                      <button 
                        type="submit" 
                        className="flex-1 py-5 bg-rose-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-rose-500/20 hover:bg-rose-700 transition-all hover:scale-[1.02] active:scale-95 italic"
                      >
                         Initialize Entity
                      </button>
                   </div>
                </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesManagement;
