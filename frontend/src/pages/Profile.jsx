import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import NavBar from '../components/NavBar';
import '../styles/profile.css';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, isEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [editData, setEditData] = useState({ fullName: '', email: '' });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setEditData({ fullName: userData.fullName, email: userData.email });
    }, [navigate]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await userAPI.updateUserProfile(user._id, editData);
            const updatedUser = response.data.user;
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setMessage('Profile updated successfully');
            isEditingProfile(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            await userAPI.changePassword(user._id, passwordData);
            setMessage('Password changed successfully');
            setIsChangingPassword(false);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar />
            <div className="profile-container">
                <div className="profile-card">
                    <h1>My Profile</h1>

                    {message && <div className="success-message">{message}</div>}
                    {error && <div className="error-message">{error}</div>}

                    {isEditing ? (
                        <form onSubmit={handleUpdateProfile} className="profile-form">
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={editData.fullName}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className="button-group">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => isEditingProfile(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="profile-info">
                            <div className="info-item">
                                <label>Full Name:</label>
                                <p>{user.fullName}</p>
                            </div>
                            <div className="info-item">
                                <label>Email:</label>
                                <p>{user.email}</p>
                            </div>
                            <div className="info-item">
                                <label>Role:</label>
                                <p>{user.role}</p>
                            </div>
                            <div className="info-item">
                                <label>Status:</label>
                                <p>{user.status}</p>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={() => isEditingProfile(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}

                    <hr style={{ margin: '30px 0' }} />

                    {isChangingPassword ? (
                        <form onSubmit={handleChangePassword} className="profile-form">
                            <h2>Change Password</h2>
                            <div className="form-group">
                                <label htmlFor="currentPassword">Current Password</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="button-group">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Changing...' : 'Change Password'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsChangingPassword(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            className="btn btn-secondary"
                            onClick={() => setIsChangingPassword(true)}
                        >
                            Change Password
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
