const configModel = require('./config.model');

const config = {
  app: {
    port: process.env.PORT,
    openAIAPIKey: process.env.OPEN_AI_API_KEY,
    logging: process.env.LOGGING || true
  }
};

const result = configModel.validate(config);

if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

module.exports = config;