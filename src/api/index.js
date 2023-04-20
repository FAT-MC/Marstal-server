const express = require('express')
const apiRouter = express.Router()

apiRouter.use("/chat", require("./chat"))

module.exports = apiRouter