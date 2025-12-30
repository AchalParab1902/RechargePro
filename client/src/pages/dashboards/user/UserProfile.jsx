import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaFingerprint, FaStore, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import api from '../../../api/axios';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        // In this simple setup, profile is just the logged in user info
        // But we can fetch fresh data from backend
        const { data } = await api.get('/auth/me'); // Assuming we add a /me route or similar
        setUser(data);
        setFormData({ name: data.name, email: data.email });
      } catch (error) {
        // Fallback to localStorage if /me doesn't exist yet
        const local = JSON.parse(localStorage.getItem('userInfo'));
        if (local) {
          setUser(local);
          setFormData({ name: local.name || '', email: local.email || '' });
        } else {
          toast.error('Session expired. Please login again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Assuming we have an update route in auth or a new profile controller
      // For now, let's update localStorage and show success
      // Real production system call
      const { data } = await api.put('/auth/profile', formData);
      toast.success('PROFILE UPDATED! 🚀');
      const updatedInfo = { ...data };
      setUser(updatedInfo);
      localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
      setEditing(false);
    } catch (error) {
       // Mock success if route not implemented yet but logic is sound
       toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="text-center p-20 font-black text-slate-400 uppercase italic tracking-widest animate-pulse">Retrieving Identity...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 overflow-hidden">
      <div>
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic">MY PROFILE</h1>
        <p className="text-slate-500 font-medium italic">Your account details and verification status.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-black shadow-xl mb-6 border-4 border-white uppercase italic">
                   {user?.name?.[0] || '?'}
                </div>
                <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">{user?.name || 'User'}</h3>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">{user?.role || 'Retailer'} PARTNER</p>
                <div className="inline-flex items-center px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
                   <FaShieldAlt className="text-emerald-500 mr-2 text-xs" />
                   <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic">Verified Account</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-8 text-slate-50 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                 <FaFingerprint size={100} />
              </div>
           </div>
        </div>

        <div className="lg:col-span-3">
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-slate-800 uppercase italic tracking-tighter underline decoration-blue-500/30 decoration-4 underline-offset-4">PERSONAL Information</h2>
                <button 
                  onClick={() => setEditing(!editing)}
                  className="text-xs font-black text-blue-600 uppercase tracking-widest italic border-b-2 border-blue-600/20 hover:border-blue-600 transition-colors"
                >
                  {editing ? 'CANCEL' : 'Edit Profile'}
                </button>
              </div>

              {editing ? (
                <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-6">
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">FULL NAME</label>
                      <input 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm tracking-tighter uppercase italic"
                      />
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">EMAIL ADDRESS</label>
                      <input 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm tracking-tighter italic"
                      />
                   </div>
                   <button type="submit" className="py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 transition-all">Save Changes</button>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1">
                     <p className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">
                       <FaUser className="mr-2 text-blue-500" /> Full Name
                     </p>
                     <p className="text-sm font-bold text-slate-700 uppercase italic tracking-tighter">{user?.name || 'N/A'}</p>
                   </div>
                   <div className="space-y-1">
                     <p className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">
                       <FaEnvelope className="mr-2 text-blue-500" /> Email Address
                     </p>
                     <p className="text-sm font-bold text-slate-700 italic tracking-tighter">{user?.email || 'N/A'}</p>
                   </div>
                   <div className="space-y-1">
                     <p className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">
                       <FaStore className="mr-2 text-blue-500" /> Member Level
                     </p>
                     <p className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg inline-block uppercase italic tracking-widest mt-1">PRO RETAILER</p>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
