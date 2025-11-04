import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar.jsx";
import { Link } from "react-router-dom";

export default function Templates() {
  const { token } = useContext(AuthContext);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const API_BASE = "https://make-your-portfolio.onrender.com";

  useEffect(() => {
    if (!token) {
      setError("Unauthorized — please log in first.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/templates`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch templates");
        return res.json();
      })
      .then((data) => {
        setTemplates(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleFavorite = async (templateId) => {
    try {
      const res = await fetch(`${API_BASE}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ template_id: templateId }),
      });

      if (!res.ok) throw new Error("Failed to add favorite");
      alert("Template added to favorites!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-300/90 via-purple-400/90 to-pink-500/90">
        <div className="text-center py-16 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border-2 border-white/30 w-full max-w-2xl mx-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-pink-700 mx-auto mb-6"></div>
          <p className="text-gray-800 text-xl font-bold">Loading templates...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-300/90 via-purple-400/90 to-pink-500/90">
        <div className="text-center bg-red-100 border-2 border-red-500 text-red-800 px-6 py-4 rounded-xl max-w-md mx-auto font-bold text-lg">
          {error}
        </div>
      </div>
    );

  if (templates.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-300/90 via-purple-400/90 to-pink-500/90">
        <div className="text-center py-16 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border-2 border-white/30 w-full max-w-2xl mx-4">
          <i className="fas fa-search text-5xl text-purple-700 mb-6 opacity-70"></i>
          <h3 className="text-2xl font-black text-black mb-3">No templates found</h3>
          <p className="text-gray-700 font-bold text-lg">Try again later</p>
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
          
          <section className="templates-section">
            <div className="text-center mb-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 shadow-xl border-2 border-purple-500">
              <h2 className="text-4xl font-black text-white mb-3 tracking-wide">
                All Templates
              </h2>
              <p className="text-white text-xl font-bold">Choose your favorite template and start building your portfolio.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {templates.map((template) => (
                <div 
                  key={template.id} 
                  className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/30"
                >
                  <div className="h-52 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    {template.image ? (
                      <img 
                        src={template.image} 
                        alt={template.name} 
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
                    <h3 className="text-2xl font-black text-black mb-4">{template.name}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed font-medium text-lg">
                      {template.description || "Professional portfolio template"}
                    </p>
                    <div className="flex gap-3 mt-4">
                      <Link 
                        to={`/create-portfolio`} 
                        state={{ template }} 
                        className="inline-block flex-1 text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-black text-lg shadow-lg hover:shadow-xl"
                      >
                        Use Template
                      </Link>
                      <button
                        onClick={() => handleFavorite(template.id)}
                        className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-4 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-black text-lg shadow-lg hover:shadow-xl"
                        title="Add to favorites"
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}