const router = require('express').Router();
const createUser = require('../controllers/signup.controller');
const { newUserValidation } = require('../utils/validate-requests');

router.post('/', newUserValidation, createUser);

module.exports = router;
