const User = require('../models/User');
const Recharge = require('../models/Recharge');
const Plan = require('../models/Plan');
const Company = require('../models/Company');
const WalletTransaction = require('../models/WalletTransaction');
const mongoose = require('mongoose');

// @desc    Get user dashboard stats
// @route   GET /api/user/dashboard
// @access  Private/User
const getUserDashboard = async (req, res) => {
  try {
    const totalRecharges = await Recharge.countDocuments({ user: req.user._id });
    
    // 2. Fetch Recent Recharges (for merging)
    const recentRecharges = await Recharge.find({ user: req.user._id })
      .limit(5)
      .sort({ createdAt: -1 })
      .populate('plan', 'name price');

    // 3. Fetch Recent Wallet Transactions
    const recentTransactions = await WalletTransaction.find({ user: req.user._id })
      .limit(5)
      .sort({ createdAt: -1 });

    // 4. Create Unified Recent Activity (Merged last 5 activities of any type)
    const unifiedActivity = [
      ...recentRecharges.map(r => ({
        type: 'RECHARGE',
        subType: r.status,
        amount: r.amount,
        status: r.status,
        createdAt: r.createdAt,
        id: r._id,
        description: `Recharge for ${r.mobileNumber}`
      })),
      ...recentTransactions.map(t => ({
        type: 'WALLET',
        subType: t.type,
        amount: t.amount,
        status: 'SUCCESS', // Wallet tx themselves are recorded as success here
        createdAt: t.createdAt,
        id: t._id,
        description: t.reason
      }))
    ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
    
    const activePlans = await Plan.find(
      req.user.company ? { company: req.user.company, status: 'Active' } : { status: 'Active' }
    ).limit(5);

    // Map new Plan fields to match legacy frontend 'title/amount' if necessary, 
    // but better to update frontend. Here I'll map for dashboard compat.
    const mappedActivePlans = activePlans.map(p => ({
      _id: p._id,
      title: p.name,
      amount: p.price,
      validity: p.validity,
      description: p.description,
      operator: p.serviceType // Using serviceType as operator for now
    }));

    res.json({
      walletBalance: req.user.walletBalance,
      totalSpent: req.user.totalSpent || 0,
      totalRecharges,
      recentActivity: unifiedActivity,
      activePlans: mappedActivePlans
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active plans (Advertisements)
// @route   GET /api/user/recharge-plans
// @access  Private/User
const getActivePlans = async (req, res) => {
  const query = { status: 'Active' };
  if (req.user.company) {
    query.company = req.user.company;
  }
  // Remove the "else return []" to allow unlinked users to see all plans

  const plans = await Plan.find(query).populate('company', 'name');
  
  // Transform for frontend compatibility (title -> name, amount -> price)
  const mappedPlans = plans.map(p => ({
    ...p._doc,
    title: p.name,
    amount: p.price,
    operator: p.serviceType
  }));

  console.log(`[GET_ACTIVE_PLANS] Found ${plans.length} active plans for company ${req.user.company}`);
  res.json(mappedPlans);
};

const { processRecharge } = require('../services/rechargeService');

// @desc    Get user's recharges
// @route   GET /api/user/recharges
// @access  Private/User
const getMyRecharges = async (req, res) => {
  const recharges = await Recharge.find({ user: req.user._id })
    .populate('plan', 'name serviceType')
    .sort({ createdAt: -1 });

  // Transform for frontend if needed (keeping compatibility)
  const mappedRecharges = recharges.map(r => {
    const doc = { ...r._doc };
    if (doc.plan) {
      doc.plan.title = doc.plan.name;
      doc.plan.operator = doc.plan.serviceType;
    }
    return doc;
  });

  res.json(mappedRecharges);
};
module.exports = {
  getUserDashboard,
  getActivePlans,
  getMyRecharges
};
