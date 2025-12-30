import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
      // Update localStorage with latest balance too
      const stored = JSON.parse(localStorage.getItem('userInfo'));
      if (stored) {
        localStorage.setItem('userInfo', JSON.stringify({ ...stored, walletBalance: data.walletBalance }));
      }
    } catch (error) {
      console.error('Failed to fetch user context:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Polling for Company Balance (Requirement 6)
  useEffect(() => {
    let interval;
    if (user && user.role === 'COMPANY') {
      interval = setInterval(() => {
        fetchUser(); // This updates the context state
      }, 5000); // 5 second polling for "instant" feel
    }
    return () => clearInterval(interval);
  }, [user?.role]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    fetchUser(); // Get full profile including balance
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  const updateUserStats = (newBalance, newTotalSpent) => {
    setUser(prev => prev ? { ...prev, walletBalance: newBalance, totalSpent: newTotalSpent } : null);
    // Sync to localStorage
    const stored = JSON.parse(localStorage.getItem('userInfo'));
    if (stored) {
      localStorage.setItem('userInfo', JSON.stringify({ 
        ...stored, 
        walletBalance: newBalance,
        totalSpent: newTotalSpent 
      }));
    }
  };

  const setBalance = (newBalance) => {
    setUser(prev => prev ? { ...prev, walletBalance: newBalance } : null);
    // Sync to localStorage
    const stored = JSON.parse(localStorage.getItem('userInfo'));
    if (stored) {
      localStorage.setItem('userInfo', JSON.stringify({ ...stored, walletBalance: newBalance }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, setBalance, updateUserStats, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
