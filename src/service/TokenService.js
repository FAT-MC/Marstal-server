const jwt = require('jsonwebtoken');
const { getValue, setValue } = require("../utils/memStore");

const exchangeToken = async (oauthAccessToken) => {
  if (!oauthAccessToken) {
    throw new Error("Invalid oatuh access token");
  }

  // decode to get user's email
  const { email } = jwt.decode(oauthAccessToken);
  if (!email) {
    throw new Error("Invalid oauth token: no user email found")
  }

  // if there exist a token for the email user, return it
  const existingToken = await getValue(email);
  if (existingToken) {
    console.log("existing user. Retrieving token...")
    return existingToken;
  }

  console.log("new user. Generating token...")
  // otherwise generate a JWT token based on user's oauth token
  const newToken = jwt.sign({ oauthAccessToken: oauthAccessToken }, process.env.JWT_KEY);

  // store the token in redis in two {token : email}, and {email : token} pairs
  await setValue(email, newToken);
  await setValue(newToken, email);

  return newToken
}

module.exports = {
  exchangeToken
}