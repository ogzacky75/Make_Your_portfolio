import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  return(
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        
          <Link 
            to="/" 
            className="flex-shrink-0 text-white text-xl font-bold hover:text-gray-300 transition duration-300"
          >
            Make Your Portfolio
          </Link>

          <ul className="flex space-x-4 md:space-x-8">
            <li>
              <Link 
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                  isActive('/') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/explore"
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                  isActive('/explore') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Templates
              </Link>
            </li>
            <li>
              <Link 
                to="/find"
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                  isActive('/find') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;