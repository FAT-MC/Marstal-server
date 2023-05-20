const { createChat, getChatsByUserId, getChatById } = require('../repository/chatRepository');

const initializeNewChat = async (topic, userId) => {
  if (!userId) {
    throw new Error("Invalid User ID");
  }

  return await createChat(topic, userId)
}

const retriveAllUserChats = async (userId) => {
  if (!userId) {
    throw new Error("Invalid User ID");
  }

  return await getChatsByUserId(userId)
}

module.exports = {
  initializeNewChat,
  retriveAllUserChats
}