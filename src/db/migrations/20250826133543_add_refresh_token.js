
export async function up(knex) {
  await knex.schema.table('user', table => {
    //table.string('refreshToken').nullable();
  })};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('user');

}
