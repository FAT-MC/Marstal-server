const express = require('express');
const chatRouter = express.Router();
const chatController = require("./chatController");

chatRouter.post("/", chatController.chatWithMessage)

module.exports = chatRouter