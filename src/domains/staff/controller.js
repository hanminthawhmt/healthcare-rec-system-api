const staffService = require("./service");

const createDepartment = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const department = await staffService.createNewDepartment(req.body, userId);

    res.status(201).json({
      status: "success",
      data: { department },
    });
  } catch (error) {
    next(error);
  }
};

const createDoctor = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const doctor = await staffService.createNewDoctor(req.body, userId);

    res.status(201).json({
      status: "success",
      data: { doctor },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createDepartment, createDoctor };
