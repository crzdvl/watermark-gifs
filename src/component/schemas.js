const Joi = require('joi');

const formValidation = Joi.object({
  query: Joi.string().required(),
  watermark: Joi.boolean().required(),
  _csrf: Joi.string().required(),
});

module.exports = {
  formValidation,
};
