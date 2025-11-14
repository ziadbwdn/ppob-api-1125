// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { sendError, statusCodes } = require('../utils/response');
const env = require('../../config/env');

class AuthMiddleware {
  async authenticate(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return sendError(res, 401, statusCodes.INVALID_TOKEN, 'Token tidak tidak valid atau kadaluwarsa');
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return sendError(res, 401, statusCodes.INVALID_TOKEN, 'Token tidak tidak valid atau kadaluwarsa');
      }

      // Verify token
      const decoded = jwt.verify(token, env.JWT_SECRET);
      req.user = decoded;

      next();
    } catch (error) {
      return sendError(res, 401, statusCodes.INVALID_TOKEN, 'Token tidak tidak valid atau kadaluwarsa');
    }
  }
}

module.exports = new AuthMiddleware();
