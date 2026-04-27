const labTestController = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/all", labTestController.getLabTestLists);

module.exports = router ;
