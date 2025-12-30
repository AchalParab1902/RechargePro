import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table';
import { FaCheckCircle, FaTimesCircle, FaPowerOff } from 'react-icons/fa';
import api from '../../../api/axios';
import toast from 'react-hot-toast';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/retailers');
      setUsers(data); 
    } catch (error) {
      toast.error('Failed to resolve retailer identities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/admin/user/${id}/status`);
      toast.success('Retailer status updated');
      fetchUsers();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const renderRow = (user, idx) => (
    <tr key={idx} className="hover:bg-slate-50 border-b border-slate-100 last:border-0 group transition-all">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-black mr-3 border border-slate-200 uppercase">
             {user.name[0]}
          </div>
          <div className="flex flex-col">
             <span className="font-black text-slate-800 text-xs uppercase italic tracking-tighter">{user.name}</span>
             <span className="text-[10px] font-bold text-slate-400 italic">{user.email}</span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest italic border ${user.role === 'COMPANY' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 font-black text-slate-800 text-sm tracking-tight">₹{user.walletBalance}</td>
      <td className="px-6 py-4">
        <span className={`flex items-center text-[10px] font-black uppercase tracking-widest italic ${user.isActive ? 'text-emerald-500' : 'text-slate-300'}`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${user.isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`}></span>
          {user.isActive ? 'Active' : 'Locked'}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
           <button 
             onClick={() => toggleStatus(user._id)}
             className={`p-2 rounded-lg transition-all ${user.isActive ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50' : 'text-emerald-500 hover:bg-emerald-50'}`}
           >
             <FaPowerOff />
           </button>
        </div>
      </td>
    </tr>
  );

  if (loading) return <div className="text-center p-10 font-bold text-slate-500 italic">RESOLVING USER IDENTITIES...</div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">GLOBAL LEDGER</h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1 italic">Identity & Access Control</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <Table 
          headers={['Retailer Identity', 'Account Type', 'Wallet Balance', 'Network Status', 'Emergency Lock']}
          data={users}
          renderRow={renderRow}
        />
        {users.length === 0 && (
          <div className="p-20 text-center text-slate-400 font-black uppercase italic tracking-widest">No retailers found in grid.</div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
