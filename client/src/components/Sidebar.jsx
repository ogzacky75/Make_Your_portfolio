import React from 'react';

const SimplePortfolioSidebar = () => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'templates', label: 'Templates', icon: 'fas fa-palette' },
    { id: 'favorites', label: 'Favorites', icon: 'fas fa-star' },
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-bar' },
    { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-briefcase' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-code' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
   
      <div className="bg-white w-64 shadow-lg flex flex-col">
      
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
              <i className="fas fa-briefcase text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-800">PortfolioGen</h1>
          </div>
        </div>

        <div className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <div className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <i className={`${item.icon} text-lg`}></i>
                  <span className="font-medium ml-3">{item.label}</span>
                </div>
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
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
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

export default SimplePortfolioSidebar;