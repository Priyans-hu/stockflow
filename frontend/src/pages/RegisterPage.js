import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import registerImg from '../images/warehouse-management-software.png';

const RegisterPage = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setIsAuthenticated(true);
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='fixed w-screen py-4 px-2 bg-gray-900 text-white flex justify-between'>
                <div className='container mx-auto flex items-center'>
                    <Link to="/" className="text-2xl md:text-4xl font-semibold">StockFlow</Link>
                </div>
            </div>

            <div className="flex h-screen">
                <div className="w-1/2 bg-gray-200 flex justify-center items-center">
                    <img src={registerImg} alt="Register" className="max-w-2xl" />
                </div>

                <div className="w-1/2 flex justify-center items-center">
                    <div className="w-1/2 max-w-2xl p-8 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Create Account</h2>
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex items-center border rounded-lg">
                                <span className="px-3">
                                    <i className="fa fa-user text-gray-500"></i>
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full py-3 px-4 outline-none"
                                    required
                                />
                            </div>
                            <div className="flex items-center border rounded-lg">
                                <span className="px-3">
                                    <i className="fa fa-envelope text-gray-500"></i>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full py-3 px-4 outline-none"
                                    required
                                />
                            </div>
                            <div className="flex items-center border rounded-lg">
                                <span className="px-3">
                                    <i className="fa fa-lock text-gray-500"></i>
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full py-3 px-4 outline-none"
                                    required
                                />
                            </div>
                            <div className="flex items-center border rounded-lg">
                                <span className="px-3">
                                    <i className="fa fa-lock text-gray-500"></i>
                                </span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full py-3 px-4 outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
                            >
                                {loading ? 'Creating account...' : 'Register'}
                            </button>
                        </form>
                        <p className="mt-4 text-center text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
