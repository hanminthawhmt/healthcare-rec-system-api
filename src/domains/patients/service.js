const prisma = require("../../config/db");
const bcrypt = require("bcryptjs");
const constants = require("../../utils/constants");

const { getUserId } = require("../../utils/profileFinder");
const { da } = require("zod/locales");

const registerAPatient = async (data, userId) => {
  const admin = await getUserId(
    userId,
    "admin",
    "Only registered administrators can register patients.",
  );

  // is there a patient exists with this hn number or citizen id
  const existingPatient = await prisma.patient.findFirst({
    where: {
      OR: [{ hn_number: data.hn_number }, { citizen_id: data.citizen_id }],
    },
  });

  if (existingPatient) {
    const field =
      existingPatient.hn_number === data.hn_number ? "HN Number" : "Citizen ID";
    const error = new Error(`Patient with this ${field} already exists`);
    error.statusCode = 400;
    throw error;
  }
  const hn_number = await generateHN();

  const hashedPassword = await bcrypt.hash(data.citizen_id, 12);

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: constants.ROLES["PATIENT"],
        is_active: false,
      },
    });

    const patient = await tx.patient.create({
      data: {
        user_id: user.id,
        citizen_id: data.citizen_id,
        hn_number: hn_number,
        phone_no: data.phone_no,
      },
    });

    const patient_info = await tx.patient_Info.create({
      data: {
        patient_id: patient.id,
        blood_type: constants.BLOOD_TYPES[data.blood_type],
        date_of_birth: new Date(data.date_of_birth),
        gender: data.gender,
      },
    });

    return { user, patient, patient_info };
  });
};

const registerBulkPatients = async (patientsArray, userId) => {
  const admin = await getUserId(
    userId,
    "admin",
    "Only registered administrators can register patients.",
  );

  const results = [];
  return await prisma.$transaction(
    async (tx) => {
      for (const patientData of patientsArray) {
        const existing = await tx.patient.findFirst({
          where: {
            OR: [
              {
                citizen_id: String(patientData.citizen_id),
              },
              {
                hn_number: patientData.hn_number,
              },
            ],
          },
        });

        if (existing) continue;

        const hn_number = await generateHN(tx);

        const hashedPassword = await bcrypt.hash(
          String(patientData.citizen_id),
          12,
        );

        const user = await tx.user.create({
          data: {
            name: patientData.name,
            email: patientData.email,
            password: hashedPassword,
            role: constants.ROLES["PATIENT"],
            is_active: false,
          },
        });

        const patient = await tx.patient.create({
          data: {
            user_id: user.id,
            citizen_id: String(patientData.citizen_id),
            hn_number: hn_number,
            phone_no: String(patientData.phone_no),
          },
        });

        await tx.patient_Info.create({
          data: {
            patient_id: patient.id,
            blood_type: constants.BLOOD_TYPES[patientData.blood_type],
            date_of_birth: new Date(patientData.date_of_birth),
            gender: patientData.gender.toUpperCase(),
          },
        });

        results.push({ name: user.name, hn: hn_number });
      }
      return results;
    },
    { timeout: 10000 },
  );
};

const generateHN = async (tx = prisma) => {
  const year = new Date().getFullYear().toString().slice(-2);

  const lastPatient = await tx.patient.findFirst({
    where: { hn_number: { startsWith: `HN${year}` } },
    orderBy: { hn_number: "desc" },
  });

  let sequence = 1;
  if (lastPatient) {
    const lastSequence = parseInt(lastPatient.hn_number.split("-")[1]);
    sequence = lastSequence + 1;
  }

  return `HN${year}-${sequence.toString().padStart(4, "0")}`;
};

module.exports = { registerAPatient, registerBulkPatients };
