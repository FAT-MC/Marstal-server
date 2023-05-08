module.exports = {
  userQueries: {
    createUser: `INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id`,
    getUserById: `SELECT * FROM users WHERE id = $1`,
    getUserByEmail: `SELECT * FROM users WHERE email = $1`,
    updateUser: `UPDATE users SET name = $1, email = $2 WHERE id = $3`,
    deleteUser: `DELETE FROM users WHERE id = $1`,
  },
  refreshTokenQueries: {
    createToken: `INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)`,
    getToken: `SELECT * FROM refresh_tokens WHERE user_id = $1 AND token = $2`,
  }
}