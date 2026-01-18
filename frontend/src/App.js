import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LeftNav from './components/LeftNav';
import Footer from './components/Footer';
import Header from './components/Header';

import Dashboard from './pages/Dashboard';
import InventoryPage from './pages/Inventory';
import AddProductForm from './components/AddProductForm';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import TransactionsPage from './pages/TransactionsPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing token on app load
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <Router>
            <div>
                {isAuthenticated ? (
                    <div className='flex overflow-x-hidden'>
                        <LeftNav onLogout={handleLogout} />
                        <div className='lg:w-[85%]'>
                            <div className='h-screen'>
                                <Header />
                                <main>
                                    <Routes>
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/inventory" element={<InventoryPage />} />
                                        <Route path="/inventory/add-product" element={<AddProductForm />} />
                                        <Route path="/categories" element={<CategoriesPage />} />
                                        <Route path="/orders" element={<OrdersPage />} />
                                        <Route path="/transactions" element={<TransactionsPage />} />
                                        <Route path="/" element={<Navigate to="/dashboard" />} />
                                        <Route path="*" element={<Navigate to="/dashboard" />} />
                                    </Routes>
                                </main>
                            </div>
                            <Footer />
                        </div>
                    </div>
                ) : (
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
