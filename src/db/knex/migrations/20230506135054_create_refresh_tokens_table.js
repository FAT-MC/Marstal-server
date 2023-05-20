/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('refresh_tokens', (refresh_tokens_table) => {
    refresh_tokens_table.increments('id').primary();
    refresh_tokens_table.integer('user_id').notNullable().unsigned().references('id').inTable('users');
    refresh_tokens_table.string('token').notNullable();
    refresh_tokens_table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    refresh_tokens_table.boolean('revoked').defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('refresh_tokens');
};
