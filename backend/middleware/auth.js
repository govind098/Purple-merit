const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

const adminMiddleware = (req, res, next) => {
    authMiddleware(req, res, () => {
        // This is a placeholder to continue to the admin check
        next();
    });
};

const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Admin role required' });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware, checkAdmin };
