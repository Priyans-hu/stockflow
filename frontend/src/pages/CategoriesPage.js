import React, { useState, useEffect } from 'react';
import { categoriesAPI } from '../services/api';
import CategoryCard from '../components/CategoryCard';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [adding, setAdding] = useState(false);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await categoriesAPI.getAll();
            setCategories(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching categories');
            console.error('Error fetching categories:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDeleteCategory = async (categoryId) => {
        if (!window.confirm('Are you sure you want to delete this category?')) {
            return;
        }

        try {
            await categoriesAPI.delete(categoryId);
            setCategories(categories.filter(c => c._id !== categoryId));
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting category');
            console.error('Error deleting category:', err);
        }
    };

    const handleAddCategory = async () => {
        if (newCategoryName.trim() === '') return;

        try {
            setAdding(true);
            const response = await categoriesAPI.create({ name: newCategoryName });
            setCategories([...categories, response.data]);
            setNewCategoryName('');
        } catch (err) {
            alert(err.response?.data?.message || 'Error adding category');
            console.error('Error adding category:', err);
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return <div className="p-6">Loading categories...</div>;
    }

    return (
        <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-semibold">Categories</h1>
                <div className="flex items-center">
                    <input
                        type="text"
                        className="border border-gray-300 p-2 rounded mr-2"
                        placeholder="New Category Name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                    />
                    <button
                        onClick={handleAddCategory}
                        disabled={adding || !newCategoryName.trim()}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:bg-green-300"
                    >
                        {adding ? 'Adding...' : 'Add New Category'}
                    </button>
                </div>
            </div>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
            {categories.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                    No categories found. Add your first category!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map(category => (
                        <CategoryCard key={category._id} category={category} onDelete={handleDeleteCategory} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
