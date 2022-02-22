const { BAD_REQUEST_ERROR } = require('../utils/http-codes');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR;
  }
}

module.exports = ValidationError;
