import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-evenly items-center h-16">
          <Link
            to="/home"
            className="text-white text-xl font-bold hover:text-gray-300 transition duration-300"
          >
            MYP
          </Link>

          <ul className="flex space-x-4">
            <li>
              <Link
                to="/profile"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:text-gray-300 transition duration-300  px-4 py-2 rounded-lg font-medium"
              >
                Profile
              </Link> 
            </li>
            </ul>

          <ul className="flex space-x-4">
            <li>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;