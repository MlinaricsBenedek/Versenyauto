/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('car', table => {
    table.increments('id');
    table.string("brand").notNullable();
    table.string("type").notNullable();
    table.integer("horsepower").notNullable();
    table.integer("user_id").unsigned().references("id").inTable("user").onDelete("NO ACTION");
    table.timestamps(true, true);
  });

  await knex.schema.createTable('racetrack', table => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('country').notNullable();
    table.integer('kilometer').notNullable();
    table.timestamps(true, true);
  });
 
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('car');
  await knex.schema.dropTableIfExists('racetrack');
}
