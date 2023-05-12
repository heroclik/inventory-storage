const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get user by ID
router.get('/:userId', authenticateToken, userController.getUserById);

// Update user
router.put('/:userId', authenticateToken, userController.updateUser);

module.exports = router;
