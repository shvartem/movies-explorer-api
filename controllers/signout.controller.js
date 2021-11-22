const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const User = require('../models/user');

async function logoutUser(req, res, next) {
  console.log();
  const { _id } = req.user;
  try {
    await User.findById(_id).orFail();

    return res
      .clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      })
      .json({
        message: 'Успешный выход',
      });
  } catch (err) {
    console.error(err.name, err.message);

    if (err.name === 'DocumentNotFound') {
      return next(new NotFoundError('Такого пользователя нет'));
    }
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные'));
    }

    return next(err);
  }
}

module.exports = logoutUser;
