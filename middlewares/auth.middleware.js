const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../utils/token-secret');

function authorize(req, res, next) {
  const { token } = req.cookie;
  if (!token) return next();

  try {
    req.user = jwt.verify(token, TOKEN_SECRET);
    return next();
  } catch (err) {
    return next();
  }
}

module.exports = authorize;
