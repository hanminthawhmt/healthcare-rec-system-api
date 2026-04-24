const prisma = require("../../config/db");
const bcrypt = require("bcryptjs");

const verifyUsers = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const storeUser = async (userData) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    const error = new Error("Email already in use");
    error.statusCode(400);
    throw error;
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);

  return await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
      role: userData.role || "ADMIN",
      is_active: userData.is_active || false,
      admin: { create: {} },
    },

    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      admin: { select: { id: true } },
    },

  });
};

module.exports = { verifyUsers, storeUser };
