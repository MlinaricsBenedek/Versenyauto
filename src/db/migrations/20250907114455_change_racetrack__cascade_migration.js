/** @type { import("knex").Knex.Migration } */
export async function up(knex) {
  await knex.schema.dropTableIfExists("racetrack");
  await knex.schema.createTable("racetrack", (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('country').notNullable();
    table.integer('kilometer').notNullable();
    table.timestamps(true, true);

    table
      .integer("owner_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE"); 

  });
}

/** @type { import("knex").Knex.Migration } */
export async function down(knex) {
  await knex.schema.dropTableIfExists("racetrack");
}
