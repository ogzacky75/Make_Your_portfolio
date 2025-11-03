import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen = false, toggleSidebar = () => {} }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:5000/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const menuItems = [
    { id: "home", label: "Home", icon: "fas fa-home", path: "/home" },
    { id: "templates", label: "Templates", icon: "fas fa-palette", path: "/templates" },
    { id: "favorites", label: "Favorites", icon: "fas fa-heart", path: "/favorites" },
    { id: "portfolios", label: "My Portfolios", icon: "fas fa-briefcase", path: "/portfolios" },
  ];

  const handleButtonClick = (path) => {
    navigate(path);
    toggleSidebar(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-pink-100 to-purple-100 shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-56`}
    >
      
      {/* Header */}
      <div className="p-4 border-b border-pink-200">
        <h2 className="text-xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent text-center">
          Portfolio Generator
        </h2>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleButtonClick(item.path)}
                className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-200 hover:to-purple-200 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300 group"
              >
                <i className={`${item.icon} text-lg text-pink-600 group-hover:text-purple-700 transition-colors`}></i>
                <span className="font-bold ml-3 text-sm text-gray-800 group-hover:text-purple-800 transition-colors">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-pink-200 bg-gradient-to-r from-blue-100 to-blue-200">
        {loading ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700">Loading...</p>
            </div>
          </div>
        ) : user ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center shadow">
              <i className="fas fa-user text-white text-sm"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
              <p className="text-xs text-blue-700 truncate font-bold">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-blue-600 font-medium">No user data</p>
            <button 
              onClick={() => navigate("/login")}
              className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-xs font-bold transition-colors"
            >
              Login
            </button>
          </div>
        )}
      </div>
      
      {/* Close Button for Mobile */}
      {isOpen && (
        <button
          onClick={() => toggleSidebar(false)}
          className="md:hidden absolute top-3 right-3 text-gray-600 hover:text-pink-600 text-xl"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  );
};

export default Sidebar;