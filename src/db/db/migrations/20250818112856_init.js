
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user',table =>{
    table.increments('id');
    table.string("email").notNullable().unique();
    table.string("name").notNullable();
    table.string("password").notNullable();
    table.string("role");
    table.timestamps(true,true);

})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
