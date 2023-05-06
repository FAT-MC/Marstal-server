const express = require('express');
const utilityRouter = express.Router();
const utilityController = require("./utilityController");

utilityRouter.post("/blacklist", utilityController.validatePayload(), utilityController.blackListUserWithToken)
utilityRouter.delete("/blacklist", utilityController.validateQuery(), utilityController.removeBlacklistUser)

module.exports = utilityRouter