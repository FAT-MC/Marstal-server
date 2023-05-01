const { body, validationResult } = require("express-validator");
const { exchangeToken } = require("../service/TokenService");

const loginWithOAuthAccessToken = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const oauthAccessToken = req.body.access_token;

  try {
    const exchangedToken = await exchangeToken(oauthAccessToken);
    return res.status(200).json({
      message: "Login successful",
      auth_token: exchangedToken
    });
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const validate = () => {
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

module.exports = {
  loginWithOAuthAccessToken,
  validate
}