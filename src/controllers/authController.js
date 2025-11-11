// src/controllers/authController.js
const authService = require('../services/authService');
const { validateRegister, validateLogin } = require('../utils/validators');
const { sendSuccess, sendError } = require('../utils/response');

class AuthController {
  async register(req, res, next) {
    try {
      // Validate input
      const { error, value } = validateRegister(req.body);
      if (error) {
        return sendError(res, 400, error.details[0].message);
      }

      const result = await authService.register(value);
      return sendSuccess(res, 201, 'User registered successfully', result);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      // Validate input
      const { error, value } = validateLogin(req.body);
      if (error) {
        return sendError(res, 400, error.details[0].message);
      }

      const result = await authService.login(value.email, value.password);
      return sendSuccess(res, 200, 'User logged in successfully', result);
    } catch (err) {
      next(err);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);
      return sendSuccess(res, 200, 'Profile retrieved successfully', user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
