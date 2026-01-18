import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const InventoryPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productsAPI.getAll();
            setProducts(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            await productsAPI.delete(productId);
            setProducts(products.filter(p => p._id !== productId));
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting product');
            console.error('Error deleting product:', err);
        }
    };

    if (loading) {
        return <div className="p-6">Loading products...</div>;
    }

    return (
        <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-semibold">Inventory</h1>
                <Link to="/inventory/add-product" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Add New Product
                </Link>
            </div>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
            {products.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                    No products found. Add your first product!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} onDelete={handleDeleteProduct} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default InventoryPage;
