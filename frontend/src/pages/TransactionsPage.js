import React, { useState, useEffect } from 'react';
import { transactionsAPI } from '../services/api';
import TransactionCard from '../components/TransactionCard';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await transactionsAPI.getAll();
            setTransactions(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching transactions');
            console.error('Error fetching transactions:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    if (loading) {
        return <div className="p-6">Loading transactions...</div>;
    }

    return (
        <div className="flex flex-col p-6">
            <h1 className="text-3xl font-semibold mb-4">Transactions</h1>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
            {transactions.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                    No transactions found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {transactions.map(transaction => (
                        <TransactionCard key={transaction._id} transaction={transaction} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;
