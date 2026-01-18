const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { auth, authorize } = require('../middleware/auth');

// Public auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.get('/', auth, authorize('Admin'), userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.post('/', auth, authorize('Admin'), userController.createUser);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, authorize('Admin'), userController.deleteUser);

module.exports = router;
