const express = require('express');
const knexConfig = require("./db/knex/knexfile");
const knex = require('knex')(knexConfig);
const { createServer } = require('http');
const apiRouter = require("./api");
const authRouter = require("./auth");
const utilityRouter = require("./utility");
const socketService = require("../src/service/socketService");
const { configureStore } = require("./utils/memStore");
const { checkAuth, checkAdmin } = require("./utils/helpers");

const app = express();
const httpServer = createServer(app);
const rootRouter = express.Router();

// Import middleware
const setupMiddleware = require('./middleware');

// Call middleware function with the app instance
setupMiddleware(app);

// setup routes
rootRouter.use("/api", checkAuth, apiRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/utility", checkAdmin, utilityRouter);
app.use(rootRouter);

// config socket server
socketService.configSocket(httpServer);

configureStore();

// run DB migration
knex.migrate.latest()
  .then(() => {
    console.log('Migrations applied successfully');
  })
  .catch((error) => {
    console.error('Error applying migrations:', error);
  });

module.exports = httpServer