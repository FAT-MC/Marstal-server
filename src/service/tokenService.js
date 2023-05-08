const jwt = require('jsonwebtoken');
const appConfig = require("../config");
const { storeRefreshToken, getRefreshToken } = require("../repository/tokenRepository");

const {
  access_token_jwt_secret,
  refresh_token_jwt_secret,
  access_token_jwt_exp,
  refresh_token_jwt_exp
} = appConfig.app;

const getUserOAuthInfo = (oauthAccessToken) => {
  if (!oauthAccessToken) {
    throw new Error("Invalid oatuh access token");
  }

  // decode to get user's email
  const userOAuthInfo = jwt.decode(oauthAccessToken);
  if (!userOAuthInfo.email) {
    throw new Error("Invalid oauth token: no user email found");
  }

  return userOAuthInfo
}

// After successful authentication
const issueTokens = async (user) => {
  const accessToken = jwt.sign({ userId: user.id }, access_token_jwt_secret, { expiresIn: access_token_jwt_exp });
  const refreshToken = jwt.sign({ userId: user.id }, refresh_token_jwt_secret, { expiresIn: refresh_token_jwt_exp });

  // Store refreshToken in the database with user.id and creation time.
  await storeRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken };
}

// When client requests a new access token using a refresh token
const refreshAccessToken = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, appConfig.app.refresh_token_jwt_secret);

  // Check if refreshToken is in the database and not revoked.
  const storedToken = await getRefreshToken(decoded.userId, refreshToken);
  if (!storedToken || storedToken.revoked) {
    throw new Error('Refresh token revoked');
  }

  // Issue a new access token
  const accessToken = jwt.sign({ userId: decoded.userId }, appConfig.app.access_token_jwt_secret, { expiresIn: access_token_jwt_exp });

  return { accessToken };
}

// Revoke a refresh token
async function revokeRefreshToken(refreshToken) {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  // Set "revoked" flag to true in the database for the given refresh token
  await revokeTokenInDatabase(decoded.userId);
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

module.exports = {
  issueTokens,
  getUserOAuthInfo,
  verifyAuthToken,
  refreshAccessToken
}