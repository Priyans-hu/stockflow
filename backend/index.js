const app = require('./app');
const { connectToDatabase } = require('./config/dbConnection');

const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});