/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // először töröljük az adatokat
  await knex('car').del();
  await knex('user').del();

  // enum létrehozása, ha még nem létezik
  await knex.schema.raw(`
    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_enum') THEN
            CREATE TYPE role_enum AS ENUM ('versenyzo', 'versenyiranyito');
        END IF;
    END$$;
  `);

  // user tábla módosítása
  await knex.schema.alterTable('user', table => {
    table.specificType('role', 'role_enum').notNullable().defaultTo('versenyzo').alter();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('user');
  await knex.schema.raw(`DROP TYPE IF EXISTS role_enum;`);
}
