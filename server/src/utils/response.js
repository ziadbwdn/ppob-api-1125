// src/utils/response.js

// Status codes mapping for GUIDE-2 spec
const statusCodes = {
  SUCCESS: 0,
  INVALID_PARAMETER: 102,
  WRONG_CREDENTIALS: 103,
  INVALID_TOKEN: 108,
};

function sendSuccess(res, statusCode, message, data = null) {
  return res.status(statusCode).json({
    status: statusCodes.SUCCESS,
    message,
    data,
  });
}

function sendError(res, statusCode, status, message, data = null) {
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
}

module.exports = {
  sendSuccess,
  sendError,
  statusCodes,
};
