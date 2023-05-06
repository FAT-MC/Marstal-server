const configModel = require('./config.model');

const config = {
  app: {
    port: process.env.PORT,
    openAIAPIKey: process.env.OPEN_AI_API_KEY,
    logging: process.env.LOGGING || true,
    origin: process.env.CLIENT_APP_ORGIN,
    proxy: process.env.PROXY_URL,
    jwt_key: process.env.JWT_KEY,
    client_ids: process.env.CLIENT_IDS.split(','),
    admin_key: process.env.ADMIN_KEY
  }
};

const result = configModel.validate(config);

if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

module.exports = config;