import React from 'react';
import Table from '../../../components/Table';
import { FaSearch, FaFilter, FaDownload } from 'react-icons/fa';
import { RECENT_TRANSACTIONS } from '../../../utils/constants';

const Transactions = () => {
  const renderRow = (txn, idx) => (
    <tr key={idx} className="hover:bg-slate-50 transition-all border-b border-slate-100 last:border-0 group">
      <td className="px-6 py-4 font-bold text-blue-600 group-hover:scale-105 transition-transform">{txn.id}</td>
      <td className="px-6 py-4">
        <p className="font-bold text-slate-800">{txn.user}</p>
        <p className="text-xs text-slate-500 font-medium">{txn.mobile}</p>
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold text-slate-600 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2"></span>
          {txn.operator}
        </span>
      </td>
      <td className="px-6 py-4 font-extrabold text-slate-800">₹{txn.amount}</td>
      <td className="px-6 py-4">
        <span className={`px-4 py-1.5 rounded-xl text-xs font-black italic tracking-wider ${
          txn.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
          txn.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
        }`}>
          {txn.status.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 text-xs font-medium text-slate-400">{txn.date}</td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">TRANSACTION HISTORY</h1>
          <p className="text-sm font-medium text-slate-500 italic">Tracking all your recharge operations.</p>
        </div>
        <button className="flex items-center justify-center bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-slate-700 transition-all active:scale-95">
          <FaDownload className="mr-2" /> Export CSV
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID, Mobile or Name..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm font-medium"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm flex items-center hover:bg-slate-50 transition-colors">
            <FaFilter className="mr-2 text-blue-500" /> Filter
          </button>
          <select className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm outline-none hover:border-blue-300 transition-all appearance-none pr-8 relative cursor-pointer">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      <Table 
        headers={['Order ID', 'Recipient', 'Operator', 'Value', 'Status', 'Timestamp']}
        data={RECENT_TRANSACTIONS}
        renderRow={renderRow}
      />
    </div>
  );
};

export default Transactions;
