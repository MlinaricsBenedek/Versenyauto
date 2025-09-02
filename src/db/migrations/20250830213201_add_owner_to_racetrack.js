/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
await knex.schema.alterTable('racetrack', table => {
    table.integer("owner_id")
         .unsigned()
         .references("id")
         .inTable("user")
         .onDelete("NO ACTION");
  })};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('racetrack');
}
