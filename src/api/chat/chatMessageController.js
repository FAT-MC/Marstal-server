const { body, validationResult } = require("express-validator");
const { postMessage, retriveChatMessages } = require("../../service/chatMessageService");


const sendMessage = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const message = req.body.message;
  const chatId = req.params.chatId;
  const audio = req.query.audio;

  if (!chatId) {
    return res.status(400).send({ errors: "Invalid chat id" });
  }

  try {
    const messageResponse = await postMessage(chatId, message, audio);
    return res.status(201).json(messageResponse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getMessages = async (req, res) => {
  const chatId = req.params.chatId;

  if (!chatId) {
    return res.status(400).send({ errors: "Invalid chat id" });
  }

  try {
    const chatMessages = await retriveChatMessages(chatId);
    return res.status(200).json(chatMessages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const validate = () => {
  return [
    body("message")
      .exists()
      .bail()
      .notEmpty()
      .bail()
      .withMessage("Error: Empty chat message")
      .isString()
      .bail()
      .withMessage("Error: Invalid chat message")
  ]
}

module.exports = {
  getMessages,
  sendMessage,
  validate
}