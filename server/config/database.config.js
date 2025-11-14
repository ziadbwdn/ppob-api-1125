// config/database.config.js
const env = require('./env');

module.exports = {
  development: {
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    entities: ['src/models/**/*.js'],
    migrations: ['database/migrations/**/*.js'],
    synchronize: false,
    logging: true,
  },
  test: {
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: `${env.DB_DATABASE}_test`,
    entities: ['src/models/**/*.js'],
    migrations: ['database/migrations/**/*.js'],
    synchronize: true,
    logging: false,
  },
  production: {
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    entities: ['src/models/**/*.js'],
    migrations: ['database/migrations/**/*.js'],
    synchronize: false,
    logging: false,
  },
};
