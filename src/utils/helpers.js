const jwt = require('jsonwebtoken');
const { getValue } = require("./memStore");
const appConfig = require("../config");

const checkAuth = async (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  const userEmail = await getValue(token); // do so that we then check if the token is still valid (still exist in our cache)

  // Verify the token
  if (!token || !userEmail) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Decode the token using the secret key
    const decoded = jwt.verify(token, appConfig.app.jwt_key);

    // Add the decoded token to the request object
    req.user = decoded;

    next();
  } catch (err) {
    // If the token is invalid, send a 401 Unauthorized response
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = {
  checkAuth
}