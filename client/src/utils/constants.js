export const DUMMY_STATS = {
  walletBalance: "25,450.00",
  todayRecharges: "128",
  totalUsers: "1,240",
  totalCommission: "3,840.50"
};

export const ADMIN_STATS = {
  totalUsers: "14,582",
  totalCompanies: "42",
  todayRecharges: "1,840",
  totalRevenue: "12,45,800",
  pendingRecharges: "14"
};

export const RECENT_TRANSACTIONS = [
  { id: 'TXN1024', user: 'Rahul Sharma', mobile: '9876543210', operator: 'Jio', amount: '299', status: 'Success', date: '2023-11-20 10:30' },
  { id: 'TXN1025', user: 'Anil Kumar', mobile: '8877665544', operator: 'Airtel', amount: '499', status: 'Pending', date: '2023-11-20 11:15' },
  { id: 'TXN1026', user: 'Sunita Devi', mobile: '7766554433', operator: 'Vi', amount: '199', status: 'Success', date: '2023-11-20 12:05' },
  { id: 'TXN1027', user: 'Vikram Singh', mobile: '9988776655', operator: 'BSNL', amount: '99', status: 'Failed', date: '2023-11-20 13:45' },
  { id: 'TXN1028', user: 'Priya Raj', mobile: '8899001122', operator: 'Jio', amount: '719', status: 'Success', date: '2023-11-20 14:20' },
];

export const USERS_LIST = [
  { id: 'U001', name: 'John Doe', email: 'john@example.com', joined: 'Oct 12, 2023', totalSpent: '₹12,450' },
  { id: 'U002', name: 'Sarah Wayne', email: 'sarah@example.com', joined: 'Oct 15, 2023', totalSpent: '₹8,200' },
  { id: 'U003', name: 'Mike Ross', email: 'mike@example.com', joined: 'Oct 20, 2023', totalSpent: '₹5,600' },
];

export const COMPLAINTS = [
  { id: 'C101', subject: 'Transaction Failed', status: 'Open', date: '2 hours ago' },
  { id: 'C102', subject: 'Wallet Update Issue', status: 'Resolved', date: '1 day ago' },
];

export const USER_STATS = {
  walletBalance: "1,250.00",
  todayRecharges: "4",
  totalRecharges: "145",
  totalEarnings: "320.50"
};

export const USER_TRANSACTIONS = [
  { id: 'UXN501', mobile: '9123456780', operator: 'Jio', amount: '299', status: 'Success', date: '2023-11-20 09:15', commission: '₹5.98' },
  { id: 'UXN502', mobile: '8123456789', operator: 'Airtel', amount: '479', status: 'Success', date: '2023-11-20 11:30', commission: '₹9.58' },
  { id: 'UXN503', mobile: '7123456788', operator: 'Vi', amount: '199', status: 'Failed', date: '2023-11-20 12:45', commission: '₹0.00' },
  { id: 'UXN504', mobile: 'DTH-9882771', operator: 'Tata Play', amount: '600', status: 'Pending', date: '2023-11-20 14:10', commission: '₹12.00' },
];

export const PLANS = [
  { id: 1, operator: 'Jio', name: 'Cricket Pack', price: '499', validity: '28 Days', data: '2GB/Day', info: 'Free Voice Calls + 100 SMS/Day' },
  { id: 2, operator: 'Airtel', name: 'Truly Unlimited', price: '299', validity: '24 Days', data: '1.5GB/Day', info: 'Free Voice Calls + Apollo 24|7 Circle' },
];

export const COMPANIES_LIST = [
  { id: 'C001', name: 'Alpha Telecom', balance: '₹45,000', users: '120', commission: '₹12,400', status: 'Active' },
  { id: 'C002', name: 'Zodiac Recharges', balance: '₹12,200', users: '85', commission: '₹4,800', status: 'Inactive' },
  { id: 'C003', name: 'FastPay Solutions', balance: '₹88,900', users: '340', commission: '₹22,350', status: 'Active' },
];

export const OPERATOR_SETTINGS = [
  { name: 'Jio', commission: '3.5%', status: 'Active', todayVol: '₹1.2L' },
  { name: 'Airtel', commission: '3.2%', status: 'Active', todayVol: '₹85k' },
  { name: 'Vi', commission: '3.8%', status: 'Inactive', todayVol: '₹0' },
  { name: 'BSNL', commission: '5.0%', status: 'Active', todayVol: '₹15k' },
];

export const OPERATORS = ['Jio', 'Airtel', 'Vi', 'BSNL', 'MTNL'];

export const DTH_OPERATORS = ['Tata Play', 'Airtel DTH', 'Dish TV', 'Sun Direct', 'Videocon d2h'];
