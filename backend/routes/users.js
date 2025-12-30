const express = require('express');
const {
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    changePassword,
    activateUser,
    deactivateUser
} = require('../controllers/userController');
const { authMiddleware, checkAdmin } = require('../middleware/auth');

const router = express.Router();

// Admin routes
router.get('/', authMiddleware, checkAdmin, getAllUsers);
router.put('/activate/:id', authMiddleware, checkAdmin, activateUser);
router.put('/deactivate/:id', authMiddleware, checkAdmin, deactivateUser);

// User routes
router.get('/profile/:id', authMiddleware, getUserProfile);
router.put('/profile/:id', authMiddleware, updateUserProfile);
router.put('/change-password/:id', authMiddleware, changePassword);

module.exports = router;
