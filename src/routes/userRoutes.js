// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// All user routes require authentication
router.use(authMiddleware.authenticate);

router.post('/', (req, res, next) => userController.create(req, res, next));
router.get('/', (req, res, next) => userController.findAll(req, res, next));
router.get('/:id', (req, res, next) => userController.findOne(req, res, next));
router.patch('/:id', (req, res, next) => userController.update(req, res, next));
router.delete('/:id', (req, res, next) => userController.delete(req, res, next));

module.exports = router;
