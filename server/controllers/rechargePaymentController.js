const Razorpay = require('razorpay');
const crypto = require('crypto');
const Transaction = require('../models/Transaction');
const Plan = require('../models/Plan');
const User = require('../models/User');
const { processDirectRecharge } = require('../services/rechargeService');
const mongoose = require('mongoose');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order for Direct Recharge
exports.createRechargeOrder = async (req, res) => {
  try {
    const { planId, mobileNumber } = req.body;
    const userId = req.user._id;

    if (!planId || !mobileNumber) {
      return res.status(400).json({ message: 'Plan ID and mobile number are required' });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const options = {
      amount: plan.price * 100, // Amount in paise
      currency: "INR",
      receipt: `recharge_${Date.now()}`,
      notes: {
        planId,
        mobileNumber,
        type: 'DIRECT_RECHARGE'
      }
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: 'Unable to create Razorpay order' });
    }

    // Save Transaction as "created" - Linked to Company
    const transaction = new Transaction({
      user: userId,
      company: plan.company,
      type: 'CREDIT', // From company perspective
      amount: plan.price,
      balanceAfter: 0, // Will be updated on success
      status: 'created',
      razorpayOrderId: order.id,
      planId,
      mobileNumber
    });

    await transaction.save();

    res.status(200).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Create Recharge Order Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Verify Direct Recharge Payment
exports.verifyRechargePayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user._id;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const transaction = await Transaction.findOne({ razorpayOrderId: razorpay_order_id });

      if (!transaction) {
        return res.status(404).json({ message: 'Transaction record not found' });
      }

      if (transaction.status === 'success') {
        return res.status(200).json({ message: 'Payment already verified', success: true });
      }

      // Update Transaction status and reference
      transaction.status = 'success';
      transaction.razorpayPaymentId = razorpay_payment_id;
      transaction.razorpaySignature = razorpay_signature;
      
      // Process Direct Recharge (Credits Company, Creates History, Debits User Audit Trail)
      const rechargeResult = await processDirectRecharge(
          userId, 
          transaction.planId, 
          transaction.mobileNumber, 
          null, 
          razorpay_payment_id
      );

      // Update balanceAfter based on the user's fresh balance
      const freshUser = await User.findById(userId);
      transaction.balanceAfter = freshUser.walletBalance; 
      await transaction.save();

      res.status(200).json({
        success: true,
        message: 'Recharge payment verified and processed successfully',
        recharge: rechargeResult,
        newBalance: freshUser.walletBalance,
        totalSpent: freshUser.totalSpent
      });

    } else {
       const transaction = await Transaction.findOne({ razorpayOrderId: razorpay_order_id });
       if (transaction) {
           transaction.status = 'failed';
           await transaction.save();
       }

      res.status(400).json({
        success: false,
        message: 'Invalid Signature verification failed'
      });
    }

  } catch (error) {
    console.error('Verify Recharge Payment Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
