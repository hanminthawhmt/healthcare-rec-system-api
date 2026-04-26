const patientService = require("./service");

const createPatient = async (req, res, next) => {
  try {
    const data = req.body;
    const adminId = req.user.id;
    const result = await patientService.registerAPatient(data, adminId);
    res.status(201).json({
      message: "Patient registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPatient,
};
