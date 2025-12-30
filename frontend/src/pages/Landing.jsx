import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

export default function Landing() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Welcome to the App</h1>
                <p>
                    Sign in to continue or create a new account.
                </p>
                <div className="auth-buttons">
                    <Link to="/login" className="btn btn-secondary">Login</Link>
                    <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
