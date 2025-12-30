import React, { useState } from 'react';
import { FaMobileAlt, FaArrowRight, FaHistory } from 'react-icons/fa';
import { OPERATORS } from '../../../utils/constants';

const Recharge = () => {
  const [formData, setFormData] = useState({ mobile: '', operator: '', amount: '' });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Mobile Recharge</h1>
          <p className="text-slate-500">Instant recharge for all major operators.</p>
        </div>
        <button className="flex items-center text-blue-600 bg-blue-50 px-4 py-2 rounded-xl font-bold hover:bg-blue-100 transition-colors">
          <FaHistory className="mr-2" /> Recent Recharges
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Mobile Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">+91</span>
                <input 
                  type="text" 
                  maxLength="10"
                  className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-lg"
                  placeholder="9876543210"
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Select Operator</label>
              <div className="grid grid-cols-3 gap-3">
                {OPERATORS.map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => setFormData({...formData, operator: op})}
                    className={`py-3 rounded-xl border-2 transition-all font-bold ${
                      formData.operator === op 
                      ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-lg shadow-blue-500/10' 
                      : 'border-slate-100 hover:border-slate-200 text-slate-500 bg-white'
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Enter Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input 
                  type="number" 
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-lg"
                  placeholder="0.00"
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 no-scrollbar">
                {['199', '299', '499', '719'].map(val => (
                  <button 
                    key={val}
                    type="button"
                    onClick={() => setFormData({...formData, amount: val})}
                    className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-600 border border-slate-200 whitespace-nowrap"
                  >
                    ₹{val}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full group py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center"
            >
              Proceed to Recharge <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mr-3 text-sm italic font-bold">%</span>
              Special Offers
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-tighter">Limited Time</p>
                <p className="text-sm font-bold text-slate-700">Get 2% Extra Commission on Jio recharges above ₹499</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-800 uppercase tracking-tighter">Weekly Reward</p>
                <p className="text-sm font-bold text-slate-700">Complete 50 recharges today and win ₹500 cashback.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl text-white">
            <h3 className="font-bold flex items-center mb-4">
              <FaHistory className="mr-3 text-blue-400" /> Recent Activity
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-white">9876543{i}21</p>
                    <p className="text-[10px] text-slate-400 italic">Jio • {i}0 mins ago</p>
                  </div>
                  <p className="font-bold text-emerald-400 text-sm">₹299</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
