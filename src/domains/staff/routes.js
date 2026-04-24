const staffController = require("./controller");
const express = require("express");
const router = express.Router();

router.post("/departments", staffController.createDepartment);
router.post("/doctors", staffController.createDoctor);

module.exports = router;
