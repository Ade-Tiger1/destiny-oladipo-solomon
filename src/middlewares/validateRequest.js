const Joi = require('joi');

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.error(error.details.map(d => d.message).join(', '), 400);
    next();
  };
}

module.exports = { validate };