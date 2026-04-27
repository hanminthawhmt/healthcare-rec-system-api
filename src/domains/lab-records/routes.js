const express = require("express");

const router = express.Router();

const labRecordController = require("./controller");

router.post("/", labRecordController.createALabData);
router.post("/bulk", labRecordController.createBulkLabData);

module.exports = router;
