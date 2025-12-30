import React from 'react';
import { FaLayerGroup, FaUsers, FaChartLine, FaWallet } from 'react-icons/fa';
import StatCard from '../../../components/StatCard';

const DashboardStats = ({ stats, walletBalance }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      <StatCard 
        title="Grid Assets" 
        value={stats?.totalPlans || 0} 
        icon={<FaLayerGroup />} 
        colorClass="blue" 
        trend="Total Plans"
        trendUp={true}
      />
      <StatCard 
        title="Network Nodes" 
        value={stats?.totalRetailers || 0} 
        icon={<FaUsers />} 
        colorClass="indigo" 
        trend="Retailers"
        trendUp={true}
      />
      <StatCard 
        title="Grid Volume" 
        value={`₹${stats?.totalVolume?.toLocaleString('en-IN') || 0}`} 
        icon={<FaChartLine />} 
        colorClass="rose" 
        trend="Successful"
        trendUp={true}
      />
      <StatCard 
        title="Entity Liquidity" 
        value={`₹${walletBalance?.toLocaleString('en-IN') || 0}`} 
        icon={<FaWallet />} 
        colorClass="emerald" 
        trend="Settled"
        trendUp={true}
      />
    </div>
  );
};

export default DashboardStats;
