import React from 'react';
import './homepage.css';
import Header from './header';

function HomePage() {
    return (
        <>
            <Header /> 
            <div className="homepage">
                <div className="centered-content">
                    <h1>PDF Creator</h1>
                </div>
            </div>
        </>
    );
}

export default HomePage;
