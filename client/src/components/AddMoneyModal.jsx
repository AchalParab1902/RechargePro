import React, { useState } from 'react';
import { FaTimes, FaRupeeSign, FaBolt } from 'react-icons/fa';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AddMoneyModal = ({ isOpen, onClose, onRefresh, planId = null, mobileNumber = null, amount: initialAmount = '', directRecharge = false }) => {
  const { updateUserStats, setBalance, user } = useAuth(); // Added user to get details for prefill
  const [amount, setAmount] = useState(initialAmount);
  const [loading, setLoading] = useState(false);

  // Auto-trigger for Direct Recharge if amount is pre-filled
  React.useEffect(() => {
    if (isOpen && directRecharge && initialAmount) {
        setAmount(initialAmount);
        // We use a small delay to ensure modal is rendered or just call handleSubmit
        const timer = setTimeout(() => {
            handlePaymentFlow(initialAmount);
        }, 100);
        return () => clearTimeout(timer);
    }
  }, [isOpen, directRecharge, initialAmount]);

  if (!isOpen) return null;

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return toast.error('Please enter a valid amount');
    handlePaymentFlow(amount);
  };

  const handlePaymentFlow = async (payAmount) => {
    setLoading(true);
    try {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
          toast.error('Razorpay SDK failed to load. Are you online?');
          setLoading(false);
          return;
        }

        // Create Order
        const createEndpoint = directRecharge ? '/recharge/create-order' : '/payment/create-order';
        const { data: orderData } = await api.post(createEndpoint, { 
            amount: Number(payAmount),
            planId,
            mobileNumber
        });
        
        if (!orderData.success) {
            toast.error('Server error. Are you online?');
            setLoading(false);
            return;
        }

        const { order, key_id } = orderData;

        const options = {
            key: key_id, 
            amount: order.amount,
            currency: order.currency,
            name: "Instant Recharge",
            description: directRecharge ? `Recharge for ${mobileNumber}` : "Add Money to Wallet",
            order_id: order.id,
            image: "https://cdn.razorpay.com/logos/GhRQcyean79PqE_medium.png", // Optional: Add a logo if available or remove
            handler: async function (response) {
                setLoading(true); // Keep loading state
                try {
                    const verifyData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    };

                    const verifyEndpoint = directRecharge ? '/recharge/verify-payment' : '/payment/verify';
                    const { data: verifyRes } = await api.post(verifyEndpoint, verifyData);

                    if (verifyRes.success) {
                        if (directRecharge) {
                            toast.success(`₹${payAmount} DEBITED FOR RECHARGE! 🚀`);
                        } else {
                            toast.success('PAYMENT SUCCESSFUL! 💰');
                        }
                        
                        if (verifyRes.newBalance !== undefined) {
                            if (verifyRes.totalSpent !== undefined) {
                                updateUserStats(verifyRes.newBalance, verifyRes.totalSpent);
                            } else {
                                setBalance(verifyRes.newBalance);
                            }
                        }
                        if (onRefresh) onRefresh();
                        setAmount('');
                        onClose();
                    } else {
                        toast.error(verifyRes.message || 'Payment Verification Failed');
                    }
                } catch (error) {
                    console.error("Verification Error", error);
                    toast.error('Payment verification failed on server');
                } finally {
                    setLoading(false);
                }
            },
            prefill: {
                name: user?.name || "User",
                email: user?.email || "user@example.com",
                contact: user?.mobileNumber || "9999999999"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#2563EB"
            },
            modal: {
                ondismiss: function() {
                    setLoading(false);
                    toast('Payment Cancelled', { icon: '⚠️' });
                }
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    } catch (error) {
      console.error("Payment Error", error);
      toast.error(error.response?.data?.message || 'Transaction failed');
      setLoading(false);
    }
    // Note: setLoading(false) is handled in ondismiss or handler
  };

  const quickAmounts = [100, 500, 1000, 2000];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-500/20 border border-slate-100 animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">
                {directRecharge ? 'DIRECT RECHARGE' : 'ADD MONEY'}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                {directRecharge ? 'Instant Gateway Settlement' : 'Fast Wallet Recharges'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-bold group-focus-within:text-blue-600 transition-colors">
              <FaRupeeSign />
            </div>
            <input 
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-14 pr-6 py-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-black text-3xl tracking-tighter italic text-slate-800 placeholder:text-slate-200"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
             {quickAmounts.map(val => (
               <button
                 key={val}
                 type="button"
                 onClick={() => setAmount(val.toString())}
                 className="py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all uppercase tracking-tighter italic"
               >
                 {val}
               </button>
             ))}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center italic disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (
              <>
                {directRecharge ? 'Confirm Recharge' : 'Confirm Deposit'} <FaBolt className="ml-3 text-amber-400" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest italic opacity-50">
          Secure encrypted gateway connection via Razorpay
        </p>
      </div>
    </div>
  );
};

export default AddMoneyModal;
