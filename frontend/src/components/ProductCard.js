import React from 'react';

const ProductCard = ({ product, onDelete }) => {
    const handleDelete = () => {
        onDelete(product._id);
    };

    return (
        <div className="border border-gray-200 rounded-md p-4 mb-4 bg-white shadow-sm">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">SKU: {product.sku || 'N/A'}</p>
            <p className="text-gray-600">Price: ${product.price?.toFixed(2) || '0.00'}</p>
            <p className="text-gray-600">Quantity: {product.quantity || 0}</p>
            {product.category && (
                <p className="text-gray-600">Category: {product.category.name || product.category}</p>
            )}
            <button
                onClick={handleDelete}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
                Delete
            </button>
        </div>
    );
};

export default ProductCard;
