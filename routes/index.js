const router = require('express').Router();

const signupRouter = require('./signup.router');
const signinRouter = require('./signin.router');
const signoutRouter = require('./signout.router');
const usersRouter = require('./users.router');
const moviesRouter = require('./movies.router');
const authorize = require('../middlewares/auth.middleware');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);

router.use(authorize);

router.use('/signout', signoutRouter);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
