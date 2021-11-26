require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { errors } = require('celebrate');
const helmet = require('helmet');

const indexRouter = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger.middleware');
const limiter = require('./middlewares/rate-limiter.middleware');
const handleNotFoundRequest = require('./middlewares/not-found.middleware');
const handleError = require('./middlewares/handle-error.middleware');

const DATABASE_LINK = require('./utils/mongo-config');

const app = express();
const PORT = process.env.PORT ?? 3000;

mongoose.connect(DATABASE_LINK)
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log({ errorMessage: error.message }));

app.use(requestLogger);
app.use(morgan('dev'));
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);
app.use(handleNotFoundRequest);

app.use(errorLogger);
app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
