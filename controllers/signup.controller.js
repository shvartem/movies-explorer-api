const bcrypt = require('bcrypt');
const User = require('../models/user');
const HTTP_CODES = require('../utils/http-codes');

async function createUser(req, res, next) {
  const { email, name, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
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
    return next();
  }
}

module.exports = createUser;
