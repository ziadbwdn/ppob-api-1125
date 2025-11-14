// src/routes/authRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.post('/registration', (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));

// Protected routes
router.get('/profile', authMiddleware.authenticate, (req, res, next) => {
  authController.getProfile(req, res, next);
});

router.put('/profile/update', authMiddleware.authenticate, (req, res, next) => {
  authController.updateProfile(req, res, next);
});

router.put('/profile/image', authMiddleware.authenticate, upload.single('file'), (req, res, next) => {
  authController.updateProfileImage(req, res, next);
});

module.exports = router;
