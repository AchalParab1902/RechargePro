import React from 'react';

const StatCard = ({ title, value, icon, trend, trendUp, colorClass = "blue" }) => {
  const colorMap = {
    blue: "from-blue-600 to-indigo-600 shadow-blue-500/20",
    emerald: "from-emerald-500 to-teal-600 shadow-emerald-500/20",
    amber: "from-amber-400 to-orange-600 shadow-amber-500/20",
    indigo: "from-indigo-500 to-purple-600 shadow-indigo-500/20",
    rose: "from-rose-500 to-pink-600 shadow-rose-500/20",
  };

  const gradient = colorMap[colorClass] || colorMap.blue;

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-[0.03] -mr-8 -mt-8 rounded-full`}></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
          <span className="text-xl">{React.cloneElement(icon, { size: 24 })}</span>
        </div>
        {trend && (
          <div className="flex flex-col items-end">
             <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase italic tracking-tighter ${trendUp ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
               {trendUp ? '+' : '-'}{trend}
             </span>
          </div>
        )}
      </div>
      
      <div className="relative z-10">
        <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">{title}</h3>
        <p className="text-2xl md:text-3xl font-black text-slate-800 italic tracking-tighter tabular-nums break-words">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
