const express = require('express');
const cors = require('cors');
const appConfig = require("../config");

const validateClient = (req, res, next) => {
  const client_id = req.headers["client_id"];

  if (!client_id || !appConfig.app.client_ids.includes(client_id)) {
    return res.status(401).json({ error: "Invalid Client ID" });
  }

  next()
}

module.exports = function (app) {
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