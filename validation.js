const joi = require("joi"); //import { string, validate } from "joi";

const registerValidation = (data) => {
  const schema = {
    name: joi.string().min(4),
    email: joi.string().min(6).email(),
    password: joi.string().min(6),
    phonenumber: joi.string().min(10).max(10),
  };
  return joi.valid(data, schema);
};


const loginValidation = (data) => {
  const schema = {
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  };
  return joi.valid(data, schema);
};
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
