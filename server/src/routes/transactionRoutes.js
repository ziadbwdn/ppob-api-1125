// src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

// All protected routes
router.get('/balance', authMiddleware.authenticate, (req, res, next) => {
  transactionController.getBalance(req, res, next);
});

router.post('/topup', authMiddleware.authenticate, (req, res, next) => {
  transactionController.topup(req, res, next);
});

router.post('/transaction', authMiddleware.authenticate, (req, res, next) => {
  transactionController.transaction(req, res, next);
});

router.get('/transaction/history', authMiddleware.authenticate, (req, res, next) => {
  transactionController.getTransactionHistory(req, res, next);
});

module.exports = router;
