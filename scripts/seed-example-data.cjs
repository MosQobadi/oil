const fs = require("node:fs");
const path = require("node:path");
const { scryptSync } = require("node:crypto");
const { Prisma, PrismaClient } = require("@prisma/client");
const { PrismaNeon } = require("@prisma/adapter-neon");

function loadEnvFile(fileName) {
  const filePath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([^#][^=]+)=(.*)$/);
    if (!match) continue;

    const key = match[1].trim();
    let value = match[2].trim();
    value = value.replace(/^["']|["']$/g, "");
    process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set.");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }),
});

const brands = [
  "Apex",
  "Mobil",
  "Castrol",
  "Shell",
  "Total",
  "Liqui Moly",
  "Valvoline",
  "Motul",
  "Elf",
  "Pennzoil",
];

const carRows = [
  ["Toyota", "Corolla", 2015, "1.6L"],
  ["Honda", "Civic", 2016, "2.0L"],
  ["Ford", "Mustang", 2017, "5.0L"],
  ["Tesla", "Model 3", 2018, "EV"],
  ["Hyundai", "Tucson", 2019, "2.0L"],
  ["Kia", "Sportage", 2020, "2.4L"],
  ["Nissan", "Altima", 2021, "2.5L"],
  ["Mazda", "CX-5", 2022, "2.5L"],
  ["Chevrolet", "Camaro", 2023, "3.6L"],
  ["Audi", "A4", 2024, "2.0L"],
];

function productRows(namePrefix, description, startIndex, count) {
  return Array.from({ length: count }, (_, offset) => {
    const index = startIndex + offset;
    const brand = brands[(index - 1) % brands.length];

    return {
      brand,
      name: `${namePrefix} ${index}`,
      model: `Model ${String.fromCharCode(64 + ((index - 1) % 26) + 1)}`,
      price: new Prisma.Decimal(12.5 + index * 3),
      badge: index % 3 === 0 ? "Popular" : null,
      description,
      isActive: true,
    };
  });
}

function examplePasswordHash(index) {
  const salt = `example-seed-salt-${index}`;
  const key = scryptSync("Password123!", salt, 64);

  return `${salt}:${key.toString("hex")}`;
}

async function resetSequences() {
  for (const table of [
    "Car",
    "Oil",
    "OilFilter",
    "AirFilter",
    "CabinFilter",
    "FuelFilter",
    "User",
    "Session",
  ]) {
    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), COALESCE((SELECT MAX("id") FROM "${table}"), 1), true)`,
    );
  }
}

async function topUp(model, countFn, createRows, target = 10) {
  const existing = await countFn();
  const missing = Math.max(target - existing, 0);
  if (missing === 0) return existing;

  await model.createMany({ data: createRows(existing + 1, missing) });
  return target;
}

async function main() {
  await resetSequences();

  await topUp(
    prisma.car,
    () => prisma.car.count({ where: { description: "Example car for local testing." } }),
    (start, count) =>
      carRows.slice(start - 1, start - 1 + count).map(([brand, model, year, engine]) => ({
        brand,
        model,
        year,
        engine,
        description: "Example car for local testing.",
      })),
  );

  await topUp(
    prisma.oil,
    () => prisma.oil.count({ where: { description: "Example oil for local testing." } }),
    (start, count) =>
      productRows("Oil", "Example oil for local testing.", start, count).map((row) => ({
        ...row,
        replacementId: null,
      })),
  );

  await topUp(
    prisma.oilFilter,
    () => prisma.oilFilter.count({ where: { description: "Example oil filter for local testing." } }),
    (start, count) => productRows("Oil Filter", "Example oil filter for local testing.", start, count),
  );

  await topUp(
    prisma.airFilter,
    () => prisma.airFilter.count({ where: { description: "Example air filter for local testing." } }),
    (start, count) => productRows("Air Filter", "Example air filter for local testing.", start, count),
  );

  await topUp(
    prisma.cabinFilter,
    () => prisma.cabinFilter.count({ where: { description: "Example cabin filter for local testing." } }),
    (start, count) => productRows("Cabin Filter", "Example cabin filter for local testing.", start, count),
  );

  await topUp(
    prisma.fuelFilter,
    () => prisma.fuelFilter.count({ where: { description: "Example fuel filter for local testing." } }),
    (start, count) => productRows("Fuel Filter", "Example fuel filter for local testing.", start, count),
  );

  for (let index = 1; index <= 10; index += 1) {
    await prisma.user.upsert({
      where: { email: `example${index}@local.test` },
      create: {
        email: `example${index}@local.test`,
        name: `Example User ${index}`,
        passwordHash: examplePasswordHash(index),
        role: index === 1 ? "ADMIN" : "USER",
      },
      update: {
        name: `Example User ${index}`,
        passwordHash: examplePasswordHash(index),
        role: index === 1 ? "ADMIN" : "USER",
      },
    });
  }

  const users = await prisma.user.findMany({
    where: { email: { startsWith: "example", endsWith: "@local.test" } },
    orderBy: { id: "asc" },
    take: 10,
  });

  for (let index = 0; index < users.length; index += 1) {
    await prisma.session.upsert({
      where: { tokenHash: `example-session-token-hash-${index + 1}` },
      update: {
        userId: users[index].id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      create: {
        tokenHash: `example-session-token-hash-${index + 1}`,
        userId: users[index].id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  await resetSequences();

  const counts = {
    exampleCars: await prisma.car.count({ where: { description: "Example car for local testing." } }),
    exampleOils: await prisma.oil.count({ where: { description: "Example oil for local testing." } }),
    exampleOilFilters: await prisma.oilFilter.count({ where: { description: "Example oil filter for local testing." } }),
    exampleAirFilters: await prisma.airFilter.count({ where: { description: "Example air filter for local testing." } }),
    exampleCabinFilters: await prisma.cabinFilter.count({ where: { description: "Example cabin filter for local testing." } }),
    exampleFuelFilters: await prisma.fuelFilter.count({ where: { description: "Example fuel filter for local testing." } }),
    exampleUsers: await prisma.user.count({ where: { email: { startsWith: "example", endsWith: "@local.test" } } }),
    exampleSessions: await prisma.session.count({ where: { tokenHash: { startsWith: "example-session-token-hash-" } } }),
  };

  console.log(JSON.stringify(counts, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
