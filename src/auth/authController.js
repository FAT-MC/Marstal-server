const { body, validationResult } = require("express-validator");
const { getUserByEmail, createUser } = require("../repository/userRepository");
const { generateRandomName } = require("../utils/helpers");
const { issueTokens, getUserOAuthInfo, refreshAccessToken } = require("../service/tokenService");

const loginWithOAuthAccessToken = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const oauthAccessToken = req.body.access_token;

  try {
    const userOAuthInfo = getUserOAuthInfo(oauthAccessToken);
    let user = await getUserByEmail(userOAuthInfo.email);

    if (!user) {
      if (!userOAuthInfo.name) {
        userOAuthInfo.name = generateRandomName();
      }

      user = await createUser(userOAuthInfo); // partial user data => { id: xxx }
      console.log(`New user ${userOAuthInfo.name} created`);
    }

    const tokens = await issueTokens(user);

    return res.status(200).json({
      message: "Login successful",
      tokens
    });
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const refreshToken = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const refreshToken = req.body.refresh_token;

  try {
    const newAccessToken = await refreshAccessToken(refreshToken);
    return res.status(200).json(newAccessToken);
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const validateLoginPayload = () => {
  return [
    body("access_token")
      .exists()
      .bail()
      .withMessage("Error: Empty login payload")
      .isJWT()
      .bail()
      .withMessage("Error: Invalid login payload")
  ]
}

const validateRefreshTokenPayload = () => {
  return [
    body("refresh_token")
      .exists()
      .bail()
      .withMessage("Error: Empty refresh access token payload")
      .isJWT()
      .bail()
      .withMessage("Error: Invalid refresh access token payload")
  ]
}

module.exports = {
  loginWithOAuthAccessToken,
  refreshToken,
  validateLoginPayload,
  validateRefreshTokenPayload
}