import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { productsAPI, categoriesAPI } from '../services/api';

const AddProductForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sku: '',
        price: '',
        quantity: '',
        category: '',
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoriesAPI.getAll();
                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const productData = {
                name: formData.name,
                description: formData.description,
                sku: formData.sku,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity, 10),
                category: formData.category,
            };

            await productsAPI.create(productData);
            setSuccess('Product added successfully!');

            // Reset form
            setFormData({
                name: '',
                description: '',
                sku: '',
                price: '',
                quantity: '',
                category: '',
            });

            // Redirect after short delay
            setTimeout(() => navigate('/inventory'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding product');
            console.error('Error adding product:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-6'>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-semibold">Add Product</h2>
                <Link
                    to="/inventory"
                    className="text-gray-600 hover:text-gray-800"
                >
                    Back to Inventory
                </Link>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded max-w-md mx-auto">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded max-w-md mx-auto">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="border border-gray-200 rounded-md p-4 flex flex-col items-center m-auto md:w-[50%] bg-white shadow-sm">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mb-2 block w-full border border-gray-300 rounded-md p-2"
                    required
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mb-2 block w-full border border-gray-300 rounded-md p-2"
                />

                <input
                    type="text"
                    name="sku"
                    placeholder="SKU"
                    value={formData.sku}
                    onChange={handleChange}
                    className="mb-2 block w-full border border-gray-300 rounded-md p-2"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="mb-2 block w-full border border-gray-300 rounded-md p-2"
                    min="0"
                    step="0.01"
                    required
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="mb-2 block w-full border border-gray-300 rounded-md p-2"
                    min="0"
                    required
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mb-2 block w-full border border-gray-300 rounded-md p-2"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full disabled:bg-green-300"
                >
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
