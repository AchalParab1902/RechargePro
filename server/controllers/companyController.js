const User = require('../models/User');
const Recharge = require('../models/Recharge');
const Plan = require('../models/Plan');
const Pack = require('../models/Pack');
const Company = require('../models/Company');
const PlanRepository = require('../services/PlanRepository');

// @desc    Get company dashboard stats
// @route   GET /api/company/dashboard
// @access  Private/Company
const getCompanyDashboard = async (req, res) => {
  try {
    console.log(`[DEBUG] Fetching dashboard stats for company user: ${req.user._id}`);
    const totalPlans = await Plan.countDocuments({ company: req.user._id });
    const totalRetailers = await User.countDocuments({ company: req.user._id, role: 'USER' });
    
    const companyProfile = await Company.findOne({ user: req.user._id });
    
    const revenueAgg = await Recharge.aggregate([
      { $match: { company: req.user._id, status: 'SUCCESS' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      totalPlans,
      totalRetailers,
      totalVolume: revenueAgg.length > 0 ? revenueAgg[0].total : 0,
      walletBalance: req.user.walletBalance || 0
    });
  } catch (error) {
    console.error(`[ERROR] getCompanyDashboard failed for user ${req.user?._id}:`, error);
    res.status(500).json({ 
      message: 'Failed to fetch dashboard metrics',
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
};

// @desc    Create a recharge plan
// @route   POST /api/company/recharge-plan
// @access  Private/Company
const createPlan = async (req, res) => {
  try {
    const plan = await PlanRepository.createPlan(req.body, req.user._id);
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Edit a recharge plan
// @route   PUT /api/company/recharge-plan/:id
// @access  Private/Company
const updatePlan = async (req, res) => {
  try {
    const plan = await PlanRepository.updatePlan(req.params.id, req.body, req.user._id);
    res.json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a recharge plan
// @route   DELETE /api/company/recharge-plan/:id
// @access  Private/Company
const deletePlan = async (req, res) => {
  try {
    await PlanRepository.deletePlan(req.params.id, req.user._id);
    res.json({ message: 'Plan removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Toggle plan status
// @route   PATCH /api/company/recharge-plan/:id/status
// @access  Private/Company
const toggleStatus = async (req, res) => {
  try {
    const plan = await PlanRepository.toggleStatus(req.params.id, req.user._id);
    res.json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get company's own plans
// @route   GET /api/company/recharge-plans
// @access  Private/Company
// @desc    Get company profile
// @route   GET /api/company/profile
// @access  Private/Company
const getCompanyProfile = async (req, res) => {
  try {
    console.log(`[DEBUG] Fetching profile for user: ${req.user._id}`);
    let company = await Company.findOne({ user: req.user._id });
    
    if (!company) {
      console.log(`[DEBUG] Profile missing for user: ${req.user._id}. Creating defensive profile.`);
      // Create profile if missing (defensive)
      company = await Company.create({
        user: req.user._id,
        companyName: req.user.name || 'Unknown Company',
        businessEmail: req.user.email || 'N/A',
        contactNumber: 'N/A',
        address: 'N/A'
      });
      console.log(`[DEBUG] defensive profile created for user: ${req.user._id}`);
    }
    
    res.json(company);
  } catch (error) {
    console.error(`[ERROR] getCompanyProfile failed for user ${req.user?._id}:`, error);
    res.status(500).json({ 
      message: 'Failed to retrieve company profile',
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
};

// @desc    Update company profile
// @route   PUT /api/company/profile
// @access  Private/Company
// @desc    Create a pack
// @route   POST /api/company/packs/create
// @access  Private/Company
const createPack = async (req, res) => {
  try {
    const { packName, plans, totalPrice } = req.body;
    const pack = await Pack.create({
      packName,
      plans,
      totalPrice,
      company: req.user._id
    });
    res.status(201).json(pack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyPlans = async (req, res) => {
  try {
    console.log(`[DEBUG] Fetching plans for company user: ${req.user._id}`);
    const plans = await PlanRepository.getByCompany(req.user._id);
    res.json(plans);
  } catch (error) {
    console.error(`[ERROR] getMyPlans failed for user ${req.user?._id}:`, error);
    res.status(500).json({ 
      message: 'Failed to fetch company plans',
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
};

// @desc    Get company's recharge history
// @route   GET /api/company/recharges
// @access  Private/Company
const getCompanyRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find({ company: req.user._id })
      .populate('user', 'name email')
      .populate('plan', 'name price')
      .sort({ createdAt: -1 });

    res.json(recharges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompanyDashboard,
  createPlan,
  updatePlan,
  deletePlan,
  toggleStatus,
  getMyPlans,
  getCompanyProfile,
  getCompanyRecharges,
  updateCompanyProfile: async (req, res) => {
    try {
      const company = await Company.findOne({ user: req.user._id });
      if (!company) return res.status(404).json({ message: 'Profile not found' });
      
      Object.assign(company, req.body);
      const updated = await company.save();
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createPack
};
