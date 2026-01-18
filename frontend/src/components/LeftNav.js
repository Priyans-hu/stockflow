import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const LeftNav = ({ onLogout }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const isActive = (path) => {
        // if (path === '/' && location.pathname === '/') {
        //     return true;
        // } else if (path === '/') {
        //     return false;
        // }
        return location.pathname.startsWith(path);
    };
    

    return (
        <nav className={`bg-gray-800 bg-opacity-30 text-white w-64 h-screen lg:w-[15%] flex flex-col ${collapsed ? 'collapsed' : ''}`}>
            <div className="flex items-center justify-between p-4 border-gray-700 text-black">
                <h1 className="text-2xl font-bold">StockFlow</h1>
                <button onClick={toggleCollapse} className="focus:outline-none">
                    {collapsed ? (
                        <i className="fas fa-bars"></i>
                    ) : (
                        <i className="fas fa-chevron-left"></i>
                    )}
                </button>
            </div>
            <nav className="py-2 flex-1 text-black">
                <ul>
                    <li>
                        <a href="/dashboard" className={`block m-4 p-4 hover:bg-gray-800 rounded-xl hover:text-white ${isActive('/dashboard') ? 'bg-gray-900 text-white font-bold' : ''}`}>
                            <i class="fa-solid fa-house mr-3"></i>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/inventory" className={`block m-4 p-4 hover:bg-gray-800 rounded-xl hover:text-white ${isActive('/inventory') ? 'bg-gray-900 text-white font-bold' : ''}`}>
                            <i class="fa-solid fa-cart-flatbed mr-3"></i>
                            Inventory/Products
                        </a>
                    </li>
                    <li>
                        <a href="/categories" className={`block m-4 p-4 hover:bg-gray-800 rounded-xl hover:text-white ${isActive('/categories') ? 'bg-gray-900 text-white font-bold' : ''}`}>
                            <i class="fa-solid fa-table-list mr-3"></i>
                            Categories
                        </a>
                    </li>
                    <li>
                        <a href="/orders" className={`block m-4 p-4 hover:bg-gray-800 rounded-xl hover:text-white ${isActive('/orders') ? 'bg-gray-900 text-white font-bold' : ''}`}>
                            <i class="fa-solid fa-chart-line mr-3"></i>
                            Orders
                        </a>
                    </li>
                    <li>
                        <a href="/transactions" className={`block m-4 p-4 hover:bg-gray-800 rounded-xl hover:text-white ${isActive('/transactions') ? 'bg-gray-900 text-white font-bold' : ''}`}>
                            <i class="fa-solid fa-money-bill-trend-up mr-3"></i>
                            Transactions
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={onLogout}
                    className="w-full p-4 text-left text-black hover:bg-red-600 hover:text-white rounded-xl transition-colors"
                >
                    <i className="fa-solid fa-right-from-bracket mr-3"></i>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default LeftNav;
