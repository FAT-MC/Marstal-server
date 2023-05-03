const jwt = require('jsonwebtoken');
const { getValue, setValue, removeKey } = require("../utils/memStore");
const appConfig = require("../config");

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

  // TODO: check for blacklisted email
  const isBlacklisted = await checkIfBlacklisted(email);
  if (isBlacklisted) {
    throw new Error("Blacklisted user, Exiting...")
  }

  console.log("new user. Generating token...")
  // otherwise generate a JWT token based on user's oauth token
  const newToken = jwt.sign({ oauthAccessToken: oauthAccessToken }, appConfig.app.jwt_key);

  // store the token in redis in two {token : email}, and {email : token} pairs
  await setValue(email, newToken); // {email : token} is for returning existing token for the same user if they use the email login on multiple devices
  await setValue(newToken, email); //  {token : email} is for registering the token so that we know it's whitelisted. We could black it by remove the token and the email key as well so that the user don't be able to login with the same email

  return newToken
}

const removeFromBlacklist = async (userEmail) => {
  if (!userEmail) {
    throw new Error("Invalid user email to remove from blacklist")
  }

  let blackListStr = await getValue("black_list");

  if (!blackListStr) {
    throw new Error("No blacklist found")
  }

  try {
    const blackList = JSON.parse(blackListStr);
    if (!blackList.includes(userEmail)) {
      throw new Error("User not in blacklist")
    }

    const updatedBlacklist = blackList.filter((email) => email !== userEmail);
    await setValue("black_list", JSON.stringify(updatedBlacklist));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const blacklistUser = async (token) => {
  if (!token) {
    throw new Error("Invalid user token for blacklisting");
  }

  // get user's email
  const userEmail = await getValue(token);
  if (!userEmail) {
    throw new Error(`user doesn't exist`)
  }

  await removeKey(token); // remove the token from registration
  await removeKey(userEmail) // remove user email from existing token tracking

  let blackListStr = await getValue("black_list");
  let blackList;

  if (blackListStr) {
    // add user email to black list 
    try {
      blackList = JSON.parse(blackListStr);
    } catch (error) {
      console.error(error);
    }
  } else {
    // create black list
    blackList = [];
  }

  blackList.push(userEmail);
  await setValue("black_list", JSON.stringify(blackList));

  return userEmail;
}

const checkIfBlacklisted = async (userEmail) => {
  if (!userEmail) { return false }

  let blackListStr = await getValue("black_list");

  if (!blackListStr) { return false }

  try {
    const blackList = JSON.parse(blackListStr);
    return blackList.includes(userEmail);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  exchangeToken,
  blacklistUser,
  removeFromBlacklist
}