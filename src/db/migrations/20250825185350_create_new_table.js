export async function up(knex) {
  await knex.schema.createTable('user', table => {
    table.increments('id');
    table.string("email").notNullable().unique();
    table.string("name").notNullable();
    table.string("password").notNullable();
    table.string("role");
    table.string("refreshToken")
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('user');
}