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
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;
const dbUsername = process.env.DB_USERNAME || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbName = process.env.DB_DATABASE || 'user_management';
const dbSSLExplicit = process.env.DB_SSL;

const isCloudDatabase = dbHost !== 'localhost' && dbHost !== '127.0.0.1';
const shouldUseSSL = dbSSLExplicit === 'true' || (dbSSLExplicit !== 'false' && isCloudDatabase);

// CRITICAL: Log for debugging on Vercel
console.log('='.repeat(50));
console.log('[DB CONFIG] Host:', dbHost);
console.log('[DB CONFIG] Port:', dbPort);
console.log('[DB CONFIG] Database:', dbName);
console.log('[DB CONFIG] Username:', dbUsername);
console.log('[DB CONFIG] SSL Required:', shouldUseSSL);
console.log('='.repeat(50));

const AppDataSource = new DataSource({
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
  // SSL configuration - CRITICAL for cloud databases
  ssl: shouldUseSSL,
  // Extra options passed directly to pg driver
  extra: shouldUseSSL ? {
    ssl: {
      rejectUnauthorized: false, // For self-signed certificates
      require: true, // Force SSL
    },
  } : undefined,
});

module.exports = { AppDataSource };
