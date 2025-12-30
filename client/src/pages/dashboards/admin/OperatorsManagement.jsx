import React from 'react';
import Table from '../../../components/Table';
import { FaSignal, FaPlus, FaCheckCircle, FaTimesCircle, FaTools, FaTrash } from 'react-icons/fa';
import { OPERATOR_SETTINGS } from '../../../utils/constants';

const OperatorsManagement = () => {
  const renderRow = (op, idx) => (
    <tr key={idx} className="hover:bg-slate-50 border-b border-slate-100 last:border-0 group transition-all">
      <td className="px-6 py-4">
         <div className="flex items-center">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white mr-4 shadow-lg shadow-black/10">
               <FaSignal />
            </div>
            <span className="font-black text-slate-800 text-sm uppercase italic tracking-tighter">{op.name}</span>
         </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-black text-slate-500 text-[10px] uppercase tracking-widest italic bg-slate-100 px-3 py-1 rounded-lg">API INTEGRATION v1.2</span>
      </td>
      <td className="px-6 py-4">
        <span className={`flex items-center text-[10px] font-black uppercase tracking-widest italic ${op.status === 'Active' ? 'text-emerald-500' : 'text-rose-500'}`}>
          {op.status === 'Active' ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
          {op.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
           <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm border border-slate-100"><FaTools size={14} /></button>
           <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-sm border border-slate-100"><FaTrash size={14} /></button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-10 animate-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center">
             <FaSignal className="mr-4 text-rose-600" /> CARRIER GATEWAY
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1 italic">Service Provider Integration Hub</p>
        </div>
        <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-black transition-all flex items-center italic">
          <FaPlus className="mr-3" /> Attach New Gateway
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Links', val: '12', color: 'rose' },
          { label: 'Online Links', val: '11', color: 'emerald' },
          { label: 'Latency avg.', val: '1.2s', color: 'blue' },
          { label: 'Downtime', val: '2h', color: 'amber' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl group">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[.2em] mb-2 group-hover:text-rose-500 transition-colors uppercase italic">{item.label}</p>
             <p className="text-3xl font-black text-slate-800 italic tracking-tighter">{item.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none select-none italic text-slate-900 font-black text-6xl">GATEWAY</div>
        <Table 
          headers={['Carrier Identity', 'Protocol Version', 'Node Status', 'Gateway Actions']}
          data={OPERATOR_SETTINGS}
          renderRow={renderRow}
        />
      </div>
    </div>
  );
};

export default OperatorsManagement;
