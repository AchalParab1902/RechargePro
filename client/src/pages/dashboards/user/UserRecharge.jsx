import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaMobileAlt, FaArrowRight, FaTag } from 'react-icons/fa';
import api from '../../../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import AddMoneyModal from '../../../components/AddMoneyModal';

const UserRecharge = () => {
  const { user, setBalance } = useAuth();
  const location = useLocation();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(location.state?.selectedPlan || null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('All');
  const [fetching, setFetching] = useState(true);
  const [mobileError, setMobileError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const plansRes = await api.get('/user/recharge-plans');
      setPlans(plansRes.data);
    } catch (error) {
      toast.error('Failed to sync gateway');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validateMobile = (num) => {
    if (!num) return 'Mobile number is required';
    if (num.startsWith('00')) return 'invalid number';
    if (!/^\d{10}$/.test(num)) return 'Enter exactly 10 digits';
    return '';
  };

  const handleRecharge = (e) => {
    e.preventDefault();
    const error = validateMobile(mobileNumber);
    if (error) {
      setMobileError(error);
      return toast.error(error);
    }
    if (!selectedPlan) return toast.error('Please select a plan first');
    
    toast('Connecting to secure gateway...', { icon: '💳' });
    setIsModalOpen(true);
  };

  const operators = ['All', ...new Set(plans.map(p => p.operator))];
  const filteredPlans = selectedOperator === 'All' 
    ? plans 
    : plans.filter(p => p.operator === selectedOperator);

  if (fetching) return <div className="text-center p-10 font-bold text-slate-500 italic">SYNCING WITH GATEWAY...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 uppercase tracking-tighter italic">
          INSTANT <span className="text-blue-600">RECHARGE</span>
        </h1>
        <p className="text-slate-500 font-bold italic mt-2 tracking-tight">Direct gateway connection for immediate balance fulfillment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Form Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group/form">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover/form:scale-110 transition-transform duration-1000"></div>
            
            <form onSubmit={handleRecharge} className="space-y-8 relative z-10">
              <div className="space-y-4">
                <label className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 italic">
                  <FaMobileAlt className="mr-2 text-blue-500" /> Destination Number
                </label>
                <div className="relative group/input">
                  <input 
                    type="text" 
                    maxLength="10"
                    value={mobileNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setMobileNumber(val);
                      if (mobileError) setMobileError('');
                    }}
                    className={`w-full px-8 py-5 bg-slate-50 border-2 ${mobileError ? 'border-rose-500' : 'border-slate-100'} rounded-3xl outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-black text-2xl tracking-[0.1em] placeholder:text-slate-200`}
                    placeholder="000 000 0000"
                    required
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
                     <span className={`text-[10px] font-black uppercase tracking-widest italic transition-colors ${mobileError ? 'text-rose-500' : 'text-slate-300'}`}>
                        {mobileError || '10 Digits Required'}
                     </span>
                  </div>
                </div>
                {mobileError && <p className="text-[10px] text-rose-500 font-black uppercase mt-1 px-2 italic md:hidden">{mobileError}</p>}
              </div>

              <div className="space-y-6">
                <label className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 italic">
                  <FaTag className="mr-2 text-blue-500" /> Selection Matrix
                </label>

                {/* Operator Filter */}
                <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar no-scrollbar">
                  {operators.map(op => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => {
                        setSelectedOperator(op);
                        if (selectedPlan && selectedPlan.operator !== op && op !== 'All') {
                          setSelectedPlan(null);
                        }
                      }}
                      className={`px-6 py-3 rounded-2xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedOperator === op ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                      {op}
                    </button>
                  ))}
                </div>

                {/* Selected Plan Section (Shows at the TOP) */}
                {selectedPlan && (
                  <div className="animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-500/30 relative overflow-hidden group/active border-4 border-white/20">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                      
                      <div className="flex justify-between items-start relative z-10">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-100 italic mb-2">Selected Priority Plan</p>
                          <h3 className="text-3xl font-black italic tracking-tighter uppercase">{selectedPlan.title}</h3>
                          <p className="text-xs font-bold text-blue-200 italic mt-1">{selectedPlan.operator} • {selectedPlan.validity}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20">
                          <p className="text-3xl font-black italic tabular-nums tracking-tighter">₹{selectedPlan.amount}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest text-center mt-1 text-blue-100">Confirmed</p>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                        <p className="text-[9px] font-black uppercase tracking-widest text-blue-100 italic mb-3">Plan Benefits & Intelligence</p>
                        <p className="text-sm font-bold text-white italic leading-relaxed">
                          {selectedPlan.description || "Unlimited Voice Calls + High Speed Data + System Security Protocol Active."}
                        </p>
                      </div>

                      <button 
                        type="button"
                        onClick={() => setSelectedPlan(null)}
                        className="mt-6 text-[10px] font-black uppercase tracking-widest text-blue-200 hover:text-white transition-colors flex items-center italic"
                      >
                         Change Selection <FaArrowRight className="ml-2 w-2 h-2" />
                      </button>
                    </div>

                    {/* Payment Information */}
                    <div className="mt-6 bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-100 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic">Secured Protocol</p>
                        <p className="text-sm font-black text-slate-800 italic">Settlement via Razorpay Gateway</p>
                    </div>
                  </div>
                )}

                {/* Main Plans List (Excludes Selected) */}
                <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar p-2">
                  {selectedPlan && (
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic mb-2">Available Alternatives</p>
                  )}
                  {filteredPlans.filter(p => p._id !== selectedPlan?._id).map((plan) => (
                    <button
                      key={plan._id}
                      type="button"
                      onClick={() => setSelectedPlan(plan)}
                      className="p-6 rounded-[2rem] border-2 border-slate-50 bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-lg transition-all duration-300 text-left flex justify-between items-center group/card"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white text-slate-400 border border-slate-100 transition-colors group-hover/card:bg-blue-600 group-hover/card:text-white group-hover/card:border-blue-600">
                           <FaTag />
                        </div>
                        <div>
                           <p className="font-black uppercase tracking-tight italic text-slate-800">{plan.title}</p>
                           <p className="text-[10px] font-bold text-slate-400 italic mt-0.5">{plan.operator} • {plan.validity}</p>
                        </div>
                      </div>
                      <div className="text-right border-l pl-6 border-slate-200">
                         <p className="text-xl font-black text-slate-900 tracking-tighter italic">₹{plan.amount}</p>
                         <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest opacity-60">Value Unit</p>
                      </div>
                    </button>
                  ))}
                  
                  {plans.length === 0 && (
                    <div className="p-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                       <p className="text-slate-400 font-black uppercase text-xs italic opacity-30 tracking-[0.2em]">No Active Plans in Gateway</p>
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading || !mobileNumber || !selectedPlan}
                className={`w-full group py-6 rounded-[2rem] font-black text-lg shadow-2xl transition-all flex items-center justify-center italic tracking-widest uppercase border border-white/5 
                  ${loading || !mobileNumber || !selectedPlan ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50' : 
                    user?.walletBalance < (selectedPlan?.amount || 0) ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20' : 'bg-slate-900 text-white hover:bg-blue-600 shadow-slate-950/20 hover:scale-[1.02] active:scale-95'}`}
              >
                {loading ? (
                   <span className="flex items-center gap-3 animate-pulse">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                      Initiating Gateway...
                   </span>
                ) : user?.walletBalance < (selectedPlan?.amount || 0) ? (
                  <>
                    Insufficient Balance • Add ₹{(selectedPlan.amount - user.walletBalance).toFixed(2)}
                  </>
                ) : (
                  <>
                    Launch Recharge <FaArrowRight className="ml-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-8">
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
              <h3 className="font-black mb-6 uppercase tracking-[0.2em] text-[10px] flex items-center italic text-blue-400">
                <span className="w-2 h-px bg-blue-500 mr-2"></span> Liquidity Status
              </h3>
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-70">Secured Balance</p>
                 <p className="text-4xl font-black tracking-tighter mt-1 italic tabular-nums">₹{user?.walletBalance?.toLocaleString('en-IN') || 0}</p>
                 <div className="mt-4 flex items-center text-[9px] font-black text-emerald-400 uppercase tracking-widest italic">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                    Verified Funds
                 </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-6 italic leading-relaxed font-bold">The encrypted balance is automatically synchronized with the operator grid after every transaction.</p>
           </div>

           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm transition-all hover:shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 italic">Protocol Safety</h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                       <FaTag />
                    </div>
                    <p className="text-xs font-bold text-slate-600 italic">256-bit AES Encryption</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
                       <FaMobileAlt />
                    </div>
                    <p className="text-xs font-bold text-slate-600 italic">SSL Secure Multi-Channel Gateway</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
      <AddMoneyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={() => {
            fetchData();
            // We can also clear form if we want, but keeping it for context
        }}
        amount={selectedPlan?.amount}
        planId={selectedPlan?._id}
        mobileNumber={mobileNumber}
        directRecharge={true}
      />
    </div>
  );
};

export default UserRecharge;
