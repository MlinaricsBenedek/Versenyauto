import knex from "knex";
import path from "path";

import dotenv from "dotenv"
import { fileURLToPath } from "url";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = knex({
  client: "postgresql",
  connection: {
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT!) ,
    database: process.env.DATABASE_NAME!, 
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!
  },
  pool: { min: 2, max: 10 },
  migrations: { tableName: "knex_migrations",directory: path.resolve(__dirname,'migrations')},
});

export default db;