const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const { updateUserValidation } = require('../utils/validate-requests');

router.route('/me')
  .get(usersController.getMe)
  .patch(updateUserValidation, usersController.updateMe);

module.exports = router;
