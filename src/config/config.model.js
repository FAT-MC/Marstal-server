const Joi = require('joi');

const configModel = Joi.object({
  app: Joi.object({
    port: Joi.number().required(),
    openAIAPIKey: Joi.string().required(),
    logging: Joi.boolean().required()
  }).required()
});

module.exports = configModel;