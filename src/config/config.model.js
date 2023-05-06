const Joi = require('joi');

const configModel = Joi.object({
  app: Joi.object({
    app_env: Joi.string().required(),
    port: Joi.number().required(),
    openAIAPIKey: Joi.string().required(),
    logging: Joi.boolean().required(),
    origin: Joi.string().required(),
    proxy: Joi.string(),
    jwt_key: Joi.string().required(),
    client_ids: Joi.array().required(),
    admin_key: Joi.string()
  }).required(),
  db: Joi.object({
    host: Joi.string().required,
    port: Joi.string().required,
    user: Joi.string().required,
    password: Joi.string(),
    database: Joi.string().required,
  })
});

module.exports = configModel;