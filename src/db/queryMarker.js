module.exports = {
  userQueries: {
    createUser: `INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *`,
    getUserById: `SELECT * FROM users WHERE id = $1`,
    getUserByEmail: `SELECT * FROM users WHERE email = $1`,
    updateUser: `UPDATE users SET name = $1, email = $2 WHERE id = $3`,
    deleteUser: `DELETE FROM users WHERE id = $1`,
  },
  refreshTokenQueries: {
    createToken: `INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)`,
    getToken: `SELECT * FROM refresh_tokens WHERE user_id = $1 AND token = $2`,
  },
  chatQueries: {
    createChat: `INSERT INTO chats (topic, user_id) VALUES ($1, $2) RETURNING *`,
    getChatsByUserId: `SELECT * FROM chats WHERE user_id = $1`,
    getChatById: `SELECT * FROM chats WHERE id = $1`
  },
  chatMessageQueries: {
    createMessage: `INSERT INTO chat_messages (role, content, chat_id) VALUES ($1, $2, $3) RETURNING *`,
    getMessagesByChatId: `SELECT * FROM chat_messages WHERE chat_id = $1`,
    getMessageById: `SELECT * FROM chat_messages WHERE id = $1`
  }
}