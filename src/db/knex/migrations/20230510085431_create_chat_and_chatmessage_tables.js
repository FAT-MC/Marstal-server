/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("chats", (chatsTable) => {
      chatsTable.increments("id").primary();
      chatsTable.string("topic").notNullable();
      chatsTable.timestamps(true, true);
      chatsTable.integer("user_id").notNullable().unsigned().references("id").inTable("users");
    })
    .createTable("chat_messages", (chatMessagesTable) => {
      chatMessagesTable.increments("id").primary();
      chatMessagesTable.string("role").notNullable();
      chatMessagesTable.text("content").notNullable();
      chatMessagesTable.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      chatMessagesTable.integer("chat_id").notNullable().unsigned().references("id").inTable("chats");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('chat_messages')
    .dropTableIfExists('chats')
};
