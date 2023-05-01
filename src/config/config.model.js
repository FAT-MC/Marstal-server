const Joi = require('joi');

const configModel = Joi.object({
  app: Joi.object({
    port: Joi.number().required(),
    openAIAPIKey: Joi.string().required(),
    logging: Joi.boolean().required(),
    origin: Joi.string().required(),
    proxy: Joi.string(),
    jwt_key: Joi.string().required(),
    client_ids: Joi.array().required()
  }).required()
});

module.exports = configModel;