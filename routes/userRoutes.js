const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getProfile, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.get('/profile', protect, getProfile);
router.get('/all', protect, getAllUsers);
router.put('/profile', protect, updateUser);
router.delete('/profile', protect, deleteUser);

module.exports = router;
