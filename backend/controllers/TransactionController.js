// controllers/TransactionController.js
const Transaction = require('../models/TransactionModel');

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTransaction = async (req, res) => {
    try {
        const { user, products, totalPrice, transactionDate } = req.body;

        // Validate required fields
        if (!user || !products || !totalPrice) {
            return res.status(400).json({ message: 'User, products, and totalPrice are required for creating a transaction' });
        }

        const newTransaction = new Transaction({ user, products, totalPrice, transactionDate });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true },
        );
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get total turnover (sum of all transaction amounts)
const getTotalTurnover = async (req, res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $group: {
                    _id: null,
                    totalTurnover: { $sum: '$totalPrice' },
                    count: { $sum: 1 },
                },
            },
        ]);

        const totalTurnover = result.length > 0 ? result[0].totalTurnover : 0;
        const transactionCount = result.length > 0 ? result[0].count : 0;

        res.json({ totalTurnover, transactionCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get dashboard analytics
const getDashboardAnalytics = async (req, res) => {
    try {
        const [turnoverResult, recentTransactions] = await Promise.all([
            Transaction.aggregate([
                {
                    $group: {
                        _id: null,
                        totalTurnover: { $sum: '$totalPrice' },
                        count: { $sum: 1 },
                    },
                },
            ]),
            Transaction.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate('user', 'username'),
        ]);

        res.json({
            totalTurnover: turnoverResult.length > 0 ? turnoverResult[0].totalTurnover : 0,
            transactionCount: turnoverResult.length > 0 ? turnoverResult[0].count : 0,
            recentTransactions,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTotalTurnover,
    getDashboardAnalytics,
};
