const express = require('express');
const router = express.Router();
const { createRechargeOrder, verifyRechargePayment } = require('../controllers/rechargePaymentController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/create-order', createRechargeOrder);
router.post('/verify-payment', verifyRechargePayment);

module.exports = router;
