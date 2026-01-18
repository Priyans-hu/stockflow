const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { auth, authorize } = require('../middleware/auth');
const { userValidation, mongoIdValidation } = require('../middleware/validate');

// Public auth routes
router.post('/register', userValidation.register, userController.register);
router.post('/login', userValidation.login, userController.login);

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.get('/', auth, authorize('Admin'), userController.getAllUsers);
router.get('/:id', auth, mongoIdValidation, userController.getUserById);
router.post('/', auth, authorize('Admin'), userValidation.register, userController.createUser);
router.put('/:id', auth, mongoIdValidation, userController.updateUser);
router.delete('/:id', auth, authorize('Admin'), mongoIdValidation, userController.deleteUser);

module.exports = router;
