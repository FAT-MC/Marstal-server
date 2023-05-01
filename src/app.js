const express = require('express');
const { createServer } = require('http');
const apiRouter = require("./api");
const socketService = require("../src/service/socketService")
const { configureStore } = require("./utils/memStore");

const app = express();
const httpServer = createServer(app);
const rootRouter = express.Router();

// Import middleware
const setupMiddleware = require('./middleware');

// Call middleware function with the app instance
setupMiddleware(app);

// setup API routes
rootRouter.use("/api", apiRouter);
app.use(rootRouter);

// setup Auth route

// config socket server
socketService.configSocket(httpServer);

configureStore();

module.exports = httpServer