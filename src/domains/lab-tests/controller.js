const labTestService = require("./service");

const getLabTestLists = async (req, res, next) => {
  try {
    const userId = req.user.id; //  will use when later add authorization

    const labTests = await labTestService.getLabTestLists();

    res.status(200).json({
      status: "success",
      message: "Lab tests and items retrieved successfully",
      data: labTests,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLabTestLists,
};
