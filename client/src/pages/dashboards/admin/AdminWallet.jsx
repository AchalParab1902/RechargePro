import React from 'react';
import Table from '../../../components/Table';
import StatCard from '../../../components/StatCard';
import { FaWallet, FaArrowUp, FaArrowDown, FaBuilding, FaSearch, FaShieldAlt } from 'react-icons/fa';

const AdminWallet = () => {
  const transactions = [
    { id: 'WL-1092', entity: 'Alpha Telecom', type: 'Credit', amount: '50,000.00', date: 'Oct 22, 11:20 AM', status: 'Success' },
    { id: 'WL-1093', entity: 'Zodiac Recharges', type: 'Set Limit', amount: '10,000.00', date: 'Oct 22, 12:45 PM', status: 'Success' },
    { id: 'WL-1094', entity: 'FastPay Solutions', type: 'Debit Correction', amount: '2,500.00', date: 'Oct 22, 02:10 PM', status: 'Pending' },
  ];

  const renderRow = (txn, idx) => (
    <tr key={idx} className="hover:bg-slate-50 border-b border-slate-100 last:border-0 group transition-all">
      <td className="px-6 py-4 font-black text-[10px] text-slate-400 uppercase italic">{txn.id}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <FaBuilding className="text-slate-300 mr-3 text-sm" />
          <span className="font-black text-slate-800 text-xs uppercase italic tracking-tighter">{txn.entity}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest italic border ${
          txn.type === 'Credit' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
          txn.type === 'Set Limit' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-rose-50 text-rose-600 border-rose-100'
        }`}>
          {txn.type}
        </span>
      </td>
      <td className={`px-6 py-4 font-black text-sm tracking-tighter ${txn.type === 'Credit' ? 'text-emerald-600' : 'text-slate-800'}`}>
        ₹{txn.amount}
      </td>
      <td className="px-6 py-4">
        <span className={`w-2 h-2 rounded-full inline-block mr-2 ${txn.status === 'Success' ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`}></span>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{txn.status}</span>
      </td>
      <td className="px-6 py-4 text-[10px] font-bold text-slate-400 italic font-mono uppercase">{txn.date}</td>
    </tr>
  );

  return (
    <div className="space-y-10 animate-in zoom-in-95 duration-500 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">GLOBAL LEDGER</h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1 italic">Company Wallet Audits & Funding Control</p>
        </div>
        <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-black transition-all flex items-center italic">
          <FaArrowUp className="mr-3" /> FUND SECTOR
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="System Reserves" value="₹85,40,000" icon={<FaWallet />} colorClass="rose" />
        <StatCard title="Daily Payouts" value="₹2,45,000" icon={<FaArrowUp />} colorClass="emerald" />
        <StatCard title="Funding Requests" value="08" icon={<FaArrowDown />} colorClass="amber" />
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center group cursor-pointer hover:border-rose-500 transition-all">
           <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-rose-600 group-hover:text-white transition-all"><FaShieldAlt /></div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic group-hover:text-rose-500 transition-colors">Audit Vault</p>
              <p className="text-[10px] font-bold text-slate-600 italic">Secure Ledger Logs</p>
           </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
         <div className="flex-1 relative w-full">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
               type="text" 
               placeholder="Search by Company ID, Reference or Transaction Token..." 
               className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-500/5 transition-all text-xs font-bold italic"
            />
         </div>
         <select className="px-8 py-4 bg-slate-50 border border-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest italic outline-none cursor-pointer hover:bg-slate-100 w-full md:w-auto">
            <option>All Companies</option>
            <option>Alpha Telecom</option>
            <option>Zodiac Recharges</option>
         </select>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <Table 
          headers={['Reference ID', 'Counterparty Entity', 'Action Class', 'Transaction Value', 'Protocol Status', 'Execution Time']}
          data={transactions}
          renderRow={renderRow}
        />
      </div>
    </div>
  );
};

export default AdminWallet;
