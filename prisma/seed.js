const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const env = require("../src/config/env");

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Start seeding...");

  // 1. Seed Specializations
  const specializations = [
    { name: "Cardiology" },
    { name: "Neurology" },
    { name: "Pediatrics" },
    { name: "Oncology" },
    { name: "Dermatology" },
  ];

  for (const s of specializations) {
    await prisma.specialization.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
  }
  console.log(`✅ Seeded ${specializations.length} specializations`);

  // 2. Seed Departments
  const departments = [
    { name: "General Surgery", description: "Main surgical department" },
    { name: "Emergency Room", description: "24/7 Acute care" },
    { name: "Outpatient Clinic", description: "Routine checkups" },
  ];

  for (const d of departments) {
    await prisma.department.upsert({
      where: { name: d.name },
      update: {},
      create: d,
    });
  }
  console.log(`✅ Seeded ${departments.length} departments`);

  console.log("🎉 Seeding finished.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
