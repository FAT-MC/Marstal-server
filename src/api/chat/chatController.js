const { body, validationResult } = require("express-validator");
const { initializeNewChat, retriveAllUserChats } = require("../../service/chatService");
const { generateRandomName } = require("../../utils/helpers");

const createNewChat = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const userId = req.userId;

  try {
    const newChatId = await initializeNewChat(generateRandomName(), userId);
    return res.status(201).json(newChatId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getUserChats = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const userId = req.userId;

  try {
    const userChats = await retriveAllUserChats(userId);
    return res.status(200).json(userChats);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createNewChat,
  getUserChats
}