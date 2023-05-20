const configModel = require('./config.model');

const config = {
  app: {
    app_env: process.env.APP_ENV,
    port: process.env.PORT,
    openAIAPIKey: process.env.OPEN_AI_API_KEY,
    logging: process.env.LOGGING || true,
    origin: process.env.CLIENT_APP_ORGIN,
    proxy: process.env.PROXY_URL,
    access_token_jwt_secret: process.env.ACCESS_TOKEN_JWT_SECRET,
    refresh_token_jwt_secret: process.env.REFRESH_TOKEN_JWT_SECRET,
    access_token_jwt_exp: process.env.ACCESS_TOKEN_JWT_EXP,
    refresh_token_jwt_exp: process.env.REFRESH_TOKEN_JWT_EXP,
    client_ids: process.env.CLIENT_IDS.split(','),
    admin_key: process.env.ADMIN_KEY
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  }
};

const result = configModel.validate(config);

if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

module.exports = config;