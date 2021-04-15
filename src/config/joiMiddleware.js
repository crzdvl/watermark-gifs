const { ValidationError } = require('joi');

const middleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    req.flash('error', 'Please provide your query.');
    res.redirect('/v1/searchGiphsPage');
  }
};

module.exports = middleware;
