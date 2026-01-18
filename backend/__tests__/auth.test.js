const request = require('supertest');
const app = require('../app');
const User = require('../models/UserModel');

describe('Auth Endpoints', () => {
    describe('POST /users/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('user');
            expect(res.body.user.email).toBe('test@example.com');
            expect(res.body.user).not.toHaveProperty('password');
        });

        it('should not register user with duplicate email', async () => {
            await User.create({
                username: 'existinguser',
                email: 'existing@example.com',
                password: 'password123',
            });

            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'newuser',
                    email: 'existing@example.com',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toContain('already exists');
        });

        it('should validate required fields', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'testuser',
                });

            expect(res.statusCode).toBe(400);
        });

        it('should validate email format', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'testuser',
                    email: 'invalid-email',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(400);
        });

        it('should validate password length', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: '123',
                });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('POST /users/login', () => {
        beforeEach(async () => {
            await request(app)
                .post('/users/register')
                .send({
                    username: 'loginuser',
                    email: 'login@example.com',
                    password: 'password123',
                });
        });

        it('should login with valid credentials', async () => {
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'login@example.com',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('user');
        });

        it('should not login with wrong password', async () => {
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'login@example.com',
                    password: 'wrongpassword',
                });

            expect(res.statusCode).toBe(401);
        });

        it('should not login with non-existent email', async () => {
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(401);
        });
    });

    describe('GET /users/profile', () => {
        let token;

        beforeEach(async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'profileuser',
                    email: 'profile@example.com',
                    password: 'password123',
                });
            token = res.body.token;
        });

        it('should get user profile with valid token', async () => {
            const res = await request(app)
                .get('/users/profile')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.email).toBe('profile@example.com');
        });

        it('should not get profile without token', async () => {
            const res = await request(app).get('/users/profile');

            expect(res.statusCode).toBe(401);
        });

        it('should not get profile with invalid token', async () => {
            const res = await request(app)
                .get('/users/profile')
                .set('Authorization', 'Bearer invalidtoken');

            expect(res.statusCode).toBe(401);
        });
    });
});
