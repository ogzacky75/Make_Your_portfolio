import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ user = { name: 'Jasmine Keith', email: 'jasmineK@gmail.com' } }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home', path: '/' },
    { id: 'templates', label: 'Templates', icon: 'fas fa-palette', path: '/templates' },
    { id: 'favorites', label: 'Favorites', icon: 'fas fa-star', path: '/favorites' },
  ];

  const handleButtonClick = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="bg-white w-64 shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
              <i className="fas fa-briefcase text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-800">PortfolioGenerator</h1>
          </div>
        </div>

        <div className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleButtonClick(item.path)}
                  className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span className="font-medium ml-3">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-gray-600"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Portfolio Dashboard</h2>
          <p className="text-gray-600">
            Welcome to your portfolio generator. Select a section from the sidebar to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;