const Wallet = require('../models/Wallet');
const User = require('../models/User');
const WalletTransaction = require('../models/WalletTransaction');
const Recharge = require('../models/Recharge');
const { updateWalletBalance } = require('../services/walletService');

// @desc    Get wallet balance
// @route   GET /api/wallet
// @access  Private
const getWallet = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ user: req.user._id });
    
    if (!wallet) {
      // Create wallet if it doesn't exist (defensive)
      wallet = await Wallet.create({ user: req.user._id, balance: 0 });
    }
    
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add money to wallet
// @route   POST /api/wallet/add
// @access  Private
const addMoney = async (req, res) => {
  const { amount } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  try {
    const result = await updateWalletBalance(
      req.user._id,
      Number(amount),
      'CREDIT',
      'Wallet Deposit'
    );

    res.json({ message: 'Money added successfully', newBalance: result.newBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Recharge using wallet balance
// @route   POST /api/wallet/recharge
// @access  Private
const rechargeWallet = async (req, res) => {
  const { amount, mobileNumber, planId } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid recharge amount' });
  }

  // Mobile Number Validation
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileNumber || !mobileRegex.test(mobileNumber)) {
    return res.status(400).json({ message: 'Mobile number must be exactly 10 digits' });
  }

  if (mobileNumber.startsWith('00')) {
    return res.status(400).json({ message: 'Mobile number cannot start with 00' });
  }

  try {
    const result = await updateWalletBalance(
      req.user._id,
      Number(amount),
      'DEBIT',
      `Recharge for ${mobileNumber}`
    );

    // Create Recharge record
    await Recharge.create({
      user: req.user._id,
      plan: planId,
      mobileNumber,
      amount: Number(amount),
    });
    
    res.json({ 
      success: true, 
      message: 'Recharge successful', 
      newBalance: result.newBalance 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get wallet transactions
// @route   GET /api/wallet/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const transactions = await WalletTransaction.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWallet,
  addMoney,
  rechargeWallet,
  getTransactions
};
