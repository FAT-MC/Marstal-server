const { validationResult, body, query } = require("express-validator");
const { blacklistUser, removeFromBlacklist } = require("../service/authService");

const blackListUserWithToken = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const { auth_token } = req.body;
  try {
    const blacklistedUserEmail = await blacklistUser(auth_token);
    res.status(200).json({
      message: "Blacklisted successful",
      email: blacklistedUserEmail
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

const removeBlacklistUser = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const userEmail = req.query["email"];
  try {
    await removeFromBlacklist(userEmail)
    res.status(200).json({
      message: "Remove from blacklist successful",
      email: userEmail
    })
  } catch (error) {
    res.status(404).json({
      error: error.message
    })
  }
}

const validatePayload = () => {
  return [
    body("auth_token")
      .exists()
      .bail()
      .isJWT()
      .bail()
  ]
}

const validateQuery = () => {
  return [
    query("email")
      .exists()
      .bail()
      .isEmail()
      .bail()
  ]
}

module.exports = {
  blackListUserWithToken,
  validatePayload,
  validateQuery,
  removeBlacklistUser
}