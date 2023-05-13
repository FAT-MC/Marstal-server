const { executeQuery } = require('../db/databaseManager');
const { chatQueries } = require('../db/queryMarker');

const createChat = async (topic, userId) => {
  const params = [topic, userId];
  const result = await executeQuery(chatQueries.createChat, params);
  return result[0];
}

const getChatsByUserId = async (userId) => {
  const params = [userId];
  const result = await executeQuery(chatQueries.getChatsByUserId, params);
  return result;
}

const getChatById = async (chatId) => {
  const params = [chatId];
  const result = await executeQuery(chatQueries.getChatById, params);
  return result[0];
}

module.exports = {
  createChat,
  getChatsByUserId,
  getChatById
}