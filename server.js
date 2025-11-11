// server.js
require('dotenv').config();
require('reflect-metadata');

const app = require('./src/app');
const { AppDataSource } = require('./database/data-source');

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('✓ Database connected');

    // Start server
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
