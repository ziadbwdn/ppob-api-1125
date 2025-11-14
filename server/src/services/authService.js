// src/services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AppDataSource } = require('../../database/data-source');
const env = require('../../config/env');

class AuthService {
  async register(registerData) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // Check if user already exists
      const existingUserQuery = 'SELECT * FROM users WHERE email = $1';
      const existingUser = await queryRunner.query(existingUserQuery, [registerData.email]);

      if (existingUser.length > 0) {
        throw { statusCode: 409, status: 102, message: 'Email sudah terdaftar' };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(registerData.password, 10);

      // Insert user
      const insertQuery = `
        INSERT INTO users (email, first_name, last_name, password, username)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, email, first_name, last_name
      `;
      const result = await queryRunner.query(insertQuery, [
        registerData.email,
        registerData.first_name,
        registerData.last_name,
        hashedPassword,
        registerData.email.split('@')[0], // Use email prefix as username
      ]);

      // Create account with initial balance
      const createAccountQuery = `
        INSERT INTO accounts (email, balance)
        VALUES ($1, $2)
      `;
      await queryRunner.query(createAccountQuery, [registerData.email, 0]);

      return result[0];
    } catch (error) {
      if (error.statusCode) throw error;
      throw { statusCode: 500, status: 999, message: 'Internal server error' };
    } finally {
      await queryRunner.release();
    }
  }

  async login(email, password) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // Find user by email
      const userQuery = 'SELECT * FROM users WHERE email = $1';
      const users = await queryRunner.query(userQuery, [email]);

      if (users.length === 0) {
        throw { statusCode: 401, status: 103, message: 'Username atau password salah' };
      }

      const user = users[0];

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw { statusCode: 401, status: 103, message: 'Username atau password salah' };
      }

      // Generate JWT token with email payload
      const payload = { email: user.email };
      const token = this.generateToken(payload);

      return {
        token,
      };
    } catch (error) {
      if (error.statusCode) throw error;
      throw { statusCode: 500, status: 999, message: 'Internal server error' };
    } finally {
      await queryRunner.release();
    }
  }

  async getProfile(email) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const userQuery = `
        SELECT email, first_name, last_name, profile_image
        FROM users
        WHERE email = $1
      `;
      const users = await queryRunner.query(userQuery, [email]);

      if (users.length === 0) {
        throw { statusCode: 400, status: 108, message: 'Token tidak tidak valid atau kadaluwarsa' };
      }

      return users[0];
    } catch (error) {
      if (error.statusCode) throw error;
      throw { statusCode: 500, status: 999, message: 'Internal server error' };
    } finally {
      await queryRunner.release();
    }
  }

  async updateProfile(email, updateData) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (updateData.first_name !== undefined) {
        fields.push(`first_name = $${paramCount}`);
        values.push(updateData.first_name);
        paramCount++;
      }

      if (updateData.last_name !== undefined) {
        fields.push(`last_name = $${paramCount}`);
        values.push(updateData.last_name);
        paramCount++;
      }

      if (updateData.profile_image !== undefined) {
        fields.push(`profile_image = $${paramCount}`);
        values.push(updateData.profile_image);
        paramCount++;
      }

      if (fields.length === 0) {
        throw { statusCode: 400, status: 102, message: 'No fields to update' };
      }

      values.push(email);
      const updateQuery = `
        UPDATE users
        SET ${fields.join(', ')}
        WHERE email = $${paramCount}
        RETURNING email, first_name, last_name, profile_image
      `;

      const result = await queryRunner.query(updateQuery, values);

      if (result.length === 0) {
        throw { statusCode: 400, status: 108, message: 'Token tidak tidak valid atau kadaluwarsa' };
      }

      return result[0];
    } catch (error) {
      if (error.statusCode) throw error;
      throw { statusCode: 500, status: 999, message: 'Internal server error' };
    } finally {
      await queryRunner.release();
    }
  }

  async verifyToken(token) {
    try {
      return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
      throw { statusCode: 401, status: 108, message: 'Token tidak tidak valid atau kadaluwarsa' };
    }
  }

  generateToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRATION,
    });
  }
}

module.exports = new AuthService();
