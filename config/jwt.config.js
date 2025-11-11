// config/jwt.config.js
const env = require('./env');

module.exports = {
  secret: env.JWT_SECRET,
  expiresIn: env.JWT_EXPIRATION,
};
