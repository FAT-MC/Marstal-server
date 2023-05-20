const express = require('express');
const chatRouter = express.Router();
const chatController = require("./chatController");
const chatMessageController = require("./chatMessageController");

chatRouter.post("/", chatController.createNewChat)
chatRouter.get("/", chatController.getUserChats)
chatRouter.post("/:chatId/messages", chatMessageController.validate(), chatMessageController.sendMessage)
chatRouter.get("/:chatId/messages", chatMessageController.getMessages)

module.exports = chatRouter