import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen = false, toggleSidebar = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    
    const controller = new AbortController();

    fetch("https://make-your-portfolio.onrender.com/me", {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
        
          if (res.status === 401) {
            localStorage.removeItem("token");
            throw new Error("Session expired");
          }
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch((err) => {
       
        if (err.name !== 'AbortError') {
          console.error(err);
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

   
    return () => controller.abort();
  }, []);

  const menuItems = [
    { id: "home", label: "Home", icon: "fas fa-home", path: "/home" },
    { id: "templates", label: "Templates", icon: "fas fa-palette", path: "/templates" },
    { id: "favorites", label: "Favorites", icon: "fas fa-star", path: "/favorites" },
    { id: "portfolios", label: "My Portfolios", icon: "fas fa-briefcase", path: "/portfolios" },
    { id: "profile", label: "Profile", icon: "fas fa-user-cog", path: "/profile" }
  ];

  const handleButtonClick = (path) => {
    navigate(path);
    toggleSidebar(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    toggleSidebar(false);
  };

  
  const isActive = (path) => location.pathname === path;

  return (
    <>
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => toggleSidebar(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-pink-100 to-purple-100 shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-56`}
      >
        
        
        
        <div className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-4 px-3"> 
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleButtonClick(item.path)}
                  className={`w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-200 hover:to-purple-200 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300 group
                    ${isActive(item.path) ? "bg-gradient-to-r from-pink-200 to-purple-200" : ""}`}
                >
                  <i className={`${item.icon} text-lg ${isActive(item.path) ? "text-purple-700" : "text-pink-600"} group-hover:text-purple-700 transition-colors`}></i>
                  <span className={`font-bold ml-3 text-sm ${isActive(item.path) ? "text-purple-800" : "text-gray-800"} group-hover:text-purple-800 transition-colors`}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        
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
          ) : error ? (
            <div className="text-center">
              <p className="text-xs text-red-600 mb-2">{error}</p>
              <button 
                onClick={() => navigate("/login")}
                className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-xs font-bold transition-colors w-full"
              >
                Login Again
              </button>
            </div>
          ) : user ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center shadow">
                  <i className="fas fa-user text-white text-sm"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <button 
                  
                    onClick={() => {navigate("/profile");}}
                    className="text-left w-full"
                  >
                    {user.email}

                  </button>
                  
                  
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-blue-600 font-medium mb-2">No user data</p>
              <button 
                onClick={() => navigate("/login")}
                className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors w-full"
              >
                Login
              </button>
            </div>
          )}
        </div>
        
        
        {isOpen && (
          <button
            onClick={() => toggleSidebar(false)}
            className="md:hidden absolute top-3 right-3 text-gray-600 hover:text-pink-600 text-xl"
            aria-label="Close sidebar"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;