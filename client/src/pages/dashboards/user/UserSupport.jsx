import React, { useState } from 'react';
import { FaHeadset, FaCommentAlt, FaEnvelope, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';

const UserSupport = () => {
  const [ticketData, setTicketData] = useState({ subject: '', orderId: '', message: '' });

  const tickets = [
    { id: 'TKT-1092', sub: 'Amount debited but recharge failed', status: 'Pending', time: '20 mins ago' },
    { id: 'TKT-1085', sub: 'Slow response in UPI load', status: 'Resolved', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">SUPPORT CENTER</h1>
        <p className="text-slate-500 font-medium italic">We are here to help you 24/7/365.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
           <h2 className="text-lg font-black text-slate-800 uppercase italic tracking-tighter flex items-center">
             <FaCommentAlt className="mr-2 text-blue-600" /> RAISE A COMPLAINT
           </h2>
           <form className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Subject</label>
                  <input type="text" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 text-xs font-bold italic" placeholder="e.g. Failure Issue" />
               </div>
               <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Order ID / Ref (Optional)</label>
                  <input type="text" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 text-xs font-bold italic" placeholder="UXN..." />
               </div>
             </div>
             <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Detailed Message</label>
                <textarea rows="4" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 text-xs font-bold italic" placeholder="Explain your problem here..."></textarea>
             </div>
             <button className="flex items-center justify-center w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest italic shadow-xl shadow-blue-500/10 hover:bg-blue-700 hover:scale-[1.01] active:scale-95 transition-all">
               <FaPaperPlane className="mr-3" /> Submit Case
             </button>
           </form>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-lg font-black uppercase mb-6 tracking-tight italic">ACTIVE TICKETS</h3>
                <div className="space-y-4">
                   {tickets.map(t => (
                     <div key={t.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors">
                        <div>
                           <p className="text-[10px] font-black text-blue-400 uppercase mb-1">{t.id}</p>
                           <p className="text-xs font-bold truncate max-w-[150px] italic">{t.sub}</p>
                        </div>
                        <div className="text-right">
                           <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                              t.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                           }`}>{t.status}</span>
                           <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase italic">{t.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
              <div className="absolute right-0 top-0 p-8 opacity-10 rotate-12 group-hover:scale-125 transition-transform duration-1000">
                 <FaHeadset size={150} />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                 <div className="p-3 bg-blue-50 rounded-xl text-blue-600 mb-3"><FaEnvelope /></div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                 <p className="text-xs font-bold italic">care@system.com</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                 <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 mb-3"><FaPhoneAlt /></div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Call Us</p>
                 <p className="text-xs font-bold italic">+91 1800-44-2222</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserSupport;
