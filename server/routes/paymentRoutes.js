const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Verify path if needed
const paymentController = require('../controllers/paymentController');

// All routes protected
router.post('/create-order', protect, paymentController.createOrder);
router.post('/verify', protect, paymentController.verifyPayment);

module.exports = router;
