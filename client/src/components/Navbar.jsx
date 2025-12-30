import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaWallet, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ onMenuClick, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getBalanceLabel = () => {
    switch (user?.role) {
      case 'ADMIN': return 'System Liquidity';
      case 'COMPANY': return 'Corporate Revenue';
      default: return 'Personal Wallet';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const role = user.role.toUpperCase();

  return (
    <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 md:px-10 sticky top-0 z-40 shadow-sm transition-all duration-500">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-colors"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <div className="flex items-center cursor-default">
          <div className="text-xl font-black text-slate-800 tracking-tighter uppercase italic group select-none">
            RECHARGE<span className="text-blue-600 transition-colors group-hover:text-slate-900">PRO</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-6">
        {/* Balance Display - Simplified for Mobile */}
        <div className="flex items-center gap-3 px-3 md:px-6 py-2 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-slate-100/50">
          <div className="flex flex-col text-right">
            <span className="hidden md:block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              {getBalanceLabel()}
            </span>
            <span className="text-sm md:text-lg font-black text-slate-800 italic tracking-tighter tabular-nums leading-none">
              ₹{user.walletBalance?.toLocaleString('en-IN', { minimumFractionDigits: user.walletBalance > 0 ? 2 : 0 })}
            </span>
          </div>
          
          <div className="hidden sm:block h-8 w-px bg-slate-200"></div>

          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex flex-col text-right">
              <span className="text-xs font-black text-slate-800 uppercase italic leading-none mb-1 truncate max-w-[80px]">
                {user.name?.split(' ')[0]}
              </span>
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter flex items-center justify-end">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5 animate-pulse"></span>
                {role}
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs font-black italic border-2 border-white shadow-lg shadow-slate-200 ring-2 ring-slate-50">
              {user.name?.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all h-11 w-11 flex items-center justify-center border border-transparent hover:border-rose-100"
          title="Secure Logout"
        >
          <FaSignOutAlt size={16} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
