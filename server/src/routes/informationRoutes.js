// src/routes/informationRoutes.js
const express = require('express');
const router = express.Router();
const informationController = require('../controllers/informationController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/banner', (req, res, next) => informationController.getBanners(req, res, next));

// Protected routes
router.get('/services', authMiddleware.authenticate, (req, res, next) => {
  informationController.getServices(req, res, next);
});

module.exports = router;
