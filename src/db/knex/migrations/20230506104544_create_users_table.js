/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (usersTable) => {
      usersTable.increments("id").primary();
      usersTable.string("email").notNullable().unique();
      usersTable.string("username").notNullable().unique();
      usersTable.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
