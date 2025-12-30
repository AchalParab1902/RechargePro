import React from 'react';
import { FaHeadset, FaCommentAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { COMPLAINTS } from '../../../utils/constants';

const Support = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Support Center</h1>
          <p className="text-slate-500 font-medium">We're here to help you 24/7.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center">
          <FaCommentAlt className="mr-2" /> New Complaint
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 mb-4 px-2">Active Complaints</h2>
          <div className="space-y-4">
            {COMPLAINTS.map(ticket => (
              <div key={ticket.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mr-5 ${
                    ticket.status === 'Open' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {ticket.status === 'Open' ? '⏳' : '✅'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{ticket.subject}</h3>
                    <p className="text-xs font-semibold text-slate-500 font-mono tracking-widest uppercase">{ticket.id} • {ticket.date}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black italic tracking-widest border uppercase ${
                  ticket.status === 'Open' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                }`}>
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-xl font-black mb-6 flex items-center relative z-10 transition-transform hover:translate-x-1">
              <FaHeadset className="mr-3 text-blue-400" /> Need Help?
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="flex items-start">
                <div className="p-3 bg-white/10 rounded-xl mr-4 text-blue-400">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Email Support</p>
                  <p className="text-sm font-black italic tracking-tight underline cursor-pointer hover:text-blue-300">support@rechargepro.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-white/10 rounded-xl mr-4 text-emerald-400">
                  <FaPhone />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">24/7 Helpline</p>
                  <p className="text-sm font-black italic tracking-tight hover:text-emerald-300 cursor-pointer">+91 8800 123 456</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <FaHeadset size={200} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-sm font-bold text-slate-400 italic mb-4 uppercase tracking-tighter">Average Response Time</p>
            <p className="text-4xl font-black text-slate-800 tracking-tighter">15 MINS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
