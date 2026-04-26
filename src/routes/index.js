// Traffic Controller 
const express = require('express');

const authRoutes = require('../domains/auth/routes');
const staffRoutes = require('../domains/staff/routes');
const patientRoutes = require('../domains/patients/routes');
const { protect } = require('../middlewares/auth-middleware')

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/staff', protect, staffRoutes);
router.use('/patient', protect, patientRoutes);

module.exports = router;