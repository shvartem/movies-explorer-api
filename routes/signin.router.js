const router = require('express').Router();
const loginUser = require('../controllers/signin.controller');
const { loginUserValidation } = require('../utils/validate-requests');

router.post('/', loginUserValidation, loginUser);

module.exports = router;
