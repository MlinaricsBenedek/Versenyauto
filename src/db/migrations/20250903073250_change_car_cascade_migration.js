/** @type { import("knex").Knex.Migration } */
export async function up(knex) {
  // Eldobjuk a car táblát
  await knex.schema.dropTableIfExists("car");

  // Újra létrehozzuk a helyes kapcsolattal
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
      .onDelete("CASCADE"); // ha user törlődik → autók is törlődnek

    table.timestamps(true, true);
  });
}

/** @type { import("knex").Knex.Migration } */
export async function down(knex) {
  // rollback: töröljük a car táblát
  await knex.schema.dropTableIfExists("car");

  // visszaállítjuk a régi változattal (NO ACTION)
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
