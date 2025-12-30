const express = require('express');
const router = express.Router();
const { 
  getCompanyDashboard, 
  createPlan, 
  updatePlan, 
  deletePlan, 
  toggleStatus, 
  getMyPlans,
  getCompanyProfile,
  updateCompanyProfile,
  getCompanyRecharges,
  createPack
} = require('../controllers/companyController');
const { protect } = require('../middleware/authMiddleware');
const { roleProtect } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(roleProtect('COMPANY'));

router.get('/dashboard-metrics', getCompanyDashboard);
router.get('/profile', getCompanyProfile);
router.put('/profile', updateCompanyProfile);
router.get('/plans', getMyPlans);
router.post('/plans/create', createPlan);
router.put('/plans/:id', updatePlan);
router.delete('/plans/:id', deletePlan);
router.patch('/plans/:id/status', toggleStatus);
router.get('/recharges', getCompanyRecharges);
router.post('/packs/create', createPack);

module.exports = router;
