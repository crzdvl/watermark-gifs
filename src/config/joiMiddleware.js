const { ValidationError } = require('joi');

const middleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');

    throw new ValidationError(message);
  }
};

module.exports = middleware;
