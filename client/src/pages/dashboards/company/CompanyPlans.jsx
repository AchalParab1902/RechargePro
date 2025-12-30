import React, { useState } from 'react';
import { FaPlus, FaCube, FaStream } from 'react-icons/fa';
import PlanList from './PlanList';
import CreatePlanModal from './CreatePlanModal';
import CreatePackModal from './CreatePackModal';

const CompanyPlans = () => {
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const [isPackModalOpen, setIsPackModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                   <h1 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Product Inventory</h1>
                   <p className="text-xs font-bold text-slate-400 italic">Manage and deploy your recharge catalog architecture.</p>
                </div>
                <div className="flex items-center gap-3">
                   <button 
                     onClick={() => setIsPackModalOpen(true)}
                     className="px-6 py-3 bg-white border border-slate-100 text-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center"
                   >
                     <FaCube className="mr-2 text-blue-500" /> Group Pack
                   </button>
                   <button 
                     onClick={() => setIsPlanModalOpen(true)}
                     className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 shadow-xl transition-all flex items-center"
                   >
                     <FaPlus className="mr-2" /> Launch New Plan
                   </button>
                </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10 w-full md:w-2/3">
                   <span className="text-[9px] font-black bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full uppercase tracking-[0.2em] italic mb-4 inline-block">Strategy Hub</span>
                   <h2 className="text-xl font-black italic uppercase tracking-tight mb-2">Architect Your Offerings</h2>
                   <p className="text-slate-400 text-xs font-medium italic leading-relaxed">
                      Deploy individual plans for specific operators or bundle them into high-value packs. 
                      Packs increase your volume while providing centralized billing for your retailers.
                   </p>
                </div>
                <FaStream className="absolute -right-8 -bottom-8 text-slate-800/50" size={200} />
            </div>

            <PlanList refreshTrigger={refreshTrigger} />

            <CreatePlanModal 
                isOpen={isPlanModalOpen} 
                onClose={() => setIsPlanModalOpen(false)} 
                onPlanCreated={() => setRefreshTrigger(prev => prev + 1)}
            />

            <CreatePackModal 
                isOpen={isPackModalOpen} 
                onClose={() => setIsPackModalOpen(false)} 
                onPackCreated={() => setRefreshTrigger(prev => prev + 1)}
            />
        </div>
    );
};

export default CompanyPlans;
