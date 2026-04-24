const prisma = require("../../config/db");

const createOne = async (data, userId) => {

  const adminRecord = await prisma.admin.findUnique({
    where: { user_id: userId },
  });

  if (!adminRecord) {
    const error = new Error(
      "Only registered administrators can create departments.",
    );
    error.statusCode = 403;
    throw error;
  }

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
      created_by: adminRecord.id,
    },
  });
};

module.exports = { createOne };
