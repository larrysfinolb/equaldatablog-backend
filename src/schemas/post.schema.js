import joi from 'joi';

const id = joi.number().integer();
const title = joi.string();
const article = joi.string();

const schemaParams = joi.object({
  postId: id.required(),
});

const schemaBodyCreate = joi.object({
  title: title.required(),
  article: article.required(),
});

const schemaBodyUpdate = joi.object({
  title,
  article,
});

export default {
  schemaParams,
  schemaBodyCreate,
  schemaBodyUpdate,
};
