const bcrypt = require('bcrypt');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const User = require('../models/user');
const HTTP_CODES = require('../utils/http-codes');

async function createUser(req, res, next) {
  const { email, name, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashPassword,
    });

    return res
      .status(HTTP_CODES.CREATED_CODE)
      .json({
        email: user.email,
        name: user.name,
      });
  } catch (err) {
    console.error(err.name, err.message);

    if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные'));
    }
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }

    return next(err);
  }
}

module.exports = createUser;
