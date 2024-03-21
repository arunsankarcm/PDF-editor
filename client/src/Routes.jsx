import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './authcontext';
import ProtectedRoute from './protectedroute';
import HomePage from "./homepage";
import Signup from "./signup";
import Login from "./login";
import UserPdfs from "./pdflist";

const PathRoutes = () => {
    return(
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/list"
                        element={
                            <ProtectedRoute>
                                <UserPdfs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/app"
                        element={
                            <ProtectedRoute>
                                <App />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>

    )
}

export default PathRoutes;