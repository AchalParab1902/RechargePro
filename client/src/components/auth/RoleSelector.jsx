import React from 'react';
import { FaUser, FaUserShield, FaBuilding } from 'react-icons/fa';

const RoleSelector = ({ selectedRole, onSelect }) => {
  const roles = [
    {
      id: 'USER',
      label: 'User',
      description: 'Start your recharge business',
      icon: <FaUser className="text-2xl" />,
      color: 'blue'
    },
    {
      id: 'COMPANY',
      label: 'Company',
      description: 'Manage plans and providers',
      icon: <FaBuilding className="text-2xl" />,
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center mb-6">Select Your Role</h3>
      <div className="grid grid-cols-1 gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onSelect(role.id)}
            className={`p-6 rounded-2xl border-2 transition-all text-left flex items-center space-x-4 group ${
              selectedRole === role.id
                ? `border-${role.color}-500 bg-${role.color}-50/10 ring-4 ring-${role.color}-500/10`
                : 'border-slate-700 bg-slate-800 hover:border-slate-600 hover:bg-slate-700/50'
            }`}
          >
            <div className={`p-4 rounded-xl transition-colors ${
              selectedRole === role.id
                ? `bg-${role.color}-500 text-white`
                : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'
            }`}>
              {role.icon}
            </div>
            <div>
              <p className={`font-black uppercase tracking-tight ${
                selectedRole === role.id ? `text-${role.color}-400` : 'text-slate-200'
              }`}>
                {role.label}
              </p>
              <p className="text-xs font-medium text-slate-400 italic mt-0.5">{role.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
