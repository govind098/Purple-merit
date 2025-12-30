const { validateEmail, validatePassword } = require('../utils/validators');

describe('Validators', () => {
    describe('validateEmail', () => {
        test('should validate correct email format', () => {
            expect(validateEmail('test@example.com')).toBe(true);
            expect(validateEmail('user.name@domain.co.uk')).toBe(true);
        });

        test('should reject invalid email format', () => {
            expect(validateEmail('invalid.email')).toBe(false);
            expect(validateEmail('invalid@')).toBe(false);
            expect(validateEmail('@example.com')).toBe(false);
            expect(validateEmail('invalid @example.com')).toBe(false);
        });

        test('should reject empty email', () => {
            expect(validateEmail('')).toBe(false);
        });
    });

    describe('validatePassword', () => {
        test('should accept strong password', () => {
            const result = validatePassword('ValidPass123');
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        test('should reject password shorter than 6 characters', () => {
            const result = validatePassword('Pass1');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must be at least 6 characters');
        });

        test('should reject password without uppercase letter', () => {
            const result = validatePassword('validpass123');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must contain at least one uppercase letter');
        });

        test('should reject password without lowercase letter', () => {
            const result = validatePassword('VALIDPASS123');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must contain at least one lowercase letter');
        });

        test('should reject password without number', () => {
            const result = validatePassword('ValidPass');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must contain at least one number');
        });

        test('should list all errors for completely invalid password', () => {
            const result = validatePassword('pass');
            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThan(1);
        });
    });
});