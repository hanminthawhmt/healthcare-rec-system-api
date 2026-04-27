const labRecordService = require("./service");

const createALabData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { hn_number, lab_test_id, results } = req.body;

    if (!hn_number || !lab_test_id || !results || !Array.isArray(results)) {
      return res.status(400).json({
        status: "error",
        message:
          "Missing required fields: hn_number, lab_test_id, and results array are required.",
      });
    }

    const savedResults = await labRecordService.createALabData(
      { hn_number, lab_test_id, results },
      userId,
    );

    res.status(201).json({
      status: "success",
      message: `Successfully recorded ${savedResults.length} lab items for patient ${hn_number}.`,
      data: savedResults,
    });
  } catch (error) {
    next(error);
  }
};

const createBulkLabData = () => {};

module.exports = {
  createALabData,
  createBulkLabData,
};
