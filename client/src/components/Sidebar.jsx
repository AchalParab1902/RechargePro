import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTimes, FaThLarge, FaMobileAlt, FaExchangeAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { title: 'Overview', path: '/company-dashboard', icon: <FaThLarge /> },
    { title: 'My Plans', path: '/company-dashboard/recharge-plans', icon: <FaMobileAlt /> },
    { title: 'History', path: '/company-dashboard/history', icon: <FaExchangeAlt /> },
    { title: 'Profile', path: '/company-dashboard/profile', icon: <FaUser /> },
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
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`w-64 bg-slate-900 min-h-screen text-slate-300 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3 shadow-lg shadow-blue-500/20">
              R
            </div>
            <span className="text-white font-black text-xs tracking-[0.2em] uppercase italic opacity-90">Partner Hub</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 py-10 overflow-y-auto custom-scrollbar">
          <nav className="px-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose && onClose()}
                end={item.path === '/company-dashboard'}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                    isActive 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 font-bold italic' 
                    : 'hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700'
                  }`
                }
              >
                <span className="text-xl mr-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="text-xs font-black uppercase tracking-wider">
                  {item.title}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-4 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all group border border-transparent hover:border-rose-500/20"
          >
            <FaSignOutAlt className="text-xl mr-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
