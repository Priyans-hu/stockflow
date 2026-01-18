const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/InventoryController');
const { auth, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Routes for inventory
router.get('/', inventoryController.getAllInventory);
router.get('/:id', inventoryController.getInventoryById);
router.post('/', authorize('Admin', 'Manager'), inventoryController.createInventory);
router.put('/:id', authorize('Admin', 'Manager'), inventoryController.updateInventory);
router.delete('/:id', authorize('Admin'), inventoryController.deleteInventory);

module.exports = router;