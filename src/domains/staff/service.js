const prisma = require("../../config/db");
const { getUserId } = require("../../utils/profileFinder");

const createNewDepartment = async (data, userId) => {
  const admin = await getUserId(
    userId,
    "admin",
    "Only registered administrators can create departments.",
  );

  const existingDepartment = await prisma.department.findUnique({
    where: { name: data.name },
  });

  if (existingDepartment) {
    const error = new Error("Department with this name already exists");
    error.statusCode = 400;
    throw error;
  }

  return await prisma.department.create({
    data: {
      name: data.name,
      description: data.description,
      created_by: admin.id,
    },
  });
};

module.exports = {createNewDepartment};