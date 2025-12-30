import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import UserLayout from './pages/dashboards/user/UserLayout';
import UserDashboard from './pages/dashboards/user/UserDashboard';
import UserRecharge from './pages/dashboards/user/UserRecharge';
import UserWallet from './pages/dashboards/user/UserWallet';
import UserTransactions from './pages/dashboards/user/UserTransactions';
import UserPlans from './pages/dashboards/user/UserPlans';
import UserEarnings from './pages/dashboards/user/UserEarnings';
import UserSupport from './pages/dashboards/user/UserSupport';
import UserProfile from './pages/dashboards/user/UserProfile';
import UserSettings from './pages/dashboards/user/UserSettings';
import AdminLayout from './pages/dashboards/admin/AdminLayout';
import AdminDashboard from './pages/dashboards/admin/AdminDashboard';
import UsersManagement from './pages/dashboards/admin/UsersManagement';
import CompaniesManagement from './pages/dashboards/admin/CompaniesManagement';
import AdminWallet from './pages/dashboards/admin/AdminWallet';
import RechargesMonitoring from './pages/dashboards/admin/RechargesMonitoring';
import CommissionManagement from './pages/dashboards/admin/CommissionManagement';
import OperatorsManagement from './pages/dashboards/admin/OperatorsManagement';
import AdminReports from './pages/dashboards/admin/AdminReports';
import AdminComplaints from './pages/dashboards/admin/AdminComplaints';
import NotificationsPage from './pages/dashboards/admin/NotificationsPage';
import AdminSettings from './pages/dashboards/admin/AdminSettings';
import CompanyLayout from './pages/dashboards/company/CompanyLayout';
import CompanyDashboard from './pages/dashboards/company/CompanyDashboard';
import Recharge from './pages/dashboards/company/Recharge';
import Wallet from './pages/dashboards/company/Wallet';
import Transactions from './pages/dashboards/company/Transactions';
import Users from './pages/dashboards/company/Users';
import Reports from './pages/dashboards/company/Reports';
import Support from './pages/dashboards/company/Support';
import Profile from './pages/dashboards/company/Profile';
import CompanyPlans from './pages/dashboards/company/CompanyPlans';
import RechargeHistory from './pages/dashboards/company/RechargeHistory';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Dashboard (Nested Routes) */}
        <Route path="/user-dashboard" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="recharge" element={<UserRecharge />} />
          <Route path="plans" element={<UserPlans />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Admin Dashboard (Nested Routes) */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="companies" element={<CompaniesManagement />} />
        </Route>

        {/* Company Dashboard (Nested Routes) */}
        <Route path="/company-dashboard" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="recharge-plans" element={<CompanyPlans />} />
          <Route path="history" element={<RechargeHistory />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* 404 Redirect to Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
