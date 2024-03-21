import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <header className="header">
            <nav className="navigation">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </nav>
        </header>
    );
};

export default Header;
