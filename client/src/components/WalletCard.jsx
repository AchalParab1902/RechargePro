import React from 'react';
import { FaWallet, FaPlusCircle } from 'react-icons/fa';

const WalletCard = ({ balance, onAddMoney }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl relative overflow-hidden group border border-blue-400/20 group-hover:shadow-blue-500/20 transition-all duration-500">
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
                <FaWallet className="text-lg md:text-xl" />
              </div>
              <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-80 italic">Retailer Node</span>
            </div>
            <div className="bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-500/30 backdrop-blur-sm">
               <span className="text-[8px] md:text-[10px] font-black text-emerald-400 uppercase tracking-widest italic flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]"></span>
                 Encrypted
               </span>
            </div>
          </div>
          
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-200 mb-1 italic opacity-70">Active Liquidity</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-xl md:text-2xl font-black italic text-blue-300 opacity-50">₹</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic tabular-nums break-words">
              {balance?.toLocaleString('en-IN', { minimumFractionDigits: balance > 0 ? 2 : 0 }) || '0'}
            </h2>
          </div>
        </div>

        <button 
          onClick={onAddMoney}
          className="mt-8 md:mt-10 flex items-center justify-center space-x-3 bg-white text-blue-700 py-4 px-6 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl shadow-black/10 hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-95 group/btn border border-transparent hover:border-blue-100"
        >
          <FaPlusCircle className="text-lg group-hover/btn:rotate-90 transition-transform duration-500" />
          <span>Add Money to Wallet</span>
        </button>
      </div>

      {/* Decorative High-End Graphics */}
      <div className="absolute -right-16 -bottom-16 text-white/5 transform -rotate-12 select-none pointer-events-none group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700">
         <FaWallet size={240} />
      </div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/20 rounded-full blur-[80px] -mr-24 -mt-24 opacity-50"></div>
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-[60px] -ml-16 opacity-30"></div>
    </div>
  );
};

export default WalletCard;
