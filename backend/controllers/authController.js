const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { validateEmail, validatePassword } = require('../utils/validators');

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
    try {
        const { email, password, confirmPassword, fullName, role } = req.body;

        // Validate required fields
        if (!email || !password || !confirmPassword || !fullName) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email' });
        }

        // Validate role if provided
        const allowedRoles = ['admin', 'user'];
        const userRole = role && allowedRoles.includes(role) ? role : 'user';

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        // Validate password strength
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Password does not meet requirements',
                errors: passwordValidation.errors
            });
        }

        // Check password match
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        // Create user (respect role if valid, default to 'user')
        user = await User.create({
            fullName,
            email,
            password,
            role: userRole,
            status: 'active'
        });

        // Generate token
        const token = generateToken(user._id, user.role);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: user.toJSON()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if user is active
        if (user.status === 'inactive') {
            return res.status(403).json({ success: false, message: 'Your account has been deactivated' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id, user.role);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: user.toJSON()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: user.toJSON()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging out',
            error: error.message
        });
    }
};
