const prisma = require("../../config/db");

const { getUserId } = require("../../utils/profileFinder");

const createALabData = async (data, userId) => {
  const { hn_number, lab_test_id, results } = data;
  // results expected as: [{ item_id: 1, value: 120 }, { item_id: 2, value: 80 }]
  const admin = await getUserId(
    userId,
    "admin",
    "Only registered administrators can register patients.",
  );

  return await prisma.$transaction(async (tx) => {
    const patient = await tx.patient.findUnique({
      where: { hn_number },
    });

    if (!patient) throw new Error(`Patient with HN ${hn_number} not found.`);

    const requiredItems = await tx.lab_Test_Item.findMany({
      where: { lab_test_id: parseInt(lab_test_id) },
    });

    const providedItemsIds = results.map((r) => r.item_id);

    const missingItems = requiredItems.filter(
      (item) => !providedItemsIds.includes(item.id),
    );

    if (missingItems.length > 0) {
      const missingNames = missingItems.map((i) => i.name).join(", ");
      throw new Error(
        `Incomplete data for this test. Missing: ${missingNames}`,
      );
    }

    const savedResults = [];
    for (const res of results) {
      const newResult = await tx.lab_Result.create({
        data: {
          // Use the RELATION name (patient) to connect, not the ID name (patient_id)
          patient: {
            connect: { id: patient.id },
          },
          lab_test: {
            connect: { id: parseInt(lab_test_id) },
          },
          lab_test_item: {
            connect: { id: res.item_id },
          },

          // Scalar values
          result: parseFloat(res.value),
          status: "LOW", // Per your request to set all to LOW for now
        },
      });
      savedResults.push(newResult);
    }

    return savedResults;
  });
};

const createBulkLabData = () => {};

module.exports = { createALabData, createBulkLabData };
