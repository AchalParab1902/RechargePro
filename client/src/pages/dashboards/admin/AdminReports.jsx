import React from 'react';
import StatCard from '../../../components/StatCard';
import Table from '../../../components/Table';
import { FaChartBar, FaFileExcel, FaFilter, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const AdminReports = () => {
  const reportsData = [
    { period: 'May 2023', volume: '₹1.2Cr', profit: '₹4.5L', margin: '3.75%', growth: '+12%' },
    { period: 'June 2023', volume: '₹1.4Cr', profit: '₹5.2L', margin: '3.71%', growth: '+14%' },
    { period: 'July 2023', volume: '₹1.3Cr', profit: '₹4.8L', margin: '3.69%', growth: '-2%' },
  ];

  const renderRow = (row, idx) => (
    <tr key={idx} className="hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors">
      <td className="px-6 py-4 font-black text-slate-800 text-xs italic tracking-tighter">{row.period}</td>
      <td className="px-6 py-4 font-black text-slate-700 text-sm italic tracking-tighter">{row.volume}</td>
      <td className="px-6 py-4 font-black text-emerald-600 text-sm italic tracking-tighter">{row.profit}</td>
      <td className="px-6 py-4 font-black text-rose-500 text-[10px] uppercase tracking-widest bg-rose-50 inline-block px-3 py-1 rounded-lg mt-3">{row.margin}</td>
      <td className="px-6 py-4">
         <span className={`font-black text-xs italic flex items-center ${row.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
            {row.growth.startsWith('+') ? <FaArrowUp className="mr-2" /> : <FaArrowDown className="mr-2" />}
            {row.growth}
         </span>
      </td>
    </tr>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center">
             <FaChartBar className="mr-4 text-rose-600" /> SYSTEM INTELLIGENCE
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1 italic">Analytical Reports & Business Ledger</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-600/10 hover:bg-emerald-700 transition-all flex items-center italic">
            <FaFileExcel className="mr-3" /> Export Ledger (.xlsx)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatCard title="Annual Turnover" value="₹14.2 Cr" icon={<FaChartBar />} colorClass="blue" />
         <StatCard title="Net Profit Margin" value="₹54.2 L" icon={<FaArrowUp />} colorClass="emerald" />
         <StatCard title="Total Tax Liability" value="₹12.4 L" icon={<FaArrowDown />} colorClass="rose" />
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
         <div className="flex-1 w-full">
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-4 italic">Periodicity Filters</h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
               {['Custom', 'Last 7 Days', 'Last 30 Days', 'Financial Year'].map(f => (
                  <button key={f} className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest italic transition-all whitespace-nowrap ${f === 'Last 30 Days' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>{f}</button>
               ))}
            </div>
         </div>
         <div className="w-full md:w-auto pt-8 md:pt-0">
            <button className="w-full md:w-auto px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest italic hover:bg-slate-900 hover:text-white transition-all">
               <FaFilter className="inline mr-2" /> Apply Protocol
            </button>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <Table 
          headers={['Report Cycle', 'Gross Volume', 'Operational Profit', 'Yield %', 'Growth Delta']}
          data={reportsData}
          renderRow={renderRow}
        />
      </div>
    </div>
  );
};

export default AdminReports;
