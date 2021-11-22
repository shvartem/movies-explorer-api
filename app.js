const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { errors } = require('celebrate');

const signupRouter = require('./routers/signup.router');
const signinRouter = require('./routers/signin.router');
const signoutRouter = require('./routers/signout.router');
const usersRouter = require('./routers/users.router');
const moviesRouter = require('./routers/movies.router');

const HTTP_CODES = require('./utils/http-codes');
const authorize = require('./middlewares/auth.middleware');
const { requestLogger, errorLogger } = require('./middlewares/logger.middleware');

const app = express();
const PORT = process.env.PORT ?? 3000;
mongoose.connect('mongodb://localhost:27017/bitfilmsdb')
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log({ errorMessage: error.message }));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);

app.use(authorize);

app.use('/signout', signoutRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { message, statusCode = 500 } = err;
  res
    .status(statusCode)
    .send(statusCode === HTTP_CODES.SERVER_ERROR
      ? 'Что-то пошло не так'
      : { message });

  next();
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
