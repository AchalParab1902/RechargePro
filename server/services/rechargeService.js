const Recharge = require('../models/Recharge');
const Plan = require('../models/Plan');
const { updateWalletBalance } = require('./walletService');
const mongoose = require('mongoose');

/**
 * Reusable service to process a recharge transaction.
 * Handles debiting user, crediting company, and creating history.
 */
const processRecharge = async (userId, planId, mobileNumber, providedSession = null, razorpayPaymentId = null) => {
  let session = providedSession;
  let ownSession = false;

  if (!session) {
    session = await mongoose.startSession();
    session.startTransaction();
    ownSession = true;
  }

  try {
    const plan = await Plan.findById(planId);
    if (!plan || plan.status !== 'Active') {
      throw new Error('Invalid or inactive plan');
    }

    // 1 & 2. Deduct User Wallet and Create Transaction record
    const userWalletUpdate = await updateWalletBalance(
      userId,
      plan.price,
      'DEBIT',
      `Recharge for ${mobileNumber} using plan ${plan.name}`,
      session,
      true // isExpense
    );

    // 4 & 5. Credit Company Balance and Create Transaction record
    const companyWalletUpdate = await updateWalletBalance(
      plan.company,
      plan.price,
      'CREDIT',
      `Revenue for plan ${plan.name} from user ${userId}`,
      session
    );

    // 3. Create Recharge record
    const recharge = await Recharge.create([{
      user: userId,
      company: plan.company,
      plan: plan._id,
      mobileNumber,
      amount: plan.price,
      status: 'SUCCESS',
      razorpayPaymentId
    }], { session });

    if (ownSession) {
      await session.commitTransaction();
    }

    return {
      success: true,
      recharge: recharge[0],
      updatedUserBalance: userWalletUpdate.newBalance,
      updatedCompanyBalance: companyWalletUpdate.newBalance
    };

  } catch (error) {
    if (ownSession) {
      await session.abortTransaction();
    }
    console.error('Recharge Service Error:', error.message);
    throw error;
  } finally {
    if (ownSession) {
      session.endSession();
    }
  }
};

/**
 * Reusable service for direct recharges (Direct Razorpay -> Company).
 * Bypasses user wallet but credits company wallet.
 */
const processDirectRecharge = async (userId, planId, mobileNumber, providedSession = null, razorpayPaymentId = null) => {
  let session = providedSession;
  let ownSession = false;

  if (!session) {
    session = await mongoose.startSession();
    session.startTransaction();
    ownSession = true;
  }

  try {
    const plan = await Plan.findById(planId);
    if (!plan || plan.status !== 'Active') {
      throw new Error('Invalid or inactive plan');
    }

    // 1. Audit Trail: DEBIT User Wallet (Recharge Expense)
    // NOTE: We only DEBIT here as per requirement "Recharge -> MINUS amount".
    // The Razorpay payment is considered the authorization, but the value is deducted from the wallet.
    
    console.log(`[RECHARGE_SERVICE] Processing Debit for user ${userId}`);

    const userUpdate = await updateWalletBalance(
      userId,
      plan.price,
      'DEBIT',
      `Recharge for ${mobileNumber} (Razorpay: ${razorpayPaymentId})`,
      session,
      true // isExpense
    );
    console.log(`[RECHARGE_SERVICE] User Debit complete. New Balance: ${userUpdate.newBalance}`);

    // 2. Credit Company Balance 
    const companyWalletUpdate = await updateWalletBalance(
      plan.company,
      plan.price,
      'CREDIT',
      `Direct Revenue for plan ${plan.name} from user ${userId} (Paid via Razorpay: ${razorpayPaymentId})`,
      session
    );

    // 2. Create Recharge record
    const recharge = await Recharge.create([{
      user: userId,
      company: plan.company,
      plan: plan._id,
      mobileNumber,
      amount: plan.price,
      status: 'SUCCESS',
      razorpayPaymentId
    }], { session });

    if (ownSession) {
      await session.commitTransaction();
    }

    return {
      success: true,
      recharge: recharge[0],
      updatedCompanyBalance: companyWalletUpdate.newBalance,
      updatedUserBalance: userUpdate.newBalance
    };

  } catch (error) {
    if (ownSession) {
      await session.abortTransaction();
    }
    console.error('Direct Recharge Service Error:', error.message);
    throw error;
  } finally {
    if (ownSession) {
      session.endSession();
    }
  }
};

module.exports = { processRecharge, processDirectRecharge };
