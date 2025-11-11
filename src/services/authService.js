// src/services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('./userService');
const env = require('../../config/env');

class AuthService {
  async register(registerData) {
    const user = await userService.create(registerData);

    // Generate JWT token
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.generateToken(payload);

    // Return user without password
    return {
      accessToken,
      user: this.excludePassword(user),
    };
  }

  async login(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw { statusCode: 401, message: 'Please check your login credentials' };
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw { statusCode: 401, message: 'Please check your login credentials' };
    }

    // Generate JWT token
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.generateToken(payload);

    return {
      accessToken,
      user: this.excludePassword(user),
    };
  }

  async verifyToken(token) {
    try {
      return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
      throw { statusCode: 401, message: 'Invalid or expired token' };
    }
  }

  generateToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRATION,
    });
  }

  excludePassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getProfile(id) {
    return userService.findOne(id);
  }
}

module.exports = new AuthService();
