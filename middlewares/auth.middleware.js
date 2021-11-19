function authorize(req, res, next) {
  req.user = { _id: '1' };
  next();
}

module.exports = authorize;
