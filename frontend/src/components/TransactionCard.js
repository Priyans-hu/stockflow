import React from 'react';

const TransactionCard = ({ transaction }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">
                Transaction #{transaction._id?.slice(-6) || 'N/A'}
            </h2>
            <p className="text-gray-600">Type: {transaction.type || 'N/A'}</p>
            <p className="text-gray-600">Amount: ${transaction.amount?.toFixed(2) || '0.00'}</p>
            <p className="text-gray-600">Date: {formatDate(transaction.date || transaction.createdAt)}</p>
            {transaction.description && (
                <p className="text-gray-600">Note: {transaction.description}</p>
            )}
        </div>
    );
};

export default TransactionCard;
