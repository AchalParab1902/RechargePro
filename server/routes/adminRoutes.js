const express = require('express');
const router = express.Router();
const { 
  getAdminDashboard, 
  addCompany, 
  editCompany, 
  deleteCompany, 
  toggleUserStatus, 
  getCompanies,
  getRetailers 
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { roleProtect } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(roleProtect('ADMIN'));

router.get('/dashboard', getAdminDashboard);
router.get('/companies', getCompanies);
router.get('/retailers', getRetailers);
router.post('/company', addCompany);
router.put('/company/:id', editCompany);
router.delete('/company/:id', deleteCompany);
router.patch('/user/:id/status', toggleUserStatus);

module.exports = router;
