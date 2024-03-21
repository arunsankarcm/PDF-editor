import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext';

const LogoutHeader = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <nav className="navigation">
                <button onClick={handleLogout} className="button-style">Logout</button>
            </nav>
        </header>
    );
};

export default LogoutHeader;
