const Wallet = require('../models/Wallet');
const User = require('../models/User');
const WalletTransaction = require('../models/WalletTransaction');
const mongoose = require('mongoose');

/**
 * Updates wallet balance and synchronizes with User model.
 * @param {string} userId - ID of the user
 * @param {number} amount - Amount to add/subtract
 * @param {string} type - 'CREDIT' or 'DEBIT'
 * @param {string} reason - Description for the transaction
 * @param {object} session - Optional Mongoose session for atomicity
 * @param {boolean} isExpense - Whether to increment totalSpent
 */
const updateWalletBalance = async (userId, amount, type, reason, session = null, isExpense = false) => {
  console.log(`[WALLET_SERVICE] Updating wallet for user ${userId}: ${type} ${amount} (Expense: ${isExpense})`);

  try {
    // 1. Atomic update of Wallet collection
    const wallet = await Wallet.findOneAndUpdate(
      { user: userId },
      { $inc: { balance: type === 'CREDIT' ? amount : -amount } },
      { session, new: true, upsert: true }
    );

    if (type === 'DEBIT' && wallet.balance < 0) {
      throw new Error('Insufficient wallet balance after transaction');
    }

    console.log(`[WALLET_SERVICE] Wallet balance updated: ${wallet.balance}`);

    // 2. Synchronize User model
    const userUpdate = { walletBalance: wallet.balance };
    if (isExpense && type === 'DEBIT') {
      userUpdate.$inc = { totalSpent: amount };
    }

    const user = await User.findByIdAndUpdate(
      userId,
      userUpdate,
      { session, new: true }
    );

    if (!user) {
      console.error(`[WALLET_SERVICE] CRITICAL: User ${userId} not found during sync!`);
      throw new Error('User not found during wallet sync');
    }

    console.log(`[WALLET_SERVICE] User ${userId} synced. Balance: ${user.walletBalance}, TotalSpent: ${user.totalSpent}`);

    // 3. Create Transaction Record
    const transaction = await WalletTransaction.create([{
      user: userId,
      type,
      amount,
      balanceAfter: wallet.balance,
      reason
    }], { session });

    return {
      success: true,
      newBalance: wallet.balance,
      transaction: transaction[0]
    };

  } catch (error) {
    console.error(`[WALLET_SERVICE] Error: ${error.message}`);
    throw error;
  }
};

module.exports = { updateWalletBalance };
