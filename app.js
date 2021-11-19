const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

const usersRouter = require('./routers/users.router');
const moviesRouter = require('./routers/movies.router');

const HTTP_CODES = require('./utils/http-codes');
const authorize = require('./middlewares/auth.middleware');

const app = express();
const PORT = process.env.PORT ?? 3000;
mongoose.connect('mongodb://localhost:27017/bitfilmsdb')
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log({ errorMessage: error.message }));

app.use(express.json());
app.use(logger('dev'));
app.use(authorize);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use((err, req, res, next) => {
  // const { message, statusCode = 500 } = err;
  const message = 'mess';
  const statusCode = 599;
  res
    .status(statusCode)
    .send(statusCode === HTTP_CODES.SERVER_ERROR
      ? 'Что-то пошло не так'
      : message);
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
