const { Configuration, OpenAIApi } = require("openai");
const HttpsProxyAgent = require('https-proxy-agent');
const memStore = require("../utils/memStore");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY
});

const openai = new OpenAIApi(configuration);

const getAIResponse = async (message) => {
  const proxy = process.env.PROXY_URL ? {
    proxy: false,
    httpAgent: HttpsProxyAgent(process.env.PROXY_URL),
    httpsAgent: HttpsProxyAgent(process.env.PROXY_URL)
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