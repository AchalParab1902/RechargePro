import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaCamera, FaKey, FaShieldAlt, FaEnvelope, FaBuilding } from 'react-icons/fa';
import api from '../../../api/axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [formData, setFormData] = useState({ 
    companyName: '', 
    businessEmail: '',
    contactNumber: '',
    address: '',
    description: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/company/profile');
        setProfile(data);
        setFormData({ 
          companyName: data.companyName, 
          businessEmail: data.businessEmail,
          contactNumber: data.contactNumber,
          address: data.address,
          description: data.description || ''
        });
      } catch (error) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const roleFromError = error.response?.data?.debug?.userRole || userInfo.role;
        setUserRole(roleFromError);
        toast.error(error.response?.data?.message || 'Failed to load company profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/company/profile', formData);
      toast.success('COMPANY PROFILE UPDATED! 🏢');
      setProfile(data);
      setEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="text-center p-20 font-black text-slate-400 uppercase italic tracking-widest animate-pulse">Syncing Corporate Identity...</div>;

  if (!profile && !loading) return (
    <div className="text-center p-20">
      <p className="font-black text-rose-500 uppercase italic tracking-widest">Authentication Verified, but Identity Fetch Failed.</p>
      <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl max-w-xs mx-auto">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Diagnosing Connection...</p>
        <p className="text-xs text-slate-600 font-bold italic">
          Account Role: <span className="text-blue-600 uppercase not-italic">{userRole || 'Verifying...'}</span>
        </p>
      </div>
      <p className="text-[10px] text-slate-400 mt-6 font-bold max-w-xs mx-auto leading-relaxed">
        This occurs if your corporate profile hasn't been synchronized yet. Try re-logging or contact support if this persists.
      </p>
      <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 transition-all active:scale-95">
        Retry Handshake
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1 uppercase tracking-tight italic">Corporate Profile</h1>
          <p className="text-sm font-medium text-slate-500 italic">Manage your brand presence and business details.</p>
        </div>
        <button 
          onClick={() => setEditing(!editing)}
          className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-slate-700 transition-all flex items-center hover:scale-105 active:scale-95"
        >
          {editing ? 'Cancel Editing' : <><FaUserEdit className="mr-2" /> Edit Identity</>}
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm relative">
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex items-end">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2rem] bg-white p-1 shadow-2xl relative z-10 overflow-hidden group-hover:scale-105 transition-transform cursor-pointer">
                <div className="w-full h-full bg-slate-900 flex items-center justify-center text-4xl font-black text-white italic tracking-tighter uppercase">
                  {profile?.companyName?.slice(0, 2) || '??'}
                </div>
              </div>
            </div>
            <div className="ml-6 mb-2">
              <h2 className="text-2xl font-black text-slate-800 leading-tight uppercase tracking-tight italic">{profile?.companyName || 'Corporate Partner'}</h2>
              <p className="text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase italic">Entity ID: {profile?._id?.slice(-8).toUpperCase() || 'SYNCHRONIZING'}</p>
            </div>
          </div>

          {editing ? (
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
              <div className="space-y-4">
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Business Name</label>
                   <input 
                    value={formData.companyName}
                    onChange={e => setFormData({...formData, companyName: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm h-12 italic uppercase text-slate-800"
                    placeholder="E.g. Galaxy Networks"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Corporate Email</label>
                   <input 
                    value={formData.businessEmail}
                    onChange={e => setFormData({...formData, businessEmail: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm h-12 italic text-slate-800"
                    placeholder="billing@galaxy.com"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact Support Line</label>
                   <input 
                    value={formData.contactNumber}
                    onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm h-12 italic text-slate-800"
                    placeholder="+91 XXXXX XXXXX"
                   />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Corporate Address</label>
                   <input 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm h-12 italic text-slate-800"
                    placeholder="HQ Building, Main Road"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Brief Description</label>
                   <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-sm h-28 italic text-slate-800 resize-none"
                    placeholder="Tell users about your services..."
                   />
                </div>
                <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 active:scale-95 transition-all">
                  Synchronize Identity
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    <FaEnvelope className="mr-2 text-blue-500" /> Business Communication
                  </label>
                  <p className="text-sm font-bold text-slate-700 italic">{profile?.businessEmail || 'N/A'}</p>
                </div>
                <div>
                  <label className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    <FaBuilding className="mr-2 text-blue-500" /> Head Quarters
                  </label>
                  <p className="text-sm font-bold text-slate-700 uppercase italic">{profile?.address || 'N/A'}</p>
                </div>
                <div>
                  <label className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    <FaShieldAlt className="mr-2 text-blue-500" /> Support Desk
                  </label>
                  <p className="text-sm font-bold text-slate-700 uppercase italic">{profile?.contactNumber || 'N/A'}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">System Verification</label>
                  <span className="inline-flex items-center px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-black text-emerald-600 uppercase tracking-widest italic">
                    <FaShieldAlt className="mr-2" /> Verified Provider
                  </span>
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">About Company</label>
                   <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
                      {profile?.description || 'Enterprise provider for digital recharge services and infrastructure.'}
                   </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
