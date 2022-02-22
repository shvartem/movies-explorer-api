const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const TOKEN_SECRET = require('../utils/token-secret');

function authorize(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  try {
    req.user = jwt.verify(token, TOKEN_SECRET);

    return next();
  } catch (err) {
    console.error(err.name, err.message);

    return next(new UnauthorizedError('Необходима авторизация'));
  }
}

module.exports = authorize;
