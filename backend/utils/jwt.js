const jwt = require('jsonwebtoken');

const getSecret = () => {
    if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
    if (process.env.NODE_ENV === 'production') {
        throw new Error('JWT_SECRET is not set in production');
    }
    return 'dev-secret'; // safe fallback for local development/tests
};

const generateToken = (userId, role = 'user') => {
    const secret = getSecret();
    return jwt.sign({ id: userId, role }, secret, {
        expiresIn: '30d'
    });
};

const verifyToken = (token) => {
    try {
        const secret = getSecret();
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
