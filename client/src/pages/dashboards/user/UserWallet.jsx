import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios';
import StatCard from '../../../components/StatCard';
import Table from '../../../components/Table';
import { FaWallet, FaExchangeAlt, FaHistory, FaPlusCircle, FaShieldAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import AddMoneyModal from '../../../components/AddMoneyModal';

const UserWallet = () => {
  const { user, setBalance } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      // Sync balance from wallet endpoint
      const { data: walletData } = await api.get('/wallet');
      if (walletData?.balance !== undefined) {
        setBalance(walletData.balance);
      }

      // Fetch transactions
      const { data: txData } = await api.get('/wallet/transactions');
      setTransactions(txData);
    } catch (error) {
      console.error('Wallet sync failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderRow = (item, idx) => (
    <tr key={idx} className="hover:bg-slate-50 transition-all border-b border-slate-100 last:border-0 group/row">
      <td className="px-6 py-4 font-mono text-[10px] font-black text-slate-400 group-hover/row:text-blue-600 transition-colors uppercase italic">#{item._id?.slice(-8).toUpperCase()}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-xl mr-3 ${item.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'} transition-transform group-hover/row:scale-110`}>
            {item.type === 'CREDIT' ? <FaArrowDown className="rotate-180" /> : <FaArrowUp />}
          </div>
          <span className="font-black text-slate-800 text-[10px] uppercase tracking-tighter italic">{item.type}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-slate-600 font-bold text-xs uppercase tracking-tight italic">{item.reason}</td>
      <td className={`px-6 py-4 font-black text-sm italic tracking-tighter tabular-nums ${item.type === 'CREDIT' ? 'text-emerald-600' : 'text-slate-800'}`}>
        {item.type === 'CREDIT' ? '+' : '-'} ₹{item.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest italic bg-emerald-50 text-emerald-600 border border-emerald-100">
           SUCCESS
        </span>
      </td>
      <td className="px-6 py-4 text-[10px] font-bold text-slate-400 italic font-mono">
        {new Date(item.createdAt).toLocaleString()}
      </td>
    </tr>
  );

  if (loading) return <div className="p-24 text-center font-black animate-pulse text-slate-400 uppercase tracking-widest italic">Decrypting Ledger Protocol...</div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">FINANCIAL <span className="text-blue-600">LEDGER</span></h1>
          <p className="text-slate-500 font-bold italic mt-1 tracking-tight">Decentralized transaction history and liquidity management.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-950/20 hover:bg-blue-600 transition-all active:scale-95 italic group border border-white/5"
        >
          <FaPlusCircle className="mr-3 group-hover:rotate-90 transition-transform duration-500" /> s
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard 
          title="Active Liquidity" 
          value={`₹${user?.walletBalance?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '0.00'}`} 
          icon={<FaWallet />} 
          colorClass="blue"
          trend="Real-time"
          trendUp={true}
        />
        <StatCard 
          title="Total Outflow" 
          value={`₹${transactions?.filter(t => t.type === 'DEBIT').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} 
          icon={<FaExchangeAlt />} 
          colorClass="rose"
          trend="Month-to-date"
          trendUp={false}
        />
        <StatCard 
          title="Last Sync" 
          value={transactions?.[0] ? new Date(transactions[0].createdAt).toLocaleDateString() : 'N/A'} 
          icon={<FaHistory />} 
          colorClass="emerald"
          trend="Status: OK"
          trendUp={true}
        />
      </div>

      <div className="space-y-8 overflow-hidden">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter flex items-center">
            <FaHistory className="mr-3 text-blue-500" /> Transaction Protocol
          </h2>
          <div className="hidden md:flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gateway Connected</span>
          </div>
        </div>
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden transition-all hover:shadow-2xl">
          <Table 
            headers={['Reference ID', 'Type', 'Source/Dest', 'Value', 'Status', 'Timestamp']}
            data={transactions}
            renderRow={renderRow}
          />
          {transactions.length === 0 && (
            <div className="p-24 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                <FaExchangeAlt size={32} />
              </div>
              <p className="text-slate-400 font-extrabold uppercase italic tracking-[0.2em] text-xs">No ledger entries detected.</p>
            </div>
          )}
        </div>
      </div>

      <AddMoneyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchData} 
      />
    </div>
  );
};

export default UserWallet;
