import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import NavBar from '../components/NavBar';
import '../styles/admin-dashboard.css';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);
    const navigate = useNavigate();

    const loadUsers = async (page = 1) => {
        setLoading(true);
        setError('');
        try {
            const response = await userAPI.getAllUsers(page, 10);
            setUsers(response.data.users);
            setCurrentPage(response.data.pagination.currentPage);
            setTotalPages(response.data.pagination.pages);
        } catch (err) {
            setError('Failed to load users');
            if (err.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }
        const userData = JSON.parse(user);
        if (userData.role !== 'admin') {
            navigate('/profile');
            return;
        }
        loadUsers();
    }, [navigate]);

    const handleActivate = async (userId) => {
        setLoading(true);
        setMessage('');
        setError('');
        try {
            await userAPI.activateUser(userId);
            setMessage('User activated successfully');
            await loadUsers(currentPage);
            setConfirmAction(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to activate user');
        } finally {
            setLoading(false);
        }
    };

    const handleDeactivate = async (userId) => {
        setLoading(true);
        setMessage('');
        setError('');
        try {
            await userAPI.deactivateUser(userId);
            setMessage('User deactivated successfully');
            await loadUsers(currentPage);
            setConfirmAction(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to deactivate user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className="admin-container">
                <div className="admin-card">
                    <h1>User Management Dashboard</h1>

                    {message && <div className="success-message">{message}</div>}
                    {error && <div className="error-message">{error}</div>}

                    {confirmAction && (
                        <div className="modal-overlay" onClick={() => setConfirmAction(null)}>
                            <div className="modal-content" onClick={e => e.stopPropagation()}>
                                <h3>Confirm Action</h3>
                                <p>{confirmAction.message}</p>
                                <div className="modal-buttons">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            if (confirmAction.action === 'activate') {
                                                handleActivate(confirmAction.userId);
                                            } else {
                                                handleDeactivate(confirmAction.userId);
                                            }
                                        }}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setConfirmAction(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {loading && <div className="loading">Loading...</div>}

                    {!loading && users.length > 0 && (
                        <>
                            <div className="table-wrapper">
                                <table className="users-table">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Full Name</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user._id}>
                                                <td>{user.email}</td>
                                                <td>{user.fullName}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <span className={`status ${user.status}`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    {user.status === 'inactive' ? (
                                                        <button
                                                            className="btn btn-small btn-success"
                                                            onClick={() =>
                                                                setConfirmAction({
                                                                    action: 'activate',
                                                                    userId: user._id,
                                                                    message: `Activate user ${user.email}?`
                                                                })
                                                            }
                                                        >
                                                            Activate
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-small btn-danger"
                                                            onClick={() =>
                                                                setConfirmAction({
                                                                    action: 'deactivate',
                                                                    userId: user._id,
                                                                    message: `Deactivate user ${user.email}?`
                                                                })
                                                            }
                                                        >
                                                            Deactivate
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="pagination">
                                <button
                                    onClick={() => loadUsers(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="btn btn-secondary"
                                >
                                    Previous
                                </button>
                                <span className="page-info">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => loadUsers(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="btn btn-secondary"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {!loading && users.length === 0 && (
                        <p className="no-users">No users found</p>
                    )}
                </div>
            </div>
        </>
    );
}
