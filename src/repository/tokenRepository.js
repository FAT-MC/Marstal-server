const { executeQuery } = require('../db/databaseManager');
const { refreshTokenQueries } = require('../db/queryMarker');

const storeRefreshToken = async (userId, refreshToken) => {
  const params = [userId, refreshToken];
  const result = await executeQuery(refreshTokenQueries.createToken, params);
  return result[0];
}

const getRefreshToken = async (userId, refreshToken) => {
  const params = [userId, refreshToken];
  const result = await executeQuery(refreshTokenQueries.getToken, params);
  return result[0];
}

module.exports = {
  storeRefreshToken,
  getRefreshToken
}