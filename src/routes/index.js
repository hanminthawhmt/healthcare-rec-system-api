// Traffic Controller
const express = require("express");

const authRoutes = require("../domains/auth/routes");
const staffRoutes = require("../domains/staff/routes");
const patientRoutes = require("../domains/patients/routes");
const labTestRoutes = require("../domains/lab-tests/routes");
const labRecordRoutes = require("../domains/lab-records/routes");
const { protect } = require("../middlewares/auth-middleware");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/staff", protect, staffRoutes);
router.use("/patient", protect, patientRoutes);
router.use("/lab-tests", protect, labTestRoutes);
router.use("/lab-records", protect, labRecordRoutes);

module.exports = router;
