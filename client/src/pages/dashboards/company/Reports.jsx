import React from 'react';
import StatCard from '../../../components/StatCard';
import { FaChartLine, FaArrowUp, FaArrowDown, FaCalendarAlt } from 'react-icons/fa';

const Reports = () => {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">BUSINESS REPORTS</h1>
          <p className="text-slate-500 font-medium">Analyze your growth and performance.</p>
        </div>
        <button className="flex items-center bg-white border border-slate-200 px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <FaCalendarAlt className="mr-2 text-blue-500" /> Filter Range
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Weekly Growth" value="+24.5%" icon={<FaChartLine />} colorClass="blue" trend="8% vs last week" trendUp={true} />
        <StatCard title="Avg. Ticket Size" value="₹342.00" icon={<FaArrowUp />} colorClass="amber" />
        <StatCard title="Success Rate" value="98.2%" icon={<FaArrowDown className="rotate-180" />} colorClass="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
            Operator Performance
          </h3>
          <div className="space-y-6">
            {[
              { name: 'Jio', percent: 45, color: 'bg-blue-600' },
              { name: 'Airtel', percent: 32, color: 'bg-rose-500' },
              { name: 'Vi', percent: 18, color: 'bg-amber-500' },
              { name: 'Others', percent: 5, color: 'bg-indigo-500' },
            ].map(op => (
              <div key={op.name}>
                <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                  <span>{op.name}</span>
                  <span>{op.percent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${op.color} rounded-full`} style={{ width: `${op.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-900/20 text-white">
          <h3 className="text-lg font-bold mb-6">Summary of Activity</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <span className="text-slate-400 text-sm italic">Total Volume (MTD)</span>
              <span className="text-3xl font-black">₹4,25,000</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <span className="text-slate-400 text-sm italic">Commission (MTD)</span>
              <span className="text-3xl font-black text-emerald-400">₹12,450</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <span className="text-slate-400 text-sm italic">New Partners</span>
              <span className="text-3xl font-black text-blue-400">28</span>
            </div>
          </div>
          <button className="w-full mt-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors">
            Download Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
