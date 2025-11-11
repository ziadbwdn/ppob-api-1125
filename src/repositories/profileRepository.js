// src/repositories/profileRepository.js
const { AppDataSource } = require('../../database/data-source');
const Profile = require('../models/Profile');

class ProfileRepository {
  constructor() {
    this.repository = AppDataSource.getRepository(Profile);
  }

  async create(profileData) {
    const profile = this.repository.create(profileData);
    return this.repository.save(profile);
  }

  async findAll(includeUser = false) {
    const query = this.repository.createQueryBuilder('profile');
    if (includeUser) {
      query.leftJoinAndSelect('profile.user', 'user');
    }
    return query.getMany();
  }

  async findById(id, includeUser = false) {
    const query = this.repository.createQueryBuilder('profile')
      .where('profile.id = :id', { id });
    if (includeUser) {
      query.leftJoinAndSelect('profile.user', 'user');
    }
    return query.getOne();
  }

  async findByUserId(userId, includeUser = false) {
    const query = this.repository.createQueryBuilder('profile')
      .where('profile.userId = :userId', { userId });
    if (includeUser) {
      query.leftJoinAndSelect('profile.user', 'user');
    }
    return query.getOne();
  }

  async update(id, updateData) {
    await this.repository.update(id, updateData);
    return this.findById(id);
  }

  async updateByUserId(userId, updateData) {
    await this.repository.update({ userId }, updateData);
    return this.findByUserId(userId);
  }

  async delete(id) {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  async deleteByUserId(userId) {
    const result = await this.repository.delete({ userId });
    return result.affected > 0;
  }

  async count() {
    return this.repository.count();
  }

  async existsByUserId(userId) {
    const count = await this.repository.count({ where: { userId } });
    return count > 0;
  }

  async searchByName(searchTerm) {
    return this.repository
      .createQueryBuilder('profile')
      .where('profile.firstName ILIKE :term', { term: `%${searchTerm}%` })
      .orWhere('profile.lastName ILIKE :term', { term: `%${searchTerm}%` })
      .getMany();
  }
}

module.exports = new ProfileRepository();
