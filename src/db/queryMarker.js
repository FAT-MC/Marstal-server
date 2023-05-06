module.exports = {
  userQueries: {
    createUser: `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id`,
    getUserById: `SELECT * FROM users WHERE id = $1`,
    updateUser: `UPDATE users SET name = $1, email = $2 WHERE id = $3`,
    deleteUser: `DELETE FROM users WHERE id = $1`,
  }
}