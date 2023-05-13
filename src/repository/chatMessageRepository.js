const { executeQuery } = require('../db/databaseManager');
const { chatMessageQueries } = require('../db/queryMarker');

const createMessage = async (role, message, chatId) => {
  const params = [role, message, chatId];
  const result = await executeQuery(chatMessageQueries.createMessage, params);
  return result[0];
}

const getMessagesByChatId = async (chatId) => {
  const params = [chatId];
  const result = await executeQuery(chatMessageQueries.getMessagesByChatId, params);
  return result;
}

const getMessageById = async (messageId) => {
  const params = [messageId];
  const result = await executeQuery(chatMessageQueries.getMessageById, params);
  return result[0];
}

module.exports = {
  createMessage,
  getMessagesByChatId,
  getMessageById
}