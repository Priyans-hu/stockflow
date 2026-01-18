require('dotenv').config();

const dbConfig = {
    dbURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/stockflow',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

module.exports = dbConfig;
