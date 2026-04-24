const express = require("express");
const departmentController = require("./controller");
const router = express.Router();

router.post("/", departmentController.createDepartment);

module.exports = router;
