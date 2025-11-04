import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";
import Sidebar from "../components/Sidebar.jsx";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiRequest("/favorites", "GET", null, token)
      .then(setFavorites)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  const handleRemove = async (templateId) => {
    await apiRequest(`/favorites/${templateId}`, "DELETE", null, token);
    setFavorites((prev) => prev.filter((f) => f.template.id !== templateId));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-300/90 via-purple-400/90 to-pink-500/90">
        <div className="text-center py-16 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border-2 border-white/30 w-full max-w-2xl mx-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-pink-700 mx-auto mb-6"></div>
          <p className="text-gray-800 text-xl font-bold">Loading favorites...</p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-300/90 via-purple-400/90 to-pink-500/90">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "ml-0 md:ml-64"}`}>
        
      
        <div className="p-4 bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-between md:hidden">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="text-purple-800 hover:text-pink-700 transition-colors font-bold"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
          <h1 className="text-xl font-extrabold text-purple-900">Portfolio Generator</h1>
        </div>

        <div className="p-6 md:p-8">
          
         
          {favorites.length === 0 ? (
            <div className="text-center py-16 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border-2 border-white/30">
              <i className="fas fa-heart text-5xl text-purple-700 mb-6 opacity-70"></i>
              <h3 className="text-2xl font-black text-black mb-3">No favorites yet</h3>
              <p className="text-gray-700 font-bold text-lg mb-6">Start adding templates to your favorites!</p>
              <Link 
                to="/templates" 
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-black text-lg shadow-lg hover:shadow-xl"
              >
                Browse Templates
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {favorites.map((fav) => (
                <div 
                  key={fav.id} 
                  className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/30"
                >
                  <div className="h-52 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    {fav.template.image ? (
                      <img 
                        src={fav.template.image} 
                        alt={fav.template.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="text-purple-700 text-center">
                        <i className="fas fa-image text-6xl mb-4 opacity-70"></i>
                        <p className="font-bold text-lg">Template preview</p>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-black text-black mb-4">{fav.template.name}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed font-medium text-lg">
                      {fav.template.description || "Professional portfolio template"}
                    </p>
                    <div className="flex gap-3 mt-4">
                      <Link 
                        to={`/create-portfolio`} 
                        state={{ template: fav.template }} 
                        className="inline-block flex-1 text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-black text-lg shadow-lg hover:shadow-xl"
                      >
                        Use Template
                      </Link>
                      <button
                        onClick={() => handleRemove(fav.template.id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-black text-lg shadow-lg hover:shadow-xl"
                        title="Remove from favorites"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}