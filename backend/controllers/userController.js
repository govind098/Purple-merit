const User = require('../models/User');
const { validatePassword } = require('../utils/validators');

// @desc    Get all users (Admin only)
// @route   GET /api/users?page=1&limit=10
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Only return users with role 'user' for admin dashboard
        const filter = { role: 'user' };
        const users = await User.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(filter);
        const pages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            users,
            pagination: {
                total,
                pages,
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if user can access this profile
        if (req.user.id !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
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

// @desc    Update user profile
// @route   PUT /api/users/profile/:id
// @access  Private
exports.updateUserProfile = async (req, res) => {
    try {
        const { fullName, email } = req.body;

        // Check if user can update this profile
        if (req.user.id !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if email is already in use
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email already in use' });
            }
        }

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: user.toJSON()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
};

// @desc    Change password
// @route   PUT /api/users/change-password/:id
// @access  Private
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // Check if user can change password
        if (req.user.id !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        // Validate required fields
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const user = await User.findById(req.params.id).select('+password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }

        // Validate password strength
        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Password does not meet requirements',
                errors: passwordValidation.errors
            });
        }

        // Check password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error changing password',
            error: error.message
        });
    }
};

// @desc    Activate user (Admin only)
// @route   PUT /api/users/activate/:id
// @access  Private/Admin
exports.activateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: 'active' },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'User activated successfully',
            user: user.toJSON()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error activating user',
            error: error.message
        });
    }
};

// @desc    Deactivate user (Admin only)
// @route   PUT /api/users/deactivate/:id
// @access  Private/Admin
exports.deactivateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: 'inactive' },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'User deactivated successfully',
            user: user.toJSON()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deactivating user',
            error: error.message
        });
    }
};
