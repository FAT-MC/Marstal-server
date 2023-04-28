const express = require('express');
const cors = require('cors');

module.exports = function (app) {
  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Middleware to log requests and potentially response to the console

  // Middleware to configure CORS
  app.use(cors({
    origin: "*"
  }));
  // Middleware to validate Authentication
}