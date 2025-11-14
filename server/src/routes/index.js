// src/routes/index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const informationRoutes = require('./informationRoutes');
const transactionRoutes = require('./transactionRoutes');

// Register routes - GUIDE-2 spec routes
router.use('/auth', authRoutes);
router.use('/information', informationRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;
