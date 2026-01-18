import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';
import OrderCard from '../components/OrderCard';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await ordersAPI.getAll();
            setOrders(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching orders');
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm('Are you sure you want to delete this order?')) {
            return;
        }

        try {
            await ordersAPI.delete(orderId);
            setOrders(orders.filter(o => o._id !== orderId));
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting order');
            console.error('Error deleting order:', err);
        }
    };

    if (loading) {
        return <div className="p-6">Loading orders...</div>;
    }

    return (
        <div className="flex flex-col p-6">
            <h1 className="text-3xl font-semibold mb-4">Orders</h1>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
            {orders.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                    No orders found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {orders.map(order => (
                        <OrderCard key={order._id} order={order} onDelete={handleDeleteOrder} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
