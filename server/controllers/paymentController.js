const Razorpay = require('razorpay');
const crypto = require('crypto');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { processRecharge } = require('../services/rechargeService');
const { updateWalletBalance } = require('../services/walletService');
const mongoose = require('mongoose');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { amount, planId, mobileNumber } = req.body;
    const userId = req.user._id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        planId: planId || "",
        mobileNumber: mobileNumber || ""
      }
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: 'Unable to create order' });
    }

    // Dashboard balance is stored in User model
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const transaction = new Transaction({
      user: userId,
      type: 'CREDIT',
      amount: amount,
      balanceAfter: user.walletBalance, // Current balance before success
      status: 'created',
      razorpayOrderId: order.id,
      planId: planId || null,
      mobileNumber: mobileNumber || null
    });

    await transaction.save();

    res.status(200).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user._id;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    console.log('--- Signature Verification ---');
    console.log('Order ID:', razorpay_order_id);
    console.log('Payment ID:', razorpay_payment_id);
    console.log('Expected Signature:', expectedSignature);
    console.log('Received Signature:', razorpay_signature);

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Find Transaction
      const transaction = await Transaction.findOne({ razorpayOrderId: razorpay_order_id });

      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      if (transaction.status === 'success') {
        return res.status(200).json({ message: 'Payment already verified', success: true });
      }

      transaction.status = 'success';
      
      // Update Wallet and Sync User using centralized service
      const walletSync = await updateWalletBalance(
          userId, 
          transaction.amount, 
          'CREDIT', 
          `Razorpay Deposit: ${razorpay_payment_id}`
      );

      transaction.balanceAfter = walletSync.newBalance;
      await transaction.save();

      let rechargeResult = null;
      if (transaction.planId && transaction.mobileNumber) {
          try {
              rechargeResult = await processRecharge(userId, transaction.planId, transaction.mobileNumber, null, razorpay_payment_id);
          } catch (error) {
              console.error('Auto Recharge Failed after payment success:', error.message);
              // We don't fail the whole response because payment is successful.
              // We return the error in metadata.
              rechargeResult = { success: false, error: error.message };
          }
      }


      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        newBalance: walletSync.newBalance,
        recharge: rechargeResult
      });

    } else {
      // payment failed verification
       const transaction = await Transaction.findOne({ razorpayOrderId: razorpay_order_id });
       if (transaction) {
           transaction.status = 'failed';
           await transaction.save();
       }

      res.status(400).json({
        success: false,
        message: 'Invalid Signature'
      });
    }

  } catch (error) {
    console.error('Verify Payment Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
