const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const User = require('../models/user');
const HTTP_CODES = require('../utils/http-codes');

async function getMe(req, res, next) {
  try {
    const me = await User.findById({ _id: req.user._id }).orFail();

    return res.status(HTTP_CODES.SUCCESS_CODE).json(me);
  } catch (err) {
    console.error(err.name, err.message);

    if (err.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Такого пользователя не существует'));
    }
    if (err.name === 'CastError') {
      return next(new ValidationError('Переданы некорректные данные'));
    }

    return next(err);
  }
}

async function updateMe(req, res, next) {
  const { _id } = req.user;
  const { name, email } = req.body;
  try {
    const updatedMe = await User.findByIdAndUpdate(
      _id,
      { name, email },
      {
        runValidators: true,
        new: true,
      },
    ).orFail();

    return res.status(HTTP_CODES.SUCCESS_CODE).json(updatedMe);
  } catch (err) {
    console.error(err.name, err.message);

    if (err.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Такого пользователя не существует'));
    }
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные'));
    }

    return next(err);
  }
}

module.exports = { getMe, updateMe };
