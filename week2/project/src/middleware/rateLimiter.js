const rateLimit = require('express-rate-limit');

// only for login and register — max 10 tries per 15 mins
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: 'Too many requests. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = authLimiter;