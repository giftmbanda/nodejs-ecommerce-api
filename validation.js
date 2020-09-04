const joi = require("joi"); //import { string, validate } from "joi";

function registerValidation(data) {
  const schema = joi.object({
    name: joi.string().min(4),
    email: joi.string().min(6).email(),
    password: joi.string().min(6),
    phonenumber: joi.string().min(10).max(10),
  });
  return schema.validate(data);
}

function loginValidation(data) {
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
}

module.exports = { registerValidation, loginValidation };
