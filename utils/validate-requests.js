const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const ValidationError = require('../errors/ValidationError');

const method = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new ValidationError('Неправильный формат ссылки');
  }
  return value;
};

const newUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
  }),
});

const addNewMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.required().custom(method, 'custom validation'),
    trailer: Joi.required().custom(method, 'custom validation'),
    thumbnail: Joi.required().custom(method, 'custom validation'),
    movieId: Joi.number().required(),
    nameRu: Joi.string().required(),
    nameEn: Joi.string().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
});

module.exports = {
  newUserValidation,
  loginUserValidation,
  updateUserValidation,
  addNewMovieValidation,
  movieIdValidation,
};
