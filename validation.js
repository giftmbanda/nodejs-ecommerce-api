const joi = require("joi");

function registerValidation(data) {
  const schema = joi.object({
    name: joi.string().min(4).required(),
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required().pattern(new RegExp('/^[a-zA-Z0-9]$/')),
    phonenumber: joi.string().min(10).max(10).pattern(new RegExp('/^[0-9]{10}$/')),
  });
  return schema.validate(data);
}

function loginValidation(data) {
  const schema = joi.object({
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required().pattern(new RegExp('/^[a-zA-Z0-9]$/')),
  });
  return schema.validate(data);
}

module.exports = { registerValidation, loginValidation };
