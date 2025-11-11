// src/routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// All profile routes require authentication
router.use(authMiddleware.authenticate);

router.post('/', (req, res, next) => profileController.create(req, res, next));
router.get('/', (req, res, next) => profileController.findAll(req, res, next));
router.get('/me', (req, res, next) => {
  profileController.findByUserId(req, res, next);
});
router.get('/search', (req, res, next) => profileController.searchByName(req, res, next));
router.get('/stats/count', (req, res, next) => profileController.getProfileCount(req, res, next));
router.get('/:id', (req, res, next) => profileController.findOne(req, res, next));
router.patch('/:id', (req, res, next) => profileController.update(req, res, next));
router.delete('/:id', (req, res, next) => profileController.delete(req, res, next));

module.exports = router;
