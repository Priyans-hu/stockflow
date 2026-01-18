const { body, param, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg,
            })),
        });
    }
    next();
};

// User validation rules
const userValidation = {
    register: [
        body('username')
            .trim()
            .notEmpty().withMessage('Username is required')
            .isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters'),
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email format')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('role')
            .optional()
            .isIn(['Admin', 'Manager', 'Staff']).withMessage('Invalid role'),
        handleValidationErrors,
    ],
    login: [
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email format'),
        body('password')
            .notEmpty().withMessage('Password is required'),
        handleValidationErrors,
    ],
};

// Product validation rules
const productValidation = {
    create: [
        body('name')
            .trim()
            .notEmpty().withMessage('Product name is required'),
        body('sku')
            .trim()
            .notEmpty().withMessage('SKU is required'),
        body('price')
            .notEmpty().withMessage('Price is required')
            .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('quantity')
            .optional()
            .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
        body('category')
            .notEmpty().withMessage('Category is required')
            .isMongoId().withMessage('Invalid category ID'),
        handleValidationErrors,
    ],
    update: [
        param('id').isMongoId().withMessage('Invalid product ID'),
        body('price')
            .optional()
            .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('quantity')
            .optional()
            .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
        body('category')
            .optional()
            .isMongoId().withMessage('Invalid category ID'),
        handleValidationErrors,
    ],
};

// Category validation rules
const categoryValidation = {
    create: [
        body('name')
            .trim()
            .notEmpty().withMessage('Category name is required')
            .isLength({ min: 2, max: 50 }).withMessage('Category name must be 2-50 characters'),
        handleValidationErrors,
    ],
};

// Order validation rules
const orderValidation = {
    create: [
        body('products')
            .isArray({ min: 1 }).withMessage('At least one product is required'),
        body('totalPrice')
            .notEmpty().withMessage('Total price is required')
            .isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
        handleValidationErrors,
    ],
};

// MongoDB ID validation
const mongoIdValidation = [
    param('id').isMongoId().withMessage('Invalid ID format'),
    handleValidationErrors,
];

module.exports = {
    handleValidationErrors,
    userValidation,
    productValidation,
    categoryValidation,
    orderValidation,
    mongoIdValidation,
};
