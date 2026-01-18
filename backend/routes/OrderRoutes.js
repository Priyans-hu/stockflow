const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const { auth, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Routes for orders
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', authorize('Admin', 'Manager'), orderController.createOrder);
router.put('/:id', authorize('Admin', 'Manager'), orderController.updateOrder);
router.delete('/:id', authorize('Admin'), orderController.deleteOrder);

module.exports = router;
