const { createClient } = require('redis');

let client = null;

const configureStore = async () => {
  client = createClient();

  client.on("error", (error) => {
    console.error(error);
  });

  client.on("connect", function () {
    console.log("Connected to Redis server");
  });

  client.on("end", function () {
    console.log("Disconnected from Redis server");
  });

  await client.connect()
}

const setValue = async (key, value) => {
  if (!client) return

  try {
    await client.set(key, value);
  } catch (error) {
    console.error(error);
  }
}

const getValue = async (key) => {
  if (!client || !key) return null;

  try {
    return await client.get(key);
  } catch (error) {
    console.error(error)
    return null;
  }
}

const removeKey = async (key) => {
  if (!client || !key) return

  try {
    await client.del(key);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  configureStore,
  setValue,
  getValue,
  removeKey
}


