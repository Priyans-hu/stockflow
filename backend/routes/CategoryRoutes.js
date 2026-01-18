const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const { auth, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Routes for categories
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', authorize('Admin', 'Manager'), categoryController.createCategory);
router.put('/:id', authorize('Admin', 'Manager'), categoryController.updateCategory);
router.delete('/:id', authorize('Admin'), categoryController.deleteCategory);

module.exports = router;
