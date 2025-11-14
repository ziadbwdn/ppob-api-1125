// src/models/Profile.js
const { EntitySchema } = require('typeorm');

const Profile = new EntitySchema({
  name: 'Profile',
  tableName: 'profiles',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    userId: {
      type: 'uuid',
      unique: true,
    },
    firstName: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    lastName: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    phone: {
      type: 'varchar',
      length: 20,
      nullable: true,
    },
    address: {
      type: 'text',
      nullable: true,
    },
    dateOfBirth: {
      type: 'date',
      nullable: true,
    },
    bio: {
      type: 'text',
      nullable: true,
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
    user: {
      target: 'User',
      type: 'one-to-one',
      joinColumn: { name: 'userId' },
    },
  },
});

module.exports = Profile;
