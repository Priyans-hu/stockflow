require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// DB connection imports
const { connectToDatabase } = require('./config/dbConnection');

// Custom routes imports
const productRoutes = require('./routes/ProductRoutes');
const userRoutes = require('./routes/UserRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const categoryRoutes = require('./routes/CategoryRoutes');
const transactionRoutes = require('./routes/TransactionRoutes');
const inventoryRoutes = require('./routes/InventoryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

connectToDatabase();

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes);
app.use('/transactions', transactionRoutes);
app.use('/inventory', inventoryRoutes);

// Default route
app.get('/', (req, res) => {
    res.json({
        message: 'StockFlow API',
        version: '1.0.0',
        docs: '/api-docs',
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`[Error] ${err.message}`);
    console.error(err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation error',
            errors: Object.values(err.errors).map(e => e.message),
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            message: `${field} already exists`,
        });
    }

    // JWT errors are handled in auth middleware

    // Default error response
    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});