// src/utils/response.js
function sendSuccess(res, statusCode, message, data = null) {
  return res.status(statusCode).json({
    message,
    data,
  });
}

function sendError(res, statusCode, message, details = null) {
  const response = { message };
  if (details) {
    response.details = details;
  }
  return res.status(statusCode).json(response);
}

module.exports = {
  sendSuccess,
  sendError,
};
