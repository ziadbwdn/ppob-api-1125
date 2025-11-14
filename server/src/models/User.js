// src/models/User.js
const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    email: {
      type: 'varchar',
      length: 255,
      unique: true,
    },
    username: {
      type: 'varchar',
      length: 100,
      unique: true,
    },
    password: {
      type: 'varchar',
      length: 255,
    },
    first_name: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    last_name: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    profile_image: {
      type: 'text',
      nullable: true,
    },
    isActive: {
      type: 'boolean',
      default: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
  relations: {
    profile: {
      target: 'Profile',
      type: 'one-to-one',
      joinColumn: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  },
});

module.exports = User;
