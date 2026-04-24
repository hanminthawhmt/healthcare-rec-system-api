const prisma = require("../config/db");

const getUserId = async (userId, modelName, errorMessage) => {
  const profile = await prisma[modelName].findUnique({
    where: {
      user_id: userId,
    },
  });

  if (!profile) {
    const error = new Error(errorMessage || `Profile not found for this user.`);
    error.statusCode = 403;
    throw error;
  }

  return profile;
};

module.exports = { getUserId };
