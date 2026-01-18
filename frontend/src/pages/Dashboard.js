import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI, ordersAPI, transactionsAPI } from '../services/api';

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalTurnover, setTotalTurnover] = useState(0);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [productsRes, ordersRes, turnoverRes, transactionsRes] = await Promise.all([
                    productsAPI.getAll(),
                    ordersAPI.getAll(),
                    transactionsAPI.getTotalTurnover(),
                    transactionsAPI.getAll(),
                ]);

                setTotalProducts(productsRes.data.length);
                setTotalOrders(ordersRes.data.length);
                setTotalTurnover(turnoverRes.data.totalTurnover || 0);
                setRecentTransactions(transactionsRes.data.slice(0, 5));
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex flex-1">
                <main className="flex-1 p-6">

                    <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2text-gray-800">Total Products</h2>
                            <p className="text-4xl">{totalProducts}</p>
                        </div>

                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2text-gray-800">Total Orders</h2>
                            <p className="text-4xl">{totalOrders}</p>
                        </div>

                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Turnover</h2>
                            <p className="text-4xl">₹ {totalTurnover}</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Data Visualization</h2>
                            {/* Add your chart component here */}
                            {loading ? (
                                <p>Loading chart...</p>
                            ) : (
                                // Add your chart component here. If no data is available, display a blank graph
                                <p>No data available to visualize</p>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
                            {loading ? (
                                <p>Loading...</p>
                            ) : recentTransactions.length > 0 ? (
                                <ul className="text-gray-600 space-y-2">
                                    {recentTransactions.map(transaction => (
                                        <li key={transaction._id} className="flex justify-between">
                                            <span>#{transaction._id?.slice(-6)}</span>
                                            <span className="font-semibold">₹{transaction.totalPrice?.toFixed(2) || '0.00'}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No recent transactions</p>
                            )}
                            <Link to="/transactions" className="text-blue-500 hover:underline">View all transactions</Link>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
