import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv a projekt gyökere alapján
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const config = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds")
    }
  }
};

export default config;
