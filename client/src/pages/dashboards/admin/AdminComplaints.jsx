import React from 'react';
import Table from '../../../components/Table';
import { FaHeadset, FaSearch, FaFilter, FaCheckCircle, FaExclamationCircle, FaUserShield } from 'react-icons/fa';

const AdminComplaints = () => {
  const complaints = [
    { id: 'SYS-88', user: 'Rahul Retail', type: 'Payment', status: 'High', date: '5 mins ago', subject: 'UPI Load Failure' },
    { id: 'SYS-87', user: 'Zodiac Corp', type: 'Gateway', status: 'Closed', date: '2 hours ago', subject: 'Airtel API Latency' },
    { id: 'SYS-86', user: 'Alpha Mobile', type: 'Wallet', status: 'Medium', date: 'yesterday', subject: 'Incorrect Balance' },
  ];

  const renderRow = (case_item, idx) => (
    <tr key={idx} className="hover:bg-slate-50 border-b border-slate-100 last:border-0 group transition-all">
      <td className="px-6 py-4 font-black text-[10px] text-slate-400 uppercase italic transition-transform group-hover:translate-x-1">{case_item.id}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mr-3 text-xs italic font-black">{case_item.user[0]}</div>
          <span className="font-black text-slate-800 text-xs uppercase italic tracking-tighter">{case_item.user}</span>
        </div>
      </td>
      <td className="px-6 py-4 font-black text-slate-700 text-xs italic tracking-tighter truncate max-w-[200px]">{case_item.subject}</td>
      <td className="px-6 py-4">
        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black italic tracking-[0.1em] uppercase border ${
          case_item.status === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
          case_item.status === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
        }`}>
          {case_item.status} Priority
        </span>
      </td>
      <td className="px-6 py-4 text-[10px] font-bold text-slate-400 italic uppercase">{case_item.date}</td>
      <td className="px-6 py-4 text-right">
        <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors italic">Handle Case</button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-10 animate-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center">
             <FaHeadset className="mr-4 text-rose-600" /> SYSTEM SUPPORT HUB
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1 italic">Global Ticket & Conflict Resolution Queue</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center shadow-sm">
             <div className="w-8 h-8 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center mr-3 italic font-black text-xs">8</div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Live Tickets</p>
          </div>
          <button className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-600/5 hover:bg-black transition-all italic flex items-center">
             <FaUserShield className="mr-3 text-rose-500" /> Admin Shield Mode
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
         <div className="flex-1 relative w-full">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
               type="text" 
               placeholder="Filter by Ticket ID, Content or Reporter..." 
               className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-500/5 transition-all text-xs font-bold italic shadow-inner"
            />
         </div>
         <div className="flex gap-3">
            <button className="px-8 py-5 bg-white border border-slate-200 text-slate-600 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest italic hover:bg-slate-50 transition-all">
               <FaFilter className="inline mr-2" /> Protocols
            </button>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <Table 
          headers={['Case Ref.', 'Concerned Party', 'Subject Context', 'Severity Protocol', 'Entry Age', 'Resolution Gate']}
          data={complaints}
          renderRow={renderRow}
        />
      </div>
    </div>
  );
};

export default AdminComplaints;
