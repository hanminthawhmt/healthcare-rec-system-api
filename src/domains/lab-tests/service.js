const prisma = require("../../config/db");

const { getUserId } = require("../../utils/profileFinder");

const getLabTestLists = async () => {
  // need to add authorization check here
  try {
    return await prisma.lab_Test.findMany({
      include: { items : true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    throw new Error(`Failed to fetch lab tests: ${error.message}`);
  }
};

module.exports = { getLabTestLists };
