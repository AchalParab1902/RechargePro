import React from 'react';
import { FaUserShield, FaKey, FaShieldAlt, FaFingerprint, FaCogs, FaClock } from 'react-icons/fa';

const AdminSettings = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in slide-in-from-bottom-6 duration-700 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">SYSTEM CONTROL</h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1 italic text-rose-600">Master Level Security & Configurations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
              <h2 className="text-sm font-black text-slate-800 uppercase italic tracking-[0.3em] flex items-center mb-10">
                <FaUserShield className="mr-4 text-rose-600" /> MASTER PROFILE
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Admin Identity</label>
                    <input type="text" className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none font-black italic text-xs tracking-tight uppercase" value="SYSTEM OVERLORD" readOnly />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Terminal ID</label>
                    <input type="text" className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none font-mono font-black italic text-xs text-rose-600" value="NODE_MASTER_01" readOnly />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Security Clearance</label>
                    <input type="text" className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none font-black italic text-xs text-emerald-600" value="LEVEL 7 CRITICAL" readOnly />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Recovery Pulse</label>
                    <input type="text" className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none font-black italic text-xs" value="admin@central.io" />
                 </div>
              </div>
              <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none rotate-12">
                 <FaFingerprint size={250} />
              </div>
           </div>

           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <h2 className="text-sm font-black text-slate-800 uppercase italic tracking-[0.3em] flex items-center mb-10">
                <FaKey className="mr-4 text-rose-600" /> AUTH ROTATION
              </h2>
              <form className="space-y-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Current Master Token</label>
                    <input type="password" placeholder="••••••••••••••••" className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none font-black" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">New Alpha-Key</label>
                       <input type="password" placeholder="••••••••" className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none font-black" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Confirm Alpha-Key</label>
                       <input type="password" placeholder="••••••••" className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none font-black" />
                    </div>
                 </div>
                 <button className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] italic shadow-xl shadow-black/20 hover:bg-black transition-all active:scale-95">
                    Rotate Security Tokens
                 </button>
              </form>
           </div>
        </div>

        <div className="space-y-10">
           <div className="bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500 italic mb-8 flex items-center">
                 <FaShieldAlt className="mr-3" /> SECURITY HUB
              </h3>
              <div className="space-y-8">
                 {[
                   { label: 'Multi-Factor Auth', status: 'Enabled', val: true },
                   { label: 'API Key Restriction', status: 'Rigid', val: true },
                   { label: 'Fail-Safe Mode', status: 'Inactive', val: false },
                 ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between group/opt cursor-pointer">
                      <div>
                         <p className="text-xs font-black uppercase tracking-widest italic group-hover/opt:text-rose-500 transition-colors">{s.label}</p>
                         <p className={`text-[9px] font-bold mt-1 uppercase ${s.val ? 'text-emerald-500' : 'text-slate-600'}`}>{s.status}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors ${s.val ? 'bg-rose-600' : 'bg-slate-800'}`}>
                         <div className={`absolute top-1.5 w-3 h-3 bg-white rounded-full transition-all ${s.val ? 'left-8' : 'left-1.5'}`}></div>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-12 pt-8 border-t border-white/5">
                 <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic hover:text-white transition-colors">
                    Reset Security Protocol
                 </button>
              </div>
           </div>

           <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 flex items-center transition-all hover:bg-slate-950 hover:text-white group cursor-help">
              <div className="w-12 h-12 bg-slate-50 group-hover:bg-slate-900 rounded-2xl flex items-center justify-center mr-5 transition-colors">
                 <FaClock className="text-rose-600 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Last Hard Reset</p>
                 <p className="text-xs font-black italic">August 15, 2023</p>
              </div>
           </div>

           <div className="bg-rose-50 border border-rose-100 p-8 rounded-[2.5rem] relative overflow-hidden">
              <h4 className="text-rose-900 font-black text-xs uppercase tracking-widest mb-4 italic">Maintenance Warning</h4>
              <p className="text-[10px] text-rose-900/60 font-bold uppercase italic leading-relaxed tracking-tighter">
                Manual system overrides will be disabled during the scheduled cloud migration on 24th December.
              </p>
              <FaCogs className="absolute right-0 bottom-0 text-rose-200 rotate-12 opacity-30 select-none -mr-4 -mb-4" size={100} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
