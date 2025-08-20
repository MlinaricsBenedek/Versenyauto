import knex, { Knex } from "knex";
import knexfile from './knexfile.js'
const db: Knex = knex(knexfile.development!);

export default db;
