import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTimes, FaThLarge, FaUsers, FaBuilding, FaSignOutAlt } from 'react-icons/fa';

const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { title: 'Dashboard', path: '/admin-dashboard', icon: <FaThLarge /> },
    { title: 'Retailer Control', path: '/admin-dashboard/users', icon: <FaUsers /> },
    { title: 'Corporate Partners', path: '/admin-dashboard/companies', icon: <FaBuilding /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`w-64 bg-slate-950 min-h-screen text-slate-400 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 border-r border-slate-800 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-900 bg-black/20">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-black text-2xl mr-3 shadow-lg shadow-rose-500/20 italic">
              A
            </div>
            <div className="leading-tight">
              <span className="text-white font-black text-sm tracking-widest uppercase block italic">MASTER</span>
              <span className="text-rose-500 font-bold text-[10px] uppercase tracking-tighter">Admin Panel</span>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-500 hover:text-white transition-colors">
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 py-10 overflow-y-auto custom-scrollbar">
          <nav className="px-3 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose && onClose()}
                end={item.path === '/admin-dashboard'}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                    isActive 
                    ? 'bg-rose-600/10 text-rose-500 shadow-sm border border-rose-500/20 font-bold' 
                    : 'hover:bg-slate-900 hover:text-white border border-transparent'
                  }`
                }
              >
                <span className={`text-xl mr-4 transition-transform duration-300 group-hover:scale-110`}>
                  {item.icon}
                </span>
                <span className="text-xs font-black uppercase tracking-widest">
                  {item.title}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-6 bg-black/20 border-t border-slate-900">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-4 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all group border border-transparent hover:border-rose-500/20"
          >
            <FaSignOutAlt className="text-xl mr-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-black text-xs uppercase tracking-widest">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
