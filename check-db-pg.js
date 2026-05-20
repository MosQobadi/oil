// const fs = require("fs");
// const path = require("path");

// // Load .env file
// const envPath = path.join(__dirname, ".env");
// const envContent = fs.readFileSync(envPath, "utf-8");
// const envLines = envContent.split("\n");
// envLines.forEach((line) => {
//   if (line && !line.startsWith("#")) {
//     const [key, ...valueParts] = line.split("=");
//     if (key) {
//       process.env[key.trim()] = valueParts.join("=").trim();
//     }
//   }
// });

// // Manual PostgreSQL connection test
// const { Client } = require("pg");

// async function main() {
//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//   });

//   try {
//     await client.connect();
//     console.log("\n=== Database Status ===\n");

//     // Get table information
//     const result = await client.query(`
//       SELECT table_name
//       FROM information_schema.tables
//       WHERE table_schema = 'public'
//       ORDER BY table_name;
//     `);

//     console.log("Tables in database:\n");
//     result.rows.forEach((row) => {
//       console.log(`  - ${row.table_name}`);
//     });

//     // Get row counts for each table
//     console.log("\n=== Record Counts ===\n");

//     const tables = result.rows.map((r) => r.table_name);
//     for (const table of tables) {
//       if (table !== "_prisma_migrations") {
//         const countResult = await client.query(
//           `SELECT COUNT(*) FROM "${table}";`,
//         );
//         console.log(`${table}: ${countResult.rows[0].count} records`);
//       }
//     }

//     // Show Oil schema details
//     console.log("\n=== Oil Table Structure ===\n");
//     const columnResult = await client.query(`
//       SELECT column_name, data_type, is_nullable, column_default
//       FROM information_schema.columns
//       WHERE table_name = 'Oil'
//       ORDER BY ordinal_position;
//     `);

//     columnResult.rows.forEach((col) => {
//       console.log(
//         `  ${col.column_name}: ${col.data_type}${col.is_nullable === "NO" ? " NOT NULL" : ""}${col.column_default ? ` DEFAULT ${col.column_default}` : ""}`,
//       );
//     });

//     // Show sample Oil data
//     console.log("\n=== Sample Oil Data ===\n");
//     const oilResult = await client.query(`SELECT * FROM "Oil" LIMIT 3;`);
//     console.log(JSON.stringify(oilResult.rows, null, 2));
//   } catch (error) {
//     console.error("Error:", error.message);
//   } finally {
//     await client.end();
//   }
// }

// main();
