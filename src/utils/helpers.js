const jwt = require('jsonwebtoken');
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
    await verifyAuthToken(token);
    next()
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

const verifyAuthToken = async (token) => {
  const userEmail = await getValue(token); // check if token is still in the registration

  if (!token || !userEmail) {
    throw new Error("Unauthorized")
  }

  try {
    return jwt.verify(token, appConfig.app.jwt_key);
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

module.exports = {
  checkAuth,
  verifyAuthToken,
  checkAdmin
}