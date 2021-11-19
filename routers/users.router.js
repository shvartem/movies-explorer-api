const router = require('express').Router();
const usersController = require('../controllers/users.controller');

router.route('/me')
  .get(usersController.getMe)
  .patch(usersController.updateMe);

module.exports = router;
