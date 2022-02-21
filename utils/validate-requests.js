const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const ValidationError = require('../errors/ValidationError');

const isUrlMethod = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new ValidationError('Неправильный формат ссылки');
  }
  return value;
};

const newUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .messages({
        'string.empty': '"Email" не должен быть пустым',
        'any.required': '"Email" - обязательное поле',
      }),
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.empty': '"Имя" не должно быть пустым',
        'string.min': '"Имя" должно быть не короче 2 символов',
        'string.max': '"Имя" должно быть не длиннее 30 символов',
        'any.required': '"Имя" - обязательное поле',
      }),
    password: Joi
      .string()
      .required()
      .messages({
        'string.empty': '"Пароль" не должен быть пустым',
        'any.required': '"Пароль" - обязательное поле',
      }),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi
      .string()
      .required()
      .messages({
        'string.empty': '"Пароль" не должен быть пустым',
        'any.required': '"Пароль" - обязательное поле',
      }),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .messages({
        'string.empty': '"Email" не должен быть пустым',
        'any.required': '"Email" - обязательное поле',
      }),
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.empty': '"Имя" не должно быть пустым',
        'string.min': '"Имя" должно быть не короче 2 символов',
        'string.max': '"Имя" должно быть не длиннее 30 символов',
        'any.required': '"Имя" - обязательное поле',
      }),
  }),
});

const addNewMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.required().custom(isUrlMethod, 'custom validation'),
    trailer: Joi.required().custom(isUrlMethod, 'custom validation'),
    thumbnail: Joi.required().custom(isUrlMethod, 'custom validation'),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  newUserValidation,
  loginUserValidation,
  updateUserValidation,
  addNewMovieValidation,
  movieIdValidation,
};
