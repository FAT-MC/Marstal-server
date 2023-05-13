const express = require('express');
const cors = require('cors');
const appConfig = require("../config");
const { verifyAuthToken } = require('../service/tokenService');

const validateClient = (req, res, next) => {
  const client_id = req.headers["client_id"];

  if (!client_id || !appConfig.app.client_ids.includes(client_id)) {
    return res.status(401).json({ error: "Invalid Client ID" });
  }

  next()
}

const setupAppMiddlewares = (app) => {
  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Middleware to log requests and potentially response to the console

  // Middleware to configure CORS
  app.use(cors({
    origin: "*"
  }));

  // Middleware to validate client
  app.use(validateClient)
}

const checkAuth = async (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers.authorization;

  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  try {
    const decoded = verifyAuthToken(token);
    req.userId = decoded.userId;
    next()
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

const checkAdmin = async (req, res, next) => {
  const adminKey = req.headers["admin_key"];

  if (!adminKey || adminKey !== appConfig.app.admin_key) {
    return res.status(401).json({ error: "Invalid admin key" });
  }

  next()
}

module.exports = {
  setupAppMiddlewares,
  validateClient,
  checkAuth,
  checkAdmin
}