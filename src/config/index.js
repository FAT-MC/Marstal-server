const configModel = require('./config.model');

const config = {
  app: {
    app_env: process.env.APP_ENV,
    port: process.env.PORT,
    openAIAPIKey: process.env.OPEN_AI_API_KEY,
    logging: process.env.LOGGING || true,
    origin: process.env.CLIENT_APP_ORGIN,
    proxy: process.env.PROXY_URL,
    jwt_key: process.env.JWT_KEY,
    client_ids: process.env.CLIENT_IDS.split(','),
    admin_key: process.env.ADMIN_KEY
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
};

const result = configModel.validate(config);

if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

module.exports = config;