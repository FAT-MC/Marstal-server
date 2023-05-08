const { executeQuery } = require('../db/databaseManager');
const { userQueries } = require('../db/queryMarker');

const createUser = async (user) => {
  const params = [user.name, user.email];
  const result = await executeQuery(userQueries.createUser, params);
  return result[0];
}

const getUserById = async (id) => {
  const params = [id];
  const result = await executeQuery(userQueries.getUserById, params);
  return result[0];
}

const getUserByEmail = async (email) => {
  const params = [email];
  const result = await executeQuery(userQueries.getUserByEmail, params);
  return result[0];
}

const updateUser = async (id, updatedUser) => {
  const params = [updatedUser.name, updatedUser.email, id];
  await executeQuery(userQueries.updateUser, params);
}

const deleteUser = async (id) => {
  const params = [id];
  await executeQuery(userQueries.deleteUser, params);
}

// const createUserWithMetadata = async (user, metadata) => {
//   const userQuery = getUserQuery('CREATE_USER');
//   const metadataQuery = `INSERT INTO user_metadata (user_id, key, value) VALUES ($1, $2, $3)`;

//   return await DatabaseManager.executeTransaction(async (client) => {
//     const userResult = await client.query(userQuery, [user.name, user.email]);
//     const userId = userResult.rows[0].id;

//     const metadataPromises = metadata.map((item) =>
//       client.query(metadataQuery, [userId, item.key, item.value])
//     );
//     await Promise.all(metadataPromises);

//     return userId;
//   });
// }

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail
}
