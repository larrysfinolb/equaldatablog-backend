import joi from 'joi';

const _name = joi.string();
const email = joi.string().email();
const password = joi.string().min(3);

const schemaSignUp = joi.object({
  name: _name.required(),
  email: email.required(),
  password: password.required(),
});

const schemaLogIn = joi.object({
  email: email.required(),
  password: password.required(),
});

export default {
  schemaSignUp,
  schemaLogIn,
};
