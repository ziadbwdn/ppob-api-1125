// src/controllers/authController.js
const authService = require('../services/authService');
const { validateRegister, validateLogin, validateUpdateProfileInfo } = require('../utils/validators');
const { sendSuccess, sendError, statusCodes } = require('../utils/response');

class AuthController {
  async register(req, res, next) {
    try {
      // Validate input
      const { error, value } = validateRegister(req.body);
      if (error) {
        return sendError(res, 400, statusCodes.INVALID_PARAMETER, error.details[0].message);
      }

      await authService.register(value);
      return sendSuccess(res, 200, 'Registrasi berhasil silahkan login');
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      // Validate input
      const { error, value } = validateLogin(req.body);
      if (error) {
        return sendError(res, 400, statusCodes.INVALID_PARAMETER, error.details[0].message);
      }

      const result = await authService.login(value.email, value.password);
      return sendSuccess(res, 200, 'Login Sukses', result);
    } catch (err) {
      next(err);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.email);
      return sendSuccess(res, 200, 'Sukses', user);
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(req, res, next) {
    try {
      // Validate input
      const { error, value } = validateUpdateProfileInfo(req.body);
      if (error) {
        return sendError(res, 400, statusCodes.INVALID_PARAMETER, error.details[0].message);
      }

      const user = await authService.updateProfile(req.user.email, value);
      return sendSuccess(res, 200, 'Update Pofile berhasil', user);
    } catch (err) {
      next(err);
    }
  }

  async updateProfileImage(req, res, next) {
    try {
      if (!req.file) {
        return sendError(res, 400, statusCodes.INVALID_PARAMETER, 'File is required');
      }

      // Validate file format
      const allowedMimes = ['image/jpeg', 'image/png'];
      if (!allowedMimes.includes(req.file.mimetype)) {
        return sendError(res, 400, statusCodes.INVALID_PARAMETER, 'Format Image tidak sesuai');
      }

      // Convert file to base64 URL or path
      const profileImage = req.file.path || `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

      const user = await authService.updateProfile(req.user.email, { profile_image: profileImage });
      return sendSuccess(res, 200, 'Update Profile Image berhasil', user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
