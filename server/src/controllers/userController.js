// src/controllers/userController.js
const userService = require('../services/userService');
const { validateCreateUser, validateUpdateUser } = require('../utils/validators');
const { sendSuccess, sendError } = require('../utils/response');
const { v4: validateUUID } = require('uuid');

class UserController {
  async create(req, res, next) {
    try {
      const { error, value } = validateCreateUser(req.body);
      if (error) {
        return sendError(res, 400, error.details[0].message);
      }

      const user = await userService.create(value);
      return sendSuccess(res, 201, 'User created successfully', user);
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const users = await userService.findAll();
      return sendSuccess(res, 200, 'Users retrieved successfully', users);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req, res, next) {
    try {
      // Validate UUID
      if (!this.isValidUUID(req.params.id)) {
        return sendError(res, 400, 'Invalid user ID format');
      }

      const user = await userService.findOne(req.params.id);
      return sendSuccess(res, 200, 'User retrieved successfully', user);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      if (!this.isValidUUID(req.params.id)) {
        return sendError(res, 400, 'Invalid user ID format');
      }

      const { error, value } = validateUpdateUser(req.body);
      if (error) {
        return sendError(res, 400, error.details[0].message);
      }

      const user = await userService.update(req.params.id, value);
      return sendSuccess(res, 200, 'User updated successfully', user);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      if (!this.isValidUUID(req.params.id)) {
        return sendError(res, 400, 'Invalid user ID format');
      }

      await userService.remove(req.params.id);
      return sendSuccess(res, 204, 'User deleted successfully');
    } catch (err) {
      next(err);
    }
  }

  isValidUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}

module.exports = new UserController();
