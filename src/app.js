const express = require('express');
const app = express();
const rootRouter = express.Router();
const apiRouter = require("./api");

// Import middleware
const setupMiddleware = require('./middleware');

// Call middleware function with the app instance
setupMiddleware(app);

// setup API routes
rootRouter.use("/api", apiRouter);
app.use(rootRouter);

// setup Auth route

module.exports = app