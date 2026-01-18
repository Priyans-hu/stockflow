const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const { auth, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Routes for products
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', authorize('Admin', 'Manager'), productController.createProduct);
router.put('/:id', authorize('Admin', 'Manager'), productController.updateProduct);
router.delete('/:id', authorize('Admin'), productController.deleteProduct);

module.exports = router;
