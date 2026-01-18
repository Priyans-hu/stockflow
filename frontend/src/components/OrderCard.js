import React from 'react';

const OrderCard = ({ order, onDelete }) => {
    const handleDelete = () => {
        onDelete(order._id);
    };

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Order #{order._id?.slice(-6) || 'N/A'}</h2>
            <p className="text-gray-600">Products: {order.products?.length || 0}</p>
            <p className="text-gray-600">Total: ${order.totalPrice?.toFixed(2) || '0.00'}</p>
            {order.status && (
                <p className="text-gray-600">Status: {order.status}</p>
            )}
            <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
            >
                Delete
            </button>
        </div>
    );
};

export default OrderCard;
