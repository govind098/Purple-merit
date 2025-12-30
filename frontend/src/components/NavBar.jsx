import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/navbar.css';

export default function NavBar() {
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    // Only show sidebar on dashboard pages
    const isOnDashboard = ['/profile', '/admin-dashboard'].includes(window.location.pathname);

    if (!user || !isOnDashboard) {
        return null;
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">App</div>
            </div>

            <div className="user-profile-sidebar">
                <div className="user-avatar">{user.fullName.charAt(0).toUpperCase()}</div>
                <div className="user-details">
                    <p className="user-name">{user.fullName}</p>
                    <p className="user-role">{user.role === 'admin' ? '👨‍💼 Admin' : '👤 User'}</p>
                </div>
            </div>

            <nav className="sidebar-menu">
                <ul>
                    <li className="menu-item">
                        <a href="/profile" className={window.location.pathname === '/profile' ? 'active' : ''}>
                            <span className="icon">👤</span>
                            <span className="label">Profile</span>
                        </a>
                    </li>
                    {user.role === 'admin' && (
                        <li className="menu-item">
                            <a href="/admin-dashboard" className={window.location.pathname === '/admin-dashboard' ? 'active' : ''}>
                                <span className="icon">📊</span>
                                <span className="label">Dashboard</span>
                            </a>
                        </li>
                    )}
                </ul>
            </nav>

            <button onClick={handleLogout} className="sidebar-logout">
                <span className="icon">🚪</span>
                <span className="label">Logout</span>
            </button>
        </aside>
    );
}
