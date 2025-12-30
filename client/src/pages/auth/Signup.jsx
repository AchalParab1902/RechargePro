import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';
import RoleSelector from '../../components/auth/RoleSelector';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('USER');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    businessEmail: '',
    contactNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (role === 'USER' && !formData.name) newErrors.name = 'Full name is required';
    if (role === 'COMPANY') {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.contactNumber) {
        newErrors.contactNumber = 'Contact number is required';
      } else if (!/^\d{10}$/.test(formData.contactNumber)) {
        newErrors.contactNumber = 'Enter exactly 10 digits';
      } else if (formData.contactNumber.startsWith('00')) {
        newErrors.contactNumber = 'Cannot start with 00';
      }
    }

    const email = role === 'COMPANY' ? formData.businessEmail : formData.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors[role === 'COMPANY' ? 'businessEmail' : 'email'] = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors[role === 'COMPANY' ? 'businessEmail' : 'email'] = 'Invalid email format (e.g., abc@example.com)';
    }

    // Password Complexity: Min 8 chars, 1 upper, 1 lower, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Must be 8+ chars with 1 upper, 1 lower, and 1 number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkPasswordStrength = (pass) => {
    return {
      length: pass.length >= 8,
      upper: /[A-Z]/.test(pass),
      lower: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Prepare payload based on requirements
      const payload = {
        role,
        password: formData.password,
        // Common & specific mapping
        name: role === 'COMPANY' ? formData.companyName : formData.name,
        email: role === 'COMPANY' ? formData.businessEmail : formData.email,
        contactNumber: formData.contactNumber, // only for company
      };

      const { data } = await api.post('/auth/register', payload);
      
      toast.success('REGISTRATION SUCCESSFUL! 🚀');
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('userRole', data.role);
      
      setTimeout(() => navigate('/login'), 1500);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  const isPasswordMatch = formData.password && formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-blue-500/30">
      <div className="max-w-xl w-full">
        {/* Progress Bar */}
        <div className="flex justify-center mb-8 space-x-2">
          <div className={`h-1 w-12 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-800'}`}></div>
          <div className={`h-1 w-12 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-800'}`}></div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-800/50 backdrop-blur-xl">
          <div className="p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Create Identity</h2>
              <p className="text-slate-500 font-medium italic mt-2">Initialize your profile on the recharge grid.</p>
            </div>

            {step === 1 ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <RoleSelector selectedRole={role} onSelect={setRole} />
                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-8 group py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center italic tracking-tight"
                >
                  Continue to Form <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center text-xs font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors mb-4 group"
                >
                  <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Role
                </button>

                <div className="grid grid-cols-1 gap-6">
                  {/* Dynamic Fields */}
                  {role === 'COMPANY' ? (
                    <>
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Company Name</label>
                        <input
                          name="companyName"
                          type="text"
                          className={`w-full px-6 py-4 bg-slate-800 border ${errors.companyName ? 'border-rose-500' : 'border-slate-700'} rounded-2xl text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold tracking-tight italic placeholder:text-slate-600`}
                          placeholder="EX: TECHNO RECHARGE PVT LTD"
                          value={formData.companyName}
                          onChange={handleChange}
                        />
                        {errors.companyName && <p className="text-[10px] text-rose-500 font-black uppercase mt-1 px-1">{errors.companyName}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Business Email</label>
                        <input
                          name="businessEmail"
                          type="email"
                          className={`w-full px-6 py-4 bg-slate-800 border ${errors.businessEmail ? 'border-rose-500' : 'border-slate-700'} rounded-2xl text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold tracking-tight italic placeholder:text-slate-600`}
                          placeholder="ADMIN@COMPANY.COM"
                          autoComplete="email"
                          value={formData.businessEmail}
                          onChange={handleChange}
                        />
                        {errors.businessEmail && <p className="text-[10px] text-rose-500 font-black uppercase mt-1 px-1">{errors.businessEmail}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Contact Number</label>
                        <input
                          name="contactNumber"
                          type="text"
                          maxLength="10"
                          className={`w-full px-6 py-4 bg-slate-800 border ${errors.contactNumber ? 'border-rose-500' : 'border-slate-700'} rounded-2xl text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold tracking-tight italic placeholder:text-slate-600`}
                          placeholder="9876543210"
                          value={formData.contactNumber}
                          onChange={handleChange}
                        />
                        {errors.contactNumber && <p className="text-[10px] text-rose-500 font-black uppercase mt-1 px-1">{errors.contactNumber}</p>}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Full Name</label>
                        <input
                          name="name"
                          type="text"
                          className={`w-full px-6 py-4 bg-slate-800 border ${errors.name ? 'border-rose-500' : 'border-slate-700'} rounded-2xl text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold tracking-tight italic placeholder:text-slate-600`}
                          placeholder="EX: JOHN USER"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && <p className="text-[10px] text-rose-500 font-black uppercase mt-1 px-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>
                        <input
                          name="email"
                          type="email"
                          className={`w-full px-6 py-4 bg-slate-800 border ${errors.email ? 'border-rose-500' : 'border-slate-700'} rounded-2xl text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold tracking-tight italic placeholder:text-slate-600`}
                          placeholder="NODEMANAGER@SYSTEM.GRID"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && <p className="text-[10px] text-rose-500 font-black uppercase mt-1 px-1">{errors.email}</p>}
                      </div>
                    </>
                  )}

                  {/* Password Fields */}
                  <div className="relative">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Password</label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        className={`w-full px-6 py-4 bg-slate-800 border ${errors.password ? 'border-rose-500' : 'border-slate-700'} rounded-2xl text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold tracking-tight italic placeholder:text-slate-600`}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && <p className="text-[10px] text-rose-500 font-black uppercase mt-1 px-1">{errors.password}</p>}
                    
                    {/* Real-time Validation Indicators */}
                    <div className="mt-3 grid grid-cols-2 gap-2 px-1">
                      {Object.entries(checkPasswordStrength(formData.password)).map(([key, valid]) => (
                        <div key={key} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${valid ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`}></div>
                          <span className={`text-[8px] font-black uppercase tracking-widest italic ${valid ? 'text-emerald-500' : 'text-slate-500'}`}>
                            {key === 'length' ? '8+ Chars' : key === 'upper' ? 'Uppercase' : key === 'lower' ? 'Lowercase' : 'Number'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Confirm Password</label>
                    <div className="relative">
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`w-full px-6 py-4 bg-slate-800 border ${errors.confirmPassword ? 'border-rose-500' : isPasswordMatch ? 'border-emerald-500/50' : 'border-slate-700'} rounded-2xl text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold tracking-tight italic placeholder:text-slate-600`}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      {isPasswordMatch && <FaCheck className="absolute right-14 top-1/2 -translate-y-1/2 text-emerald-500" />}
                    </div>
                    {errors.confirmPassword && <p className="text-[10px] text-rose-500 font-black uppercase mt-1 px-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl transform active:scale-95 transition-all outline-none focus:ring-4 focus:ring-blue-500/20 italic tracking-tight uppercase ${loading ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                >
                  {loading ? 'Processing Data...' : 'Create Account'}
                </button>
              </form>
            )}

            <div className="mt-10 text-center animate-in fade-in duration-700 delay-300">
              <p className="text-slate-500 font-medium italic">
                Already registered?{' '}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-black uppercase tracking-tighter transition-colors">
                  Login 
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
