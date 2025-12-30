import React from 'react';
import StatCard from '../../../components/StatCard';
import Table from '../../../components/Table';
import { FaCoins, FaArrowUp, FaTrophy, FaLayerGroup } from 'react-icons/fa';
import { USER_STATS, USER_TRANSACTIONS } from '../../../utils/constants';

const UserEarnings = () => {
  const earningsData = USER_TRANSACTIONS.map(t => ({
    id: t.id,
    amount: t.amount,
    commission: t.commission,
    status: t.status,
    date: t.date.split(' ')[0]
  }));

  const renderRow = (item, idx) => (
    <tr key={idx} className="hover:bg-slate-50 border-b border-slate-100 last:border-0">
      <td className="px-6 py-4 font-bold text-slate-500 text-xs">{item.id}</td>
      <td className="px-6 py-4 font-black">₹{item.amount}</td>
      <td className="px-6 py-4 font-black text-emerald-600 italic">{item.commission}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
           item.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}>
          {item.status}
        </span>
      </td>
      <td className="px-6 py-4 text-xs font-bold text-slate-400 italic font-mono">{item.date}</td>
    </tr>
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">MY EARNINGS</h1>
        <p className="text-slate-500 font-medium italic">Track your commissions and profit margins.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Commission" value={`₹${USER_STATS.totalEarnings}`} icon={<FaCoins />} colorClass="emerald" />
        <StatCard title="This Month" value="₹2,450.00" icon={<FaArrowUp />} colorClass="blue" />
        <StatCard title="Active Retailer Rank" value="#124" icon={<FaTrophy />} colorClass="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm transition-all hover:shadow-xl">
             <h2 className="text-lg font-black text-slate-800 uppercase italic mb-6 tracking-tighter">EARNINGS BREAKDOWN</h2>
             <Table 
               headers={['TXN ID', 'TXN VALUE', 'YOUR PROFIT', 'STATUS', 'DATE']}
               data={earningsData}
               renderRow={renderRow}
             />
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
              <FaLayerGroup className="text-blue-500 mb-4 text-3xl opacity-80 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-black uppercase mb-1 tracking-tight">Slab Settings</h3>
              <p className="text-xs text-slate-400 mb-6 italic leading-relaxed">Currently you are on the <span className="text-white font-bold italic">Standard Profit Slab</span>. Increase your daily volume to auto-upgrade.</p>
              <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">
                    <span>Current</span> <span>Next Level</span>
                 </div>
                 <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-2/3 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                 </div>
                 <p className="mt-3 text-[10px] font-bold text-center text-blue-400 uppercase tracking-tighter tracking-widest">₹14,500 more for Premium Slab</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserEarnings;
