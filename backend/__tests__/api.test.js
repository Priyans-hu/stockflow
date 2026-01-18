const request = require('supertest');
const app = require('../app');

describe('API Endpoints', () => {
    describe('GET /', () => {
        it('should return API info', async () => {
            const res = await request(app).get('/');

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('StockFlow API');
            expect(res.body.version).toBe('1.0.0');
        });
    });

    describe('GET /health', () => {
        it('should return health status', async () => {
            const res = await request(app).get('/health');

            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('ok');
            expect(res.body).toHaveProperty('timestamp');
        });
    });

    describe('404 Handler', () => {
        it('should return 404 for unknown routes', async () => {
            const res = await request(app).get('/unknown-route');

            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe('Route not found');
        });
    });

    describe('Protected Routes', () => {
        it('should require authentication for /products', async () => {
            const res = await request(app).get('/products');

            expect(res.statusCode).toBe(401);
        });

        it('should require authentication for /categories', async () => {
            const res = await request(app).get('/categories');

            expect(res.statusCode).toBe(401);
        });

        it('should require authentication for /orders', async () => {
            const res = await request(app).get('/orders');

            expect(res.statusCode).toBe(401);
        });

        it('should require authentication for /transactions', async () => {
            const res = await request(app).get('/transactions');

            expect(res.statusCode).toBe(401);
        });

        it('should require authentication for /inventory', async () => {
            const res = await request(app).get('/inventory');

            expect(res.statusCode).toBe(401);
        });
    });
});
