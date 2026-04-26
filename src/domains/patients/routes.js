const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const patientController = require("./controller");
const express = require("express");
const router = express.Router();

router.post("/register", patientController.createPatient);
router.post(
  "/bulk-upload",
  upload.single("file"),
  patientController.bulkCreatePatient,
);

module.exports = router;
