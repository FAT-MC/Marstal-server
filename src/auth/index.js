const express = require('express')
const authRouter = express.Router()
const authController = require("./authController");

authRouter.post("/", authController.validateLoginPayload(), authController.loginWithOAuthAccessToken)
authRouter.post("/refresh-token", authController.validateRefreshTokenPayload(), authController.refreshToken)

module.exports = authRouter