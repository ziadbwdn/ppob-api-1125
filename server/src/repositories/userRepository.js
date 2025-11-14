// src/repositories/userRepository.js
const { AppDataSource } = require('../../database/data-source');
const User = require('../models/User');

class UserRepository {
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(userData) {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async findAll(includeProfile = false) {
    const query = this.repository.createQueryBuilder('user');
    if (includeProfile) {
      query.leftJoinAndSelect('user.profile', 'profile');
    }
    return query.getMany();
  }

  async findById(id, includeProfile = false) {
    const query = this.repository.createQueryBuilder('user')
      .where('user.id = :id', { id });
    if (includeProfile) {
      query.leftJoinAndSelect('user.profile', 'profile');
    }
    return query.getOne();
  }

  async findByEmail(email) {
    return this.repository.findOne({ where: { email } });
  }

  async findByUsername(username) {
    return this.repository.findOne({ where: { username } });
  }

  async update(id, updateData) {
    await this.repository.update(id, updateData);
    return this.findById(id);
  }

  async delete(id) {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  async softDelete(id) {
    return this.repository.update(id, { isActive: false });
  }

  async count() {
    return this.repository.count();
  }

  async findActiveUsers() {
    return this.repository.find({ where: { isActive: true } });
  }
}

module.exports = new UserRepository();
