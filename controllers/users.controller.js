const User = require('../models/user');
const HTTP_CODES = require('../utils/http-codes');

async function getMe(req, res, next) {
  try {
    const me = await User.findById({ id: req.id });

    return res.status(HTTP_CODES.SUCCESS_CODE).json(me);
  } catch (err) {
    return next();
  }
}

async function updateMe(req, res, next) {
  const { _id } = req.user;
  const { name } = req.body;
  try {
    const updatedMe = await User.findByIdAndUpdate(
      _id,
      { name },
      { new: true },
    );

    return res.status(HTTP_CODES.SUCCESS_CODE).json(updatedMe);
  } catch (err) {
    return next();
  }
}

module.exports = { getMe, updateMe };
