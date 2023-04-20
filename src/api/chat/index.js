const express = require('express');
const apiRouter = express.Router();
const chatController = require("./chatController");

apiRouter.post("/", chatController.sendMessage)

module.exports = apiRouter