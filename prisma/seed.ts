import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tags = [
    { name: "History" },
    { name: "Food" },
    { name: "Pets" },
    { name: "Health" },
    { name: "Fashios" },
    { name: "Exercise" },
    { name: "Others" },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: tag,
    });
  }

  console.log("✅ Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
