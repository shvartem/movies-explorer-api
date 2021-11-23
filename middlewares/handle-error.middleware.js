const HTTP_CODES = require('../utils/http-codes');

function handleError(err, req, res, next) {
  const { message, statusCode = 500 } = err;
  res
    .status(statusCode)
    .send(statusCode === HTTP_CODES.SERVER_ERROR
      ? 'Что-то пошло не так'
      : { message });

  next();
}

module.exports = handleError;
