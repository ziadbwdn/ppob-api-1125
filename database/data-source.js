// database/data-source.js
const { DataSource } = require('typeorm');
const User = require('../src/models/User');
const Profile = require('../src/models/Profile');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'user_management',
  entities: [User, Profile],
  migrations: ['database/migrations/*.js'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});

module.exports = { AppDataSource };
