const departmentService = require("./service");

const createDepartment = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const department = await departmentService.createOne(req.body, userId);

    res.status(201).json({
      status: "success",
      data: { department },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createDepartment };
