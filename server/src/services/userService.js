// src/services/userService.js
const userRepository = require('../repositories/userRepository');
const { hashPassword } = require('../utils/hash');

class UserService {
  async create(createUserData) {
    // Check if user exists
    const existingEmail = await userRepository.findByEmail(createUserData.email);
    if (existingEmail) {
      throw { statusCode: 400, message: 'Email already exists' };
    }

    const existingUsername = await userRepository.findByUsername(createUserData.username);
    if (existingUsername) {
      throw { statusCode: 400, message: 'Username already exists' };
    }

    // Hash password
    const hashedPassword = await hashPassword(createUserData.password);

    // Create user
    return userRepository.create({
      ...createUserData,
      password: hashedPassword,
    });
  }

  async findAll(includeProfile = false) {
    return userRepository.findAll(includeProfile);
  }

  async findOne(id, includeProfile = false) {
    const user = await userRepository.findById(id, includeProfile);
    if (!user) {
      throw { statusCode: 404, message: `User with ID "${id}" not found` };
    }
    return user;
  }

  async findByEmail(email) {
    return userRepository.findByEmail(email);
  }

  async update(id, updateData) {
    // Verify user exists
    await this.findOne(id);

    // Hash password if provided
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    return userRepository.update(id, updateData);
  }

  async remove(id) {
    const result = await userRepository.delete(id);
    if (!result) {
      throw { statusCode: 404, message: `User with ID "${id}" not found` };
    }
  }

  async softDelete(id) {
    await this.findOne(id);
    return userRepository.softDelete(id);
  }

  async count() {
    return userRepository.count();
  }

  async findActiveUsers() {
    return userRepository.findActiveUsers();
  }
}

module.exports = new UserService();
