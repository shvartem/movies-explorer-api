const router = require('express').Router();
const logoutUser = require('../controllers/signout.controller');

router.delete('/', logoutUser);

module.exports = router;
