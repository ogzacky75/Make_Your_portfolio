import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home', path: '/' },
    { id: 'templates', label: 'Templates', icon: 'fas fa-palette', path: '/templates' },
    { id: 'favorites', label: 'Favorites', icon: 'fas fa-star', path: '/favorites' },
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-bar', path: '/dashboard' },
    { id: 'profile', label: 'Profile', icon: 'fas fa-user', path: '/profile' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-briefcase', path: '/projects' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-code', path: '/skills' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope', path: '/contact' },
  ];

  const handleButtonClick = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="bg-white w-64 shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
              <i className="fas fa-briefcase text-white text-lg"></i>
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