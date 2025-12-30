const User = require('../models/User');
const Recharge = require('../models/Recharge');

// @desc    Get system-wide dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getAdminDashboard = async (req, res) => {
  const totalCompanies = await User.countDocuments({ role: 'COMPANY' });
  const totalUsers = await User.countDocuments({ role: 'USER' });
  const totalRecharges = await Recharge.countDocuments();
  
  const revenueAgg = await Recharge.aggregate([
    { $match: { status: 'SUCCESS' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);

  const exposureAgg = await User.aggregate([
    { $match: { role: 'COMPANY' } },
    { $group: { _id: null, total: { $sum: '$walletBalance' } } }
  ]);

  const recentRecharges = await Recharge.find({})
    .limit(10)
    .sort({ createdAt: -1 })
    .populate('user', 'name email')
    .populate('company', 'name')
    .populate('plan', 'name serviceType');

  res.json({
    totalCompanies,
    totalUsers,
    totalRecharges,
    totalRevenue: revenueAgg.length > 0 ? revenueAgg[0].total : 0,
    totalExposure: exposureAgg.length > 0 ? exposureAgg[0].total : 0,
    recentRecharges
  });
};

const Company = require('../models/Company');

// @desc    Add a new company
// @route   POST /api/admin/company
// @access  Private/Admin
const addCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'User with this email already exists' });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    role: 'COMPANY'
  });

  // Automatically create Company Profile for wallet tracking
  await Company.create({
    user: user._id,
    companyName: name,
    businessEmail: email,
    contactNumber: 'N/A',
    address: 'N/A'
  });

  res.status(201).json(user);
};

// @desc    Edit company details
// @route   PUT /api/admin/company/:id
// @access  Private/Admin
const editCompany = async (req, res) => {
  const company = await User.findById(req.params.id);

  if (company && company.role === 'COMPANY') {
    company.name = req.body.name || company.name;
    company.email = req.body.email || company.email;
    if (req.body.password) {
      company.password = req.body.password;
    }
    
    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
};

// @desc    Delete a company
// @route   DELETE /api/admin/company/:id
// @access  Private/Admin
const deleteCompany = async (req, res) => {
  const company = await User.findById(req.params.id);

  if (company && company.role === 'COMPANY') {
    await User.deleteOne({ _id: company._id });
    res.json({ message: 'Company removed' });
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
};

// @desc    Toggle user/company status
// @route   PATCH /api/admin/user/:id/status
// @access  Private/Admin
const toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user && (user.role === 'COMPANY' || user.role === 'USER')) {
    user.isActive = !user.isActive;
    await user.save();
    res.json(user);
  } else {
    res.status(404).json({ message: 'User/Company not found' });
  }
};

// @desc    Get all companies
// @route   GET /api/admin/companies
// @access  Private/Admin
const getCompanies = async (req, res) => {
  try {
    const companies = await User.aggregate([
      { $match: { role: 'COMPANY' } },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
          isActive: 1,
          createdAt: 1,
          walletBalance: 1
        }
      },
      { $sort: { createdAt: -1 } }
    ]);
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all retailers
// @route   GET /api/admin/retailers
// @access  Private/Admin
const getRetailers = async (req, res) => {
  const retailers = await User.find({ role: 'USER' }).sort({ createdAt: -1 });
  res.json(retailers);
};

module.exports = {
  getAdminDashboard,
  addCompany,
  editCompany,
  deleteCompany,
  toggleUserStatus,
  getCompanies,
  getRetailers
};
