import React from 'react';
import Table from '../../../components/Table';
import { FaPercentage, FaCheckCircle, FaEdit, FaSave, FaPlus, FaBuilding } from 'react-icons/fa';
import { OPERATOR_SETTINGS } from '../../../utils/constants';

const CommissionManagement = () => {
  const renderRow = (op, idx) => (
    <tr key={idx} className="hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors group">
      <td className="px-6 py-4 font-black text-xs uppercase italic tracking-tighter text-slate-800">{op.name}</td>
      <td className="px-6 py-4">
        <div className="flex items-center group">
          <span className="font-black text-rose-600 text-sm italic mr-3">{op.commission}</span>
          <button className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-blue-600 transition-all duration-300"><FaEdit size={10} /></button>
        </div>
      </td>
      <td className="px-6 py-4 font-black text-emerald-600 text-[10px] uppercase tracking-widest">{op.todayVol}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest italic flex items-center w-fit ${
          op.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'
        }`}>
          {op.status === 'Active' ? <FaCheckCircle className="mr-2" /> : <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-2"></div>}
          {op.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-[10px] font-black text-slate-900 border border-slate-900 px-4 py-2 rounded-xl uppercase tracking-widest italic hover:bg-slate-900 hover:text-white transition-all shadow-sm">
           Set Slab
        </button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center">
             <FaPercentage className="mr-4 text-rose-600" /> MARGIN PROTOCOL
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1 italic">Configure Global & Entity Commission Slabs</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-black transition-all flex items-center italic">
             <FaSave className="mr-3" /> Save Global Slab
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
           <h2 className="text-xs font-black text-slate-800 uppercase italic tracking-[0.3em] flex items-center">
             <span className="w-2 h-4 bg-rose-600 mr-3 rounded-sm shadow-[0_0_10px_rgba(225,29,72,0.4)]"></span> Global Operator Yields
           </h2>
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
             <Table 
                headers={['Operator Name', 'System Margin', 'Today Vol', 'Protocol Status', 'Actions']}
                data={OPERATOR_SETTINGS}
                renderRow={renderRow}
             />
           </div>
        </div>

        <div className="space-y-8 flex flex-col justify-between">
           <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
              <FaBuilding className="text-rose-600 text-4xl mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2 italic">Company Specific Slabs</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed mb-8 italic">Override global margins for specific corporate entities or high-volume partners.</p>
              
              <div className="space-y-4">
                 <button className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-[1.5rem] hover:bg-white hover:text-black transition-all group/btn">
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Define Custom Exception</span>
                    <FaPlus className="text-rose-500 group-hover/btn:rotate-90 transition-transform" />
                 </button>
                 <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-tighter italic">
                    * Exception Slabs will always take precedence over the Global Margin Table defined to the left.
                 </div>
              </div>
           </div>

           <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem] relative overflow-hidden group">
              <h4 className="text-emerald-800 font-black text-xs uppercase tracking-widest mb-4 italic">Optimization Tip</h4>
              <p className="text-xs text-emerald-900/60 font-medium leading-relaxed italic">
                Increasing the margin for <span className="text-emerald-800 font-black">BSNL</span> by 0.5% could drive 15% more volume based on current market trends.
              </p>
              <div className="absolute right-0 bottom-0 p-6 opacity-5 group-hover:scale-125 transition-transform duration-1000 rotate-12">
                 <FaPercentage size={100} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionManagement;
