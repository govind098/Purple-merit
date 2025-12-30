const { generateToken, verifyToken } = require('../utils/jwt');

describe('JWT Utils', () => {
    // Set JWT_SECRET for testing
    const originalSecret = process.env.JWT_SECRET;

    beforeAll(() => {
        process.env.JWT_SECRET = 'test_jwt_secret_key';
    });

    afterAll(() => {
        process.env.JWT_SECRET = originalSecret;
    });

    describe('generateToken', () => {
        test('should generate a valid token', () => {
            const userId = 'test_user_123';
            const token = generateToken(userId);

            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
        });

        test('should generate different tokens for different users', () => {
            const token1 = generateToken('user1');
            const token2 = generateToken('user2');

            expect(token1).not.toBe(token2);
        });
    });

    describe('verifyToken', () => {
        test('should verify a valid token', () => {
            const userId = 'test_user_123';
            const token = generateToken(userId);
            const decoded = verifyToken(token);

            expect(decoded).toBeDefined();
            expect(decoded.id).toBe(userId);
        });

        test('should return null for invalid token', () => {
            const token = 'invalid.token.here';
            const decoded = verifyToken(token);

            expect(decoded).toBeNull();
        });

        test('should return null for malformed token', () => {
            const result = verifyToken('not.a.valid.token');
            expect(result).toBeNull();
        });
    });
});