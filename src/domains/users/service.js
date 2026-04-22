const prisma = require("../../config/db");
const bcrypt = require("bcryptjs");

const createOne = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  return await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
      role: userData.role || "ADMIN",
      is_active: userData.is_active || false,
      admin: {
        create : {}
      }
    },

    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      created_at: true,
      updated_at: true,
      admin: {
        select: {
          id: true
        }
      }
    },
  });
};

module.exports = { createOne };
