const express = require('express');
const { signup, login, getCurrentUser, logout } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authMiddleware, getCurrentUser);
router.post('/logout', authMiddleware, logout);

module.exports = router;
