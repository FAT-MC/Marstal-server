const express = require('express')
const authRouter = express.Router()
const authController = require("./authController");

authRouter.post("/", authController.validate(), authController.loginWithOAuthAccessToken)

module.exports = authRouter