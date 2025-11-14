// src/middleware/errorHandler.js
const { statusCodes } = require('../utils/response');

function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Handle custom errors with status code
  if (err.statusCode && err.status) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      data: err.data || null,
    });
  }

  // Handle custom errors (backward compatibility)
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: statusCodes.INVALID_PARAMETER,
      message: err.message,
      data: null,
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: statusCodes.INVALID_PARAMETER,
      message: 'Validation error',
      data: null,
    });
  }

  // Handle database errors
  if (err.code === '23505') {
    // Unique constraint violation
    return res.status(409).json({
      status: statusCodes.INVALID_PARAMETER,
      message: 'Email sudah terdaftar',
      data: null,
    });
  }

  // Default error response
  res.status(500).json({
    status: 999,
    message: 'Internal server error',
    data: null,
  });
}

module.exports = errorHandler;
