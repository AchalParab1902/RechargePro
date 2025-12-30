import React from 'react';
import { FaCog, FaLock, FaBell, FaGlobe, FaShieldAlt, FaKey } from 'react-icons/fa';

const UserSettings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">ACCOUNT SETTINGS</h1>
        <p className="text-slate-500 font-medium italic">Tailor your dashboard preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm lg:col-span-2 space-y-8">
           <div>
              <h2 className="text-lg font-black text-slate-800 uppercase italic tracking-tighter flex items-center mb-6">
                <FaLock className="mr-2 text-blue-600" /> CHANGE PASSWORD
              </h2>
              <form className="space-y-6">
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 text-xs font-bold" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">New Password</label>
                       <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 text-xs font-bold" />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Confirm Password</label>
                       <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 text-xs font-bold" />
                    </div>
                 </div>
                 <button className="flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest italic shadow-xl hover:bg-black active:scale-95 transition-all">
                    Update Password <FaKey className="ml-3" />
                 </button>
              </form>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center italic">
                <FaBell className="mr-2 text-blue-500" /> Notifications
              </h3>
              <div className="space-y-4">
                 {[
                   { label: 'Recharge Success Alerts', default: true },
                   { label: 'System Announcements', default: true },
                   { label: 'Low Balance Warning', default: false }
                 ].map((opt, i) => (
                   <div key={i} className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-600 italic tracking-tight">{opt.label}</span>
                     <div className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${opt.default ? 'bg-blue-600' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${opt.default ? 'left-6' : 'left-1'}`}></div>
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 flex items-center">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 text-indigo-600">
                <FaShieldAlt />
              </div>
              <div>
                 <p className="text-[10px] font-black text-indigo-800 uppercase tracking-tighter mb-0.5">2FA Security</p>
                 <p className="text-[10px] font-bold text-indigo-400 italic">Highly Recommended</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
