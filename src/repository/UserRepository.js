// UserRepository.js
const DatabaseManager = require('../db/DatabaseManager');
const { userQueries } = require('../db/queryMarker');

class UserRepository {
  async createUser(user) {
    const params = [user.name, user.email];
    const result = await DatabaseManager.executeQuery(userQueries.createUser, params);
    return result[0].id;
  }

  async getUserById(id) {
    const params = [id];
    const result = await DatabaseManager.executeQuery(userQueries.getUserById, params);
    return result[0];
  }

  async updateUser(id, updatedUser) {
    const params = [updatedUser.name, updatedUser.email, id];
    await DatabaseManager.executeQuery(userQueries.updateUser, params);
  }

  async deleteUser(id) {
    const params = [id];
    await DatabaseManager.executeQuery(userQueries.deleteUser, params);
  }
}

module.exports = new UserRepository();
