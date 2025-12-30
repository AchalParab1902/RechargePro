import React from 'react';
import Table from '../../../components/Table';
import { FaUserPlus, FaEllipsisV } from 'react-icons/fa';
import { USERS_LIST } from '../../../utils/constants';

const Users = () => {
  const renderRow = (user, idx) => (
    <tr key={idx} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 group">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-slate-800 leading-tight">{user.name}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-slate-600">{user.joined}</td>
      <td className="px-6 py-4 text-sm font-bold text-slate-800">{user.totalSpent}</td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-tighter">Active</span>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-slate-400 hover:text-slate-600 p-2">
          <FaEllipsisV />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">USERS & RETAILERS</h1>
          <p className="text-slate-500 font-medium italic">Manage your sub-network members.</p>
        </div>
        <button className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all hover:scale-105">
          <FaUserPlus className="mr-2" /> Add Partner
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm">
        <Table 
          headers={['Partner Name', 'Joined Date', 'Total Volume', 'Status', 'Actions']}
          data={USERS_LIST}
          renderRow={renderRow}
        />
      </div>
    </div>
  );
};

export default Users;
