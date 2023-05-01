const { Configuration, OpenAIApi } = require("openai");
const HttpsProxyAgent = require('https-proxy-agent');
const appConfig = require("../config");

const configuration = new Configuration({
  apiKey: appConfig.app.openAIAPIKey
});

const openai = new OpenAIApi(configuration);

const getAIResponse = async (message) => {
  const proxy = appConfig.app.proxy ? {
    proxy: false,
    httpAgent: HttpsProxyAgent(appConfig.app.proxy),
    httpsAgent: HttpsProxyAgent(appConfig.app.proxy)
  } : null;

  const completion = await openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    },
    proxy
  );
  return completion.data.choices[0].message.content
}

module.exports = {
  getAIResponse
}