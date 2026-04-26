const patientController = require("./controller");
const express = require("express");
const router = express.Router();

router.post("/register", patientController.createPatient);

module.exports = router;
