const jwt = require('jsonwebtoken');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const { getValue } = require("./memStore");
const appConfig = require("../config");

const checkAuth = async (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers.authorization;

  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  try {
    verifyAuthToken(token);
    next()
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

const verifyAuthToken = (token) => {
  if (!token) {
    throw new Error("Unauthorized")
  }

  try {
    return jwt.verify(token, appConfig.app.access_token_jwt_secret);
  } catch (err) {
    throw new Error("Unauthorized")
  }
}

const checkAdmin = async (req, res, next) => {
  const adminKey = req.headers["admin_key"];

  if (!adminKey || adminKey !== appConfig.app.admin_key) {
    return res.status(401).json({ error: "Invalid admin key" });
  }

  next()
}

const generateRandomName = () => {
  return uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
}

module.exports = {
  checkAuth,
  verifyAuthToken,
  checkAdmin,
  generateRandomName
}