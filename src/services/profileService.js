// src/services/profileService.js
const profileRepository = require('../repositories/profileRepository');

class ProfileService {
  async create(createProfileData) {
    return profileRepository.create(createProfileData);
  }

  async findAll(includeUser = false) {
    return profileRepository.findAll(includeUser);
  }

  async findOne(id, includeUser = false) {
    const profile = await profileRepository.findById(id, includeUser);
    if (!profile) {
      throw { statusCode: 404, message: `Profile with ID "${id}" not found` };
    }
    return profile;
  }

  async findByUserId(userId, includeUser = false) {
    const profile = await profileRepository.findByUserId(userId, includeUser);
    if (!profile) {
      throw { statusCode: 404, message: `Profile for user with ID "${userId}" not found` };
    }
    return profile;
  }

  async update(id, updateData) {
    const profile = await profileRepository.update(id, updateData);
    if (!profile) {
      throw { statusCode: 404, message: `Profile with ID "${id}" not found` };
    }
    return profile;
  }

  async updateByUserId(userId, updateData) {
    const profile = await profileRepository.updateByUserId(userId, updateData);
    if (!profile) {
      throw { statusCode: 404, message: `Profile for user with ID "${userId}" not found` };
    }
    return profile;
  }

  async remove(id) {
    const result = await profileRepository.delete(id);
    if (!result) {
      throw { statusCode: 404, message: `Profile with ID "${id}" not found` };
    }
    return { message: 'Profile deleted successfully' };
  }

  async removeByUserId(userId) {
    const result = await profileRepository.deleteByUserId(userId);
    if (!result) {
      throw { statusCode: 404, message: `Profile for user with ID "${userId}" not found` };
    }
    return { message: 'Profile deleted successfully' };
  }

  async searchByName(searchTerm) {
    return profileRepository.searchByName(searchTerm);
  }

  async getProfileCount() {
    return profileRepository.count();
  }

  async userHasProfile(userId) {
    return profileRepository.existsByUserId(userId);
  }
}

module.exports = new ProfileService();
