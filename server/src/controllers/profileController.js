// src/controllers/profileController.js
const profileService = require('../services/profileService');
const { validateCreateProfile, validateUpdateProfile } = require('../utils/validators');
const { sendSuccess, sendError } = require('../utils/response');

class ProfileController {
  async create(req, res, next) {
    try {
      const { error, value } = validateCreateProfile(req.body);
      if (error) {
        return sendError(res, 400, error.details[0].message);
      }

      const profile = await profileService.create(value);
      return sendSuccess(res, 201, 'Profile created successfully', profile);
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const includeUser = req.query.includeUser === 'true';
      const profiles = await profileService.findAll(includeUser);
      return sendSuccess(res, 200, 'Profiles retrieved successfully', profiles);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req, res, next) {
    try {
      if (!this.isValidUUID(req.params.id)) {
        return sendError(res, 400, 'Invalid profile ID format');
      }

      const includeUser = req.query.includeUser === 'true';
      const profile = await profileService.findOne(req.params.id, includeUser);
      return sendSuccess(res, 200, 'Profile retrieved successfully', profile);
    } catch (err) {
      next(err);
    }
  }

  async findByUserId(req, res, next) {
    try {
      if (!this.isValidUUID(req.params.userId)) {
        return sendError(res, 400, 'Invalid user ID format');
      }

      const includeUser = req.query.includeUser === 'true';
      const profile = await profileService.findByUserId(req.params.userId, includeUser);
      return sendSuccess(res, 200, 'Profile retrieved successfully', profile);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      if (!this.isValidUUID(req.params.id)) {
        return sendError(res, 400, 'Invalid profile ID format');
      }

      const { error, value } = validateUpdateProfile(req.body);
      if (error) {
        return sendError(res, 400, error.details[0].message);
      }

      const profile = await profileService.update(req.params.id, value);
      return sendSuccess(res, 200, 'Profile updated successfully', profile);
    } catch (err) {
      next(err);
    }
  }

  async updateByUserId(req, res, next) {
    try {
      if (!this.isValidUUID(req.params.userId)) {
        return sendError(res, 400, 'Invalid user ID format');
      }

      const { error, value } = validateUpdateProfile(req.body);
      if (error) {
        return sendError(res, 400, error.details[0].message);
      }

      const profile = await profileService.updateByUserId(req.params.userId, value);
      return sendSuccess(res, 200, 'Profile updated successfully', profile);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      if (!this.isValidUUID(req.params.id)) {
        return sendError(res, 400, 'Invalid profile ID format');
      }

      const result = await profileService.remove(req.params.id);
      return sendSuccess(res, 200, result.message, {});
    } catch (err) {
      next(err);
    }
  }

  async searchByName(req, res, next) {
    try {
      const searchTerm = req.query.q;
      if (!searchTerm) {
        return sendError(res, 400, 'Search term is required');
      }

      const profiles = await profileService.searchByName(searchTerm);
      return sendSuccess(res, 200, 'Search results retrieved successfully', profiles);
    } catch (err) {
      next(err);
    }
  }

  async getProfileCount(req, res, next) {
    try {
      const count = await profileService.getProfileCount();
      return sendSuccess(res, 200, 'Profile count retrieved successfully', { count });
    } catch (err) {
      next(err);
    }
  }

  isValidUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}

module.exports = new ProfileController();
