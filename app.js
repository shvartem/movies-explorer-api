require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger.middleware');

const indexRouter = require('./routes');
const handleError = require('./middlewares/handle-error.middleware');
const limiter = require('./middlewares/rate-limiter.middleware');

const app = express();
const PORT = process.env.PORT ?? 3000;

mongoose.connect('mongodb://localhost:27017/moviesdb')
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log({ errorMessage: error.message }));

app.use(morgan('dev'));
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use('/', indexRouter);

app.use(errorLogger);
app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
