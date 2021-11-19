const router = require('express').Router();
const loginUser = require('../controllers/signin.controller');

router.post('/', loginUser);

module.exports = router;
