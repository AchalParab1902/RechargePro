import React from 'react';
import StatCard from '../../../components/StatCard';
import Table from '../../../components/Table';
import { FaWallet, FaArrowUp, FaArrowDown, FaPlusCircle } from 'react-icons/fa';
import { DUMMY_STATS } from '../../../utils/constants';

const Wallet = () => {
  const transactions = [
    { id: 'W-9981', type: 'Credit', src: 'Admin Load', amount: '5,000.00', status: 'Success', date: 'Oct 20, 2023' },
    { id: 'W-9982', type: 'Debit', src: 'Recharge #TXN1024', amount: '299.00', status: 'Success', date: 'Oct 21, 2023' },
    { id: 'W-9983', type: 'Credit', src: 'UPI Deposit', amount: '1,000.00', status: 'Pending', date: 'Just now' },
  ];

  const renderRow = (item, idx) => (
    <tr key={idx} className="hover:bg-slate-50 transition-all border-b border-slate-100 last:border-0">
      <td className="px-6 py-4 font-mono text-sm text-slate-500">{item.id}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg mr-3 ${item.type === 'Credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            {item.type === 'Credit' ? <FaArrowDown className="rotate-180" /> : <FaArrowUp />}
          </div>
          <span className="font-bold text-slate-700 text-sm">{item.type}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-slate-600 font-medium text-sm">{item.src}</td>
      <td className={`px-6 py-4 font-bold text-sm ${item.type === 'Credit' ? 'text-emerald-600' : 'text-slate-800'}`}>
        {item.type === 'Credit' ? '+' : '-'} ₹{item.amount}
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
          item.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
        }`}>
          {item.status}
        </span>
      </td>
      <td className="px-6 py-4 text-xs text-slate-400">{item.date}</td>
    </tr>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Wallet Management</h1>
          <p className="text-slate-500">Manage your balance and request funds.</p>
        </div>
        <button className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
          <FaPlusCircle className="mr-2" /> Add Money
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Balance" value={`₹${DUMMY_STATS.walletBalance}`} icon={<FaWallet />} colorClass="emerald" />
        <StatCard title="Total Added" value="₹1,45,000" icon={<FaPlusCircle />} colorClass="blue" />
        <StatCard title="Total Withdrawn" value="₹1,19,550" icon={<FaArrowUp />} colorClass="rose" />
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Wallet Activity</h2>
        <Table 
          headers={['TXN ID', 'Type', 'Description', 'Amount', 'Status', 'Date']}
          data={transactions}
          renderRow={renderRow}
        />
      </div>
    </div>
  );
};

export default Wallet;
