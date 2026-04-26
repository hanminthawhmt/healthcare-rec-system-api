const fs = require("fs");
const csv = require("csv-parser");
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

const bulkCreatePatient = async (req, res, next) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a CSV file." });
    }
    const results = [];
    const filePath = req.file.path;
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          const report = await patientService.registerBulkPatients(
            results,
            req.user.id,
          );
          fs.unlinkSync(filePath);
          res.status(201).json({
            message: `Bulk upload successful. Registered ${report.length} patients.`,
            data: report,
          });
        } catch (error) {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          next(error);
        }
      });
  } catch (error) {
    console.error("DATABASE UPLOAD ERROR:", error);
    next(error);
  }
};

module.exports = {
  createPatient,
  bulkCreatePatient,
};
