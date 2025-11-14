// src/app.js
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./config/swagger');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Swagger UI documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerOptions.definition, {
  swaggerOptions: {
    url: '/api-docs/swagger.json',
  },
}));

// Swagger JSON endpoint
app.get('/api-docs/swagger.json', (req, res) => {
  res.json(swaggerOptions.definition);
});

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Documentation info
app.get('/', (req, res) => {
  res.json({
    message: 'PPOB API',
    version: '1.0.0',
    documentation: '/api-docs',
    health: '/health',
  });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
