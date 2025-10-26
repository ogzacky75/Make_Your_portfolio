import React, { useState } from 'react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
    { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-briefcase' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-code' },
    { id: 'experience', label: 'Experience', icon: 'fas fa-building' },
    { id: 'education', label: 'Education', icon: 'fas fa-graduation-cap' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div 
        className={`bg-white shadow-lg flex flex-col transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
              <i className="fas fa-briefcase text-white text-lg"></i>
            </div>
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-gray-800">PortfolioGen</h1>
            )}
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-gray-500`}></i>
          </button>
        </div>

        <div className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeItem === item.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className={`${item.icon} text-lg ${isCollapsed ? 'mx-auto' : ''}`}></i>
                  {!isCollapsed && (
                    <span className="font-medium ml-3">{item.label}</span>
                  )}
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
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

   
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {menuItems.find(item => item.id === activeItem)?.label} Content
          </h2>
          <p className="text-gray-600">
            This is the main content area for the {activeItem} section. 
            You can add your portfolio content, forms, or other components here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

