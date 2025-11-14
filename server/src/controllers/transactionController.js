// src/controllers/transactionController.js
const transactionService = require('../services/transactionService');
const { validateTopup, validateTransaction, validateTransactionHistory } = require('../utils/validators');
const { sendSuccess, sendError, statusCodes } = require('../utils/response');

class TransactionController {
  async getBalance(req, res, next) {
    try {
      const balance = await transactionService.getBalance(req.user.email);
      return sendSuccess(res, 200, 'Get Balance Berhasil', balance);
    } catch (err) {
      next(err);
    }
  }

  async topup(req, res, next) {
    try {
      // Validate input
      const { error, value } = validateTopup(req.body);
      if (error) {
        return sendError(res, 400, statusCodes.INVALID_PARAMETER, error.details[0].message);
      }

      const result = await transactionService.topup(req.user.email, value.top_up_amount);
      return sendSuccess(res, 200, 'Top Up Balance berhasil', result);
    } catch (err) {
      next(err);
    }
  }

  async transaction(req, res, next) {
    try {
      // Validate input
      const { error, value } = validateTransaction(req.body);
      if (error) {
        return sendError(res, 400, statusCodes.INVALID_PARAMETER, error.details[0].message);
      }

      const result = await transactionService.transaction(req.user.email, value.service_code);
      return sendSuccess(res, 200, 'Transaksi berhasil', result);
    } catch (err) {
      next(err);
    }
  }

  async getTransactionHistory(req, res, next) {
    try {
      // Validate input
      const { error, value } = validateTransactionHistory(req.query);
      if (error) {
        return sendError(res, 400, statusCodes.INVALID_PARAMETER, error.details[0].message);
      }

      const result = await transactionService.getTransactionHistory(req.user.email, value.limit, value.offset);
      return sendSuccess(res, 200, 'Get History Berhasil', result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TransactionController();
