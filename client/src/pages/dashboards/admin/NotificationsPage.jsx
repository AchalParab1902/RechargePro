import React from 'react';
import { FaBell, FaPaperPlane, FaUserFriends, FaBuilding, FaGlobeAmericas, FaHistory } from 'react-icons/fa';

const NotificationsPage = () => {
  const history = [
    { target: 'Global', content: 'Holiday commission bonus active from tomorrow.', time: '2 hours ago', status: 'Sent' },
    { target: 'Companies', content: 'New API documentation updated. Check portal.', time: 'Yesterday', status: 'Sent' },
  ];

  return (
    <div className="space-y-10 animate-in zoom-in-95 duration-500 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center">
             <FaBell className="mr-4 text-rose-600" /> BROADCAST PROTOCOL
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1 italic">Send System-Wide Announcements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-10">
           <div className="space-y-6">
              <h2 className="text-sm font-black text-slate-800 uppercase italic tracking-[0.3em] flex items-center">
                <FaPaperPlane className="mr-3 text-rose-600" /> COMPOSE ANNOUNCEMENT
              </h2>
              <div className="grid grid-cols-3 gap-3">
                 {[
                   { id: 'global', label: 'Global', icon: <FaGlobeAmericas /> },
                   { id: 'retailers', label: 'Retailers', icon: <FaUserFriends /> },
                   { id: 'corporate', label: 'Corporate', icon: <FaBuilding /> },
                 ].map(t => (
                   <button key={t.id} className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-rose-50 hover:border-rose-100 hover:text-rose-600 transition-all group">
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{t.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest italic">{t.label}</span>
                   </button>
                 ))}
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-2">Message Content</label>
                 <textarea rows="6" className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-rose-500/5 text-xs font-bold italic" placeholder="Type your system announcement here..."></textarea>
              </div>
              <button className="w-full py-5 bg-rose-600 text-white rounded-[2rem] font-black font-black text-[10px] uppercase tracking-[0.3em] italic shadow-xl shadow-rose-600/20 hover:bg-rose-700 active:scale-95 transition-all flex items-center justify-center">
                <FaPaperPlane className="mr-3" /> INITIALIZE BROADCAST
              </button>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic mb-8 flex items-center">
                 <FaHistory className="mr-3" /> LOG HISTORY
              </h3>
              <div className="space-y-6">
                 {history.map((h, i) => (
                   <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-[1.5rem] relative overflow-hidden group/item hover:bg-white/10 transition-all">
                      <div className="flex justify-between items-start mb-3">
                         <span className="px-3 py-1 bg-rose-600 text-white rounded-lg text-[8px] font-black uppercase tracking-widest italic">{h.target}</span>
                         <span className="text-[9px] font-black text-slate-500 italic uppercase">{h.time}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-300 leading-relaxed italic truncate">{h.content}</p>
                   </div>
                 ))}
              </div>
              <div className="absolute right-0 bottom-0 p-10 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                 <FaBell size={200} />
              </div>
           </div>

           <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[2.5rem]">
              <h4 className="text-indigo-900 font-black text-[10px] uppercase tracking-widest mb-3 italic">Broadcast Protocol Tip</h4>
              <p className="text-xs text-indigo-900/50 font-medium italic leading-relaxed uppercase tracking-tight">
                Global broadcasts are prioritized and delivered within 2ms across all active user sessions and endpoints.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
