// server.js
require('dotenv').config();
require('reflect-metadata');

const app = require('./src/app');
const { AppDataSource } = require('./database/data-source');

const PORT = process.env.PORT || 3000;

// Initialize database connection
let dbInitialized = false;

async function initializeDatabase() {
  if (dbInitialized) return;
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✓ Database connected');
      dbInitialized = true;
    }
  } catch (error) {
    console.error('✗ Failed to initialize database:', error);
    throw error;
  }
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  async function bootstrap() {
    try {
      await initializeDatabase();
      app.listen(PORT, () => {
        console.log(`✓ Server running on http://localhost:${PORT}`);
        console.log(`✓ API documentation: http://localhost:${PORT}/api-docs`);
      });
    } catch (error) {
      console.error('✗ Failed to start server:', error);
      process.exit(1);
    }
  }
  bootstrap();
} else {
  // For Vercel serverless, ensure DB is initialized on first request
  app.use(async (req, res, next) => {
    await initializeDatabase();
    next();
  });
}

// Export for Vercel
module.exports = app;
