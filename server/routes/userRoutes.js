const express = require('express');
const router = express.Router();
const { 
  getUserDashboard, 
  getActivePlans, 
  performRecharge, 
  getMyRecharges,
  updateProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { roleProtect } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(roleProtect('USER'));

router.get('/dashboard', getUserDashboard);
router.get('/recharge-plans', getActivePlans);
// router.post('/recharge', performRecharge); // LEGACY: Unified to Razorpay only
router.get('/recharges', getMyRecharges);

module.exports = router;
