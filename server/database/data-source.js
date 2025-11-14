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
const dbPort = process.env.DB_PORT || 5432;
const dbUsername = process.env.DB_USERNAME || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbName = process.env.DB_DATABASE || 'user_management';
const dbSSLExplicit = process.env.DB_SSL;

const isCloudDatabase = dbHost !== 'localhost' && dbHost !== '127.0.0.1';
const shouldUseSSL = dbSSLExplicit === 'true' || (dbSSLExplicit !== 'false' && isCloudDatabase);

// Log SSL decision for debugging
console.log(`[DB] Connecting to ${dbHost}:${dbPort} - SSL: ${shouldUseSSL}`);

// Build connection string with SSL parameters for cloud databases
let connectionUrl = null;
if (shouldUseSSL) {
  // Use connection URL format with SSL mode for cloud databases
  // sslmode=require ensures SSL connection is mandatory
  const encodedPassword = encodeURIComponent(dbPassword);
  connectionUrl = `postgresql://${dbUsername}:${encodedPassword}@${dbHost}:${dbPort}/${dbName}?sslmode=require`;
  console.log(`[DB] Using SSL connection (sslmode=require)`);
}

const AppDataSource = connectionUrl
  ? new DataSource({
      type: 'postgres',
      url: connectionUrl,
      entities: [User, Profile, Banner, Service, Account, Transaction],
      migrations: ['database/migrations/*.js'],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : new DataSource({
      type: 'postgres',
      host: dbHost,
      port: parseInt(dbPort),
      username: dbUsername,
      password: dbPassword,
      database: dbName,
      entities: [User, Profile, Banner, Service, Account, Transaction],
      migrations: ['database/migrations/*.js'],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    });

module.exports = { AppDataSource };
