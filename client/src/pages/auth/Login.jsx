import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaArrowRight, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    
    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
      });

      login(data);
      toast.success('ACCESS GRANTED! 🔒');

      const role = data.role.toUpperCase();
      setTimeout(() => {
        if (role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else if (role === 'COMPANY') {
          navigate('/company-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 selection:bg-blue-500/30 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[120px] -ml-48 -mb-48 animate-pulse delay-700"></div>

      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-1000">
        <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/5 group">
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30 rotate-3 group-hover:rotate-0 transition-all duration-700">
                <FaLock className="text-white text-3xl" />
              </div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
                GRID <span className="text-blue-500">ACCESS</span>
              </h2>
              <p className="text-slate-500 font-bold italic mt-3 tracking-wide">Enter credentials to establish secure connection.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 italic">Email Id</label>
                <input
                  type="email"
                  required
                  className={`w-full px-8 py-5 bg-slate-800/50 border-2 ${emailError ? 'border-rose-500' : 'border-slate-700/50'} rounded-2xl text-white outline-none focus:border-blue-500/50 focus:ring-8 focus:ring-blue-500/5 transition-all font-black tracking-tight italic placeholder:text-slate-600 text-lg`}
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                />
                {emailError && <p className="text-[10px] text-rose-500 font-black uppercase mt-1 px-2 italic">{emailError}</p>}
              </div>

              <div className="space-y-3 relative">
                <div className="flex justify-between items-center px-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Password</label>
                  <button type="button" className="text-[10px] font-black text-blue-500/50 hover:text-blue-500 uppercase tracking-widest italic transition-colors">Forgot Pass?</button>
                </div>
                <div className="relative group/pass">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full px-8 py-5 bg-slate-800/50 border-2 border-slate-700/50 rounded-2xl text-white outline-none focus:border-blue-500/50 focus:ring-8 focus:ring-blue-500/5 transition-all font-black tracking-tight italic placeholder:text-slate-600 text-lg"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-all p-2 rounded-lg hover:bg-white/5"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email || !password || !!emailError}
                className={`w-full group py-6 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/30 hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all duration-500 flex items-center justify-center italic tracking-widest uppercase border border-white/10 ${loading || !email || !password || !!emailError ? 'opacity-50 grayscale pointer-events-none' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center gap-3 animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                    Authenticating Node
                  </span>
                ) : (
                  <>
                    Sign In <FaArrowRight className="ml-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-slate-500 font-bold italic text-sm">
                New on the grid?{' '}
                <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-black uppercase tracking-tighter transition-all border-b-2 border-blue-500/20 hover:border-blue-500 pb-0.5 ml-1">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="mt-12 text-center space-y-4">
           <div className="flex items-center justify-center gap-6 opacity-30">
              <div className="h-px w-10 bg-slate-700"></div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">Encryption Active</p>
              <div className="h-px w-10 bg-slate-700"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
