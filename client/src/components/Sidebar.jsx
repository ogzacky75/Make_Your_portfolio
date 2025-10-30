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
    { id: "favorites", label: "Favorites", icon: "fas fa-star", path: "/favorites" },
    { id: "portfolios", label: "My Portfolios", icon: "fas fa-briefcase", path: "/portfolios" },
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
        {loading ? (
          <p className="text-sm text-gray-500">Loading user...</p>
        ) : user ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-gray-600"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-red-500">No user data</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
