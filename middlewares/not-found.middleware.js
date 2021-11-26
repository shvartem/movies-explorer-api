const NotFoundError = require('../errors/NotFoundError');

function handleNotFoundRequest(req, res, next) {
  next(new NotFoundError('Неверный запрос'));
}

module.exports = handleNotFoundRequest;
