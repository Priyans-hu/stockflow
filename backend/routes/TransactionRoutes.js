const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/TransactionController');
const { auth, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Analytics routes (must come before /:id)
router.get('/analytics/total-turnover', transactionController.getTotalTurnover);
router.get('/analytics/dashboard', transactionController.getDashboardAnalytics);

// Routes for transactions
router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransactionById);
router.post('/', authorize('Admin', 'Manager'), transactionController.createTransaction);
router.put('/:id', authorize('Admin', 'Manager'), transactionController.updateTransaction);
router.delete('/:id', authorize('Admin'), transactionController.deleteTransaction);

module.exports = router;
