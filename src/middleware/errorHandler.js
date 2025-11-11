// src/middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Handle custom errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
      data: null,
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      details: err.details,
    });
  }

  // Handle database errors
  if (err.code === '23505') {
    // Unique constraint violation
    return res.status(400).json({
      message: 'Unique constraint violation',
      data: null,
    });
  }

  // Default error response
  res.status(500).json({
    message: 'Internal server error',
    data: null,
  });
}

module.exports = errorHandler;
