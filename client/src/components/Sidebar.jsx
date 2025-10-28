import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", label: "Home", icon: "fas fa-home", path: "/home" },
    { id: "templates", label: "Templates", icon: "fas fa-palette", path: "/templates" },
    { id: "favorites", label: "Favorites", icon: "fas fa-star", path: "/favorites" },
  ];

  const handleButtonClick = (path) => {
    navigate(path);
    toggleSidebar(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64`}
    >
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
            <i className="fas fa-briefcase text-white text-lg"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-800">PortfolioGen</h1>
        </div>
        <button
          onClick={() => toggleSidebar(false)}
          className="md:hidden text-gray-600 hover:text-indigo-600"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <div className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleButtonClick(item.path)}
                className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 focus:outline-none"
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
            <p className="text-sm font-medium text-gray-900">Jasmine Keith</p>
            <p className="text-xs text-gray-500">jasmineK@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
