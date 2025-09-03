/** @type { import("knex").Knex.Migration } */
export async function up(knex) {

  await knex.schema.dropTableIfExists("car");
  await knex.schema.createTable("car", (table) => {
    table.increments("id").primary();
    table.string("brand").notNullable();
    table.string("type").notNullable();
    table.integer("horsepower").notNullable();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE"); 
    table.timestamps(true, true);
  });
}

/** @type { import("knex").Knex.Migration } */
export async function down(knex) {
  await knex.schema.dropTableIfExists("car");
}
