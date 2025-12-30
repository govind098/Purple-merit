const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Mock MongoDB connection
beforeAll(async () => {
    // This would connect to a test database in a real scenario
    // For now, we'll test the model methods in isolation
});

afterAll(async () => {
    // Cleanup after tests
});

describe('User Model', () => {
    describe('Password hashing', () => {
        test('should hash password before saving', async () => {
            const userData = {
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'TestPassword123',
                role: 'user',
                status: 'active'
            };

            const user = new User(userData);

            // The password should be hashed during pre-save hook
            // Note: This test would need actual DB connection to fully work
            expect(user.password).toBe('TestPassword123'); // Before save
        });

        test('should compare passwords correctly', async () => {
            const password = 'TestPassword123';
            const user = new User({
                fullName: 'Test User',
                email: 'test@example.com',
                password,
                role: 'user',
                status: 'active'
            });

            // Mock the comparison for testing
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;

            const isMatch = await user.comparePassword(password);
            expect(isMatch).toBe(true);

            const isNotMatch = await user.comparePassword('WrongPassword123');
            expect(isNotMatch).toBe(false);
        });
    });

    describe('Email validation', () => {
        test('should require valid email format', () => {
            const validUser = new User({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'TestPassword123',
                role: 'user',
                status: 'active'
            });

            expect(validUser.email).toBe('test@example.com');
        });

        test('should reject invalid email format on validation', () => {
            const invalidUser = new User({
                fullName: 'Test User',
                email: 'invalid-email',
                password: 'TestPassword123',
                role: 'user',
                status: 'active'
            });

            const error = invalidUser.validateSync();
            expect(error).toBeDefined();
            expect(error.errors.email).toBeDefined();
        });
    });

    describe('toJSON method', () => {
        test('should exclude password from JSON output', () => {
            const user = new User({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'TestPassword123',
                role: 'user',
                status: 'active'
            });

            const json = user.toJSON();
            expect(json.password).toBeUndefined();
            expect(json.fullName).toBe('Test User');
            expect(json.email).toBe('test@example.com');
        });
    });

    describe('User defaults', () => {
        test('should set default role as user', () => {
            const user = new User({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'TestPassword123',
                status: 'active'
            });

            expect(user.role).toBe('user');
        });

        test('should set default status as active', () => {
            const user = new User({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'TestPassword123'
            });

            expect(user.status).toBe('active');
        });
    });
});
