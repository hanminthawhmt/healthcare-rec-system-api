const prisma = require("../../config/db");
const bcrypt = require("bcryptjs");

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

const createNewDoctor = async (data, userId) => {
  const admin = await getUserId(
    userId,
    "admin",
    "Only registered administrators can create doctors.",
  );

  const hashedPassword = await bcrypt.hash(data.phone_no, 12);

  return await prisma.$transaction(async (tx) => {
    // Create user
    
    const user = await tx.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: "DOCTOR",
        is_active: false,
      },
    });

    return await tx.doctor.create({
      data: {
        phone_no: data.phone_no,
        user: { connect: { id: user.id } },
        experience: data.experience || 0,
        title: data.title,
        department: { connect: { id: data.department_id } },
        specializations: {
          connect: data.specialization_ids.map((id) => ({ id })),
        },
        admin: { connect: { id: admin.id } },
      },
      include: {
        user: { select: { email: true, name: true } },
        department: { select: { name: true } },
        specializations: { select: { name: true } },
      },
    });
  });
};

module.exports = { createNewDepartment, createNewDoctor };
