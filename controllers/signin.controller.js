const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HTTP_CODES = require('../utils/http-codes');
const TOKEN_SECRET = require('../utils/token-secret');

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');

    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      return res.status(401).json({ message: 'Неправильный email или пароль' });
    }

    const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);

    return res
      .cookie('token', token, {
        expires: 1000 * 60 * 2,
        httpOnly: true,
      })
      .json({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
  } catch (err) {
    return next();
  }
}

module.exports = loginUser;
