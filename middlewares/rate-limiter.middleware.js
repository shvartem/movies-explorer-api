const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 100,
  message: 'Превышен лимит запросов с вашего IP. Попробуйте выполнить новый запрос через 15 минут',
});

module.exports = limiter;
