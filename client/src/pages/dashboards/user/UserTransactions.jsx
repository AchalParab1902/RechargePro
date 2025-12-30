import React from 'react';
import Table from '../../../components/Table';
import { FaSearch, FaFilter, FaFileDownload } from 'react-icons/fa';
import { USER_TRANSACTIONS } from '../../../utils/constants';

const UserTransactions = () => {
  const renderRow = (txn, idx) => (
    <tr key={idx} className="hover:bg-slate-50 transition-all border-b border-slate-100 last:border-0 group">
      <td className="px-6 py-4 font-black text-blue-600 italic font-mono transition-transform group-hover:translate-x-1">{txn.id}</td>
      <td className="px-6 py-4 font-black text-slate-800 tracking-wider font-mono">{txn.mobile}</td>
      <td className="px-6 py-4">
        <span className="font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg text-xs uppercase tracking-tight">
          {txn.operator}
        </span>
      </td>
      <td className="px-6 py-4 font-black text-slate-800 tracking-tighter italic">₹{txn.amount}</td>
      <td className="px-6 py-4 font-black text-emerald-600 text-xs italic">{txn.commission}</td>
      <td className="px-6 py-4">
        <span className={`px-4 py-1 rounded-xl text-[10px] font-black italic tracking-widest border uppercase ${
          txn.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
          txn.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
        }`}>
          {txn.status}
        </span>
      </td>
      <td className="px-6 py-4 text-[10px] font-bold text-slate-400 italic uppercase">{txn.date}</td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">RECHARGE LOGS</h1>
          <p className="text-sm font-medium text-slate-500 italic">Complete history of all successful and failed attempts.</p>
        </div>
        <button className="flex items-center justify-center bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-slate-700 transition-all">
          <FaFileDownload className="mr-2" /> Download Log
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search number, ID or operator..." 
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-bold"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm flex items-center hover:bg-slate-50">
            <FaFilter className="mr-2 text-blue-500" /> Filter
          </button>
          <select className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-black text-xs uppercase italic tracking-widest outline-none cursor-pointer">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      <Table 
        headers={['Order ID', 'Recipient', 'Operator', 'Value', 'Comm.', 'Status', 'Timestamp']}
        data={USER_TRANSACTIONS}
        renderRow={renderRow}
      />
    </div>
  );
};

export default UserTransactions;
