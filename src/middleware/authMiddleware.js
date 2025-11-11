// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const env = require('../../config/env');

class AuthMiddleware {
  async authenticate(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: 'Missing authorization header' });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Invalid authorization header format' });
      }

      // Verify token
      const decoded = jwt.verify(token, env.JWT_SECRET);

      // Get user from database
      const user = await userService.findOne(decoded.sub);
      req.user = user;

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
      }
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}

module.exports = new AuthMiddleware();
