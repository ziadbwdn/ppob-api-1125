// database/data-source.js
require('dotenv').config();
const { DataSource } = require('typeorm');
const User = require('../src/models/User');
const Profile = require('../src/models/Profile');
const Banner = require('../src/models/Banner');
const Service = require('../src/models/Service');
const Account = require('../src/models/Account');
const Transaction = require('../src/models/Transaction');

// Determine if SSL should be used
// Use SSL if:
// 1. DB_SSL env var is explicitly set to 'true'
// 2. DB_HOST is not localhost (cloud database)
// 3. Explicitly disabled with DB_SSL=false
const dbHost = process.env.DB_HOST || 'localhost';
const dbSSLExplicit = process.env.DB_SSL;
const isCloudDatabase = dbHost !== 'localhost' && dbHost !== '127.0.0.1';
const shouldUseSSL = dbSSLExplicit === 'true' || (dbSSLExplicit !== 'false' && isCloudDatabase);

const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbHost,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'user_management',
  entities: [User, Profile, Banner, Service, Account, Transaction],
  migrations: ['database/migrations/*.js'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  // Enable SSL for cloud databases automatically
  ssl: shouldUseSSL ? {
    rejectUnauthorized: false,
  } : false,
});

module.exports = { AppDataSource };
