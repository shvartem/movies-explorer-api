const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');
const User = require('../models/user');
const TOKEN_SECRET = require('../utils/token-secret');

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильная почта или пароль');
    }

    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      throw new UnauthorizedError('Неправильная почта или пароль');
    }

    const token = jwt.sign(
      { _id: user._id },
      TOKEN_SECRET,
      { expiresIn: '7d' },
    );

    return res
      .cookie('token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      })
      .json({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
  } catch (err) {
    console.error(err.name, err.message);

    if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные'));
    }

    return next(err);
  }
}

module.exports = loginUser;
