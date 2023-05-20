const express = require('express')
const apiRouter = express.Router()

apiRouter.use("/chats", require("./chat"))

module.exports = apiRouter