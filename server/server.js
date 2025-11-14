// server.js
// Only load dotenv in non-production (local development)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
require('reflect-metadata');

const app = require('./src/app');
const { AppDataSource } = require('./database/data-source');

const PORT = process.env.PORT || 3000;

// Initialize database connection (lazy loading for serverless)
let dbInitialized = false;
let dbInitializationInProgress = false;

async function initializeDatabase() {
  // If already initialized, skip
  if (dbInitialized || AppDataSource.isInitialized) {
    return;
  }

  // If initialization is in progress, wait for it
  if (dbInitializationInProgress) {
    // Wait for initialization to complete
    let attempts = 0;
    while (dbInitializationInProgress && attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    return;
  }

  dbInitializationInProgress = true;
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✓ Database connected');
    }
    dbInitialized = true;
  } catch (error) {
    console.error('✗ Failed to initialize database:', error.message);
    dbInitializationInProgress = false;
    // Don't throw, let the request handler deal with it
  }
  dbInitializationInProgress = false;
}

// For Vercel serverless: initialize DB on first request
app.use(async (req, res, next) => {
  try {
    await initializeDatabase();
    next();
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(503).json({
      status: 503,
      message: 'Service temporarily unavailable - database connection error',
      data: null
    });
  }
});

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
}

// Export for Vercel serverless
module.exports = app;
