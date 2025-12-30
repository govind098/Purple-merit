const { authMiddleware, checkAdmin } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Mock next function
const mockNext = jest.fn();

describe('Auth Middleware', () => {
    let req, res;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        mockNext.mockClear();
        process.env.JWT_SECRET = 'test_secret_key';
    });

    describe('authMiddleware', () => {
        test('should reject request without token', () => {
            authMiddleware(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'No token provided'
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should reject request with invalid token', () => {
            req.headers.authorization = 'Bearer invalid.token.here';

            authMiddleware(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Invalid or expired token'
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should accept valid token and set user in request', () => {
            const userId = 'test_user_123';
            const token = jwt.sign({ id: userId }, 'test_secret_key');
            req.headers.authorization = `Bearer ${token}`;

            authMiddleware(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(req.user).toBeDefined();
            expect(req.user.id).toBe(userId);
        });
    });

    describe('checkAdmin', () => {
        test('should reject non-admin users', () => {
            req.user = { id: 'user123', role: 'user' };

            checkAdmin(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Access denied. Admin role required'
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should allow admin users', () => {
            req.user = { id: 'admin123', role: 'admin' };

            checkAdmin(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });
    });
});