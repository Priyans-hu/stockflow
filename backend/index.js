require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());

connectToDatabase();

// Custom Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes); 
app.use('/transactions', transactionRoutes); 
app.use('/inventory', inventoryRoutes); 

// Default route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});