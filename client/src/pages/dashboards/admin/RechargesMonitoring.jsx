import React from 'react';
import Table from '../../../components/Table';
import { FaDesktop, FaSearch, FaFilter, FaDownload, FaSync } from 'react-icons/fa';
import { RECENT_TRANSACTIONS } from '../../../utils/constants';

const RechargesMonitoring = () => {
  const renderRow = (txn, idx) => (
    <tr key={idx} className="hover:bg-slate-50 border-b border-slate-100 last:border-0 group transition-all">
      <td className="px-6 py-4 font-black text-[10px] text-slate-400 uppercase italic group-hover:text-rose-600 transition-colors">{txn.id}</td>
      <td className="px-6 py-4 font-black text-slate-800 text-xs uppercase italic tracking-tighter">{txn.user}</td>
      <td className="px-6 py-4 font-mono font-bold text-slate-500 text-xs tracking-widest">{txn.mobile}</td>
      <td className="px-6 py-4">
        <span className="font-black text-slate-600 text-[10px] uppercase tracking-widest border border-slate-200 px-3 py-1 rounded-lg bg-slate-50">{txn.operator}</span>
      </td>
      <td className="px-6 py-4 font-black text-slate-800 text-sm italic tracking-tighter">₹{txn.amount}</td>
      <td className="px-6 py-4">
        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black italic tracking-[0.1em] uppercase border ${
          txn.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
          txn.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
        }`}>
          {txn.status}
        </span>
      </td>
      <td className="px-6 py-4 text-[10px] font-bold text-slate-400 italic uppercase">{txn.date}</td>
    </tr>
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center">
             <FaDesktop className="mr-4 text-rose-600" /> SYSTEM MONITOR
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1 italic">Real-time Global Recharge Stream</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all shadow-sm flex items-center">
            <FaDownload className="mr-3" /> EXPORT REPORT
          </button>
          <button className="bg-rose-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-600/10 hover:bg-rose-700 transition-all active:scale-95 italic flex items-center">
            <FaSync className="mr-3" /> REFRESH LIVE
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
         <div className="flex-1 relative w-full">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
               type="text" 
               placeholder="Trace Transaction ID, Mobile number or Retailer..." 
               className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-500/5 transition-all text-xs font-bold italic shadow-inner"
            />
         </div>
         <div className="flex gap-3 w-full lg:w-auto">
            <button className="px-8 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest italic flex items-center justify-center flex-1 lg:flex-none">
               <FaFilter className="mr-3 text-rose-500" /> Filter Protocol
            </button>
            <select className="px-8 py-5 bg-white border border-slate-200 text-slate-600 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest italic outline-none cursor-pointer flex-1 lg:flex-none">
               <option>All Status</option>
               <option>Success Only</option>
               <option>Failures Only</option>
               <option>Pending Only</option>
            </select>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-30 shadow-[0_0_15px_rgba(244,63,94,0.5)]"></div>
        <Table 
          headers={['Transaction ID', 'Initiator (Retailer)', 'Destination', 'Carrier Entity', 'Order Value', 'Status Protocol', 'Timestamp']}
          data={RECENT_TRANSACTIONS}
          renderRow={renderRow}
        />
        <div className="p-8 border-t border-slate-50 text-center">
           <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest border-b-2 border-rose-600/20 hover:border-rose-600 transition-all italic pb-1">Load Older Records</button>
        </div>
      </div>
    </div>
  );
};

export default RechargesMonitoring;
