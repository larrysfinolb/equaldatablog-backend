import joi from 'joi';

const _name = joi.string();
const password = joi.string().min(3);

const schemaBodyUpdate = joi.object({
  name: _name,
  password,
});

export default {
  schemaBodyUpdate,
};
