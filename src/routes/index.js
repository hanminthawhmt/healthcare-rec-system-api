// Traffic Controller 
const express = require('express');

const authRoutes = require('../domains/auth/routes');
const departmentRoutes = require('../domains/departments/routes');
const { protect } = require('../middlewares/auth-middleware')

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/departments', protect, departmentRoutes);

module.exports = router;