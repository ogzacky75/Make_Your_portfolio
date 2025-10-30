import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen = false, toggleSidebar = () => {} }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://127.0.0.1:5000/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const menuItems = [
    { label: "Home", icon: "", path: "/home" },
    { label: "Templates", icon: "", path: "/templates" },
    { label: "Favorites", icon: "", path: "/favorites" },
    { label: "My Portfolios", icon: "", path: "/portfolios" },
  ];

  const handleClick = (path) => {
    navigate(path);
    toggleSidebar(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-black shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64`}
    >
  
      <div className="p-6 border-b border-pink-500">
        <h1 className="text-2xl font-bold text-pink-400">PortfolioPro</h1>
      </div>

      <div className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-2 px-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleClick(item.path)}
                className="w-full flex items-center p-4 rounded-lg text-pink-100 hover:bg-pink-900 hover:text-white transition-all duration-200 focus:outline-none border border-transparent hover:border-pink-400"
              >
                <span className="text-xl mr-4">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

   
      <div className="p-4 border-t border-pink-500 bg-pink-900">
        {user ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-pink-200">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-pink-200 text-sm">Not logged in</p>
            <button 
              onClick={() => handleClick("/login")}
              className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;