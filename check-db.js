const fs = require("fs");
const path = require("path");

// Load .env file
const envPath = path.join(__dirname, ".env");
const envContent = fs.readFileSync(envPath, "utf-8");
const envLines = envContent.split("\n");
envLines.forEach((line) => {
  if (line && !line.startsWith("#")) {
    const [key, ...valueParts] = line.split("=");
    if (key) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  }
});

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

async function main() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });

  const prisma = new PrismaClient({
    adapter,
  });

  try {
    console.log("\n=== Database Status ===\n");

    const oilCount = await prisma.oil.count();
    console.log(`Oil table: ${oilCount} records`);

    const oilFilterCount = await prisma.oilFilter.count();
    console.log(`OilFilter table: ${oilFilterCount} records`);

    const airFilterCount = await prisma.airFilter.count();
    console.log(`AirFilter table: ${airFilterCount} records`);

    const cabinFilterCount = await prisma.cabinFilter.count();
    console.log(`CabinFilter table: ${cabinFilterCount} records`);

    const fuelFilterCount = await prisma.fuelFilter.count();
    console.log(`FuelFilter table: ${fuelFilterCount} records`);

    const carCount = await prisma.car.count();
    console.log(`Car table: ${carCount} records`);

    const userCount = await prisma.user.count();
    console.log(`User table: ${userCount} records`);

    const sessionCount = await prisma.session.count();
    console.log(`Session table: ${sessionCount} records`);

    // Show sample data from oils table
    console.log("\n=== Sample Oil Data ===\n");
    const oils = await prisma.oil.findMany({ take: 3 });
    console.log(
      JSON.stringify(
        oils,
        (key, value) => {
          if (key === "price") return value.toNumber ? value.toNumber() : value;
          return value;
        },
        2,
      ),
    );
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
