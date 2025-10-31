import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const { token } = useContext(AuthContext);
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Unauthorized — please log in first.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/templates", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch templates");
        return res.json();
      })
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  const filteredTemplates = templates.filter((template) =>
    template.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen bg-gradient-to-br from-pink-300/90 via-purple-400/90 to-pink-500/90">
=======
    <div className="flex min-h-screen bg-[#1c0031]">
>>>>>>> 294703a717b5a629ee07a4e6a2c6ecb191b0d49b
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
          
          <header className="text-center mb-12 bg-gradient-to-r from-pink-200 to-pink-100 rounded-2xl p-8 shadow-2xl border-2 border-pink-300">
            <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-6 tracking-tight">
              Welcome To Portfolio Generator
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-2xl mx-auto leading-relaxed font-bold">
              Create your own customized portfolio with important credentials.
              Choose from our beautiful templates and showcase your work professionally.
            </p>
          </header>

         
          <section className="templates-section">
            <div className="text-center mb-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 shadow-xl border-2 border-purple-500">
              <h2 className="text-4xl font-black text-white mb-3 tracking-wide">
                Explore Our Templates
              </h2>
              <p className="text-white text-xl font-bold">Find the perfect template to showcase your skills and experience.</p>
            </div>

          
            <div className="max-w-2xl mx-auto mb-10">
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full px-6 py-4 border-3 border-purple-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent bg-white/95 backdrop-blur-sm shadow-2xl text-lg font-bold text-purple-900 placeholder-purple-600 lowercase"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-center bg-red-100 border-2 border-red-500 text-red-800 px-6 py-4 rounded-xl max-w-md mx-auto mb-6 font-bold text-lg">
                {error}
              </div>
            )}

          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <div className="col-span-full text-center py-16 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border-2 border-white/30">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-pink-700 mx-auto mb-6"></div>
                  <p className="text-gray-800 text-xl font-bold">Loading templates...</p>
                </div>
              ) : filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
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
                      <h3 className="text-2xl font-black text-gray-900 mb-3">{template.name}</h3>
                      <p className="text-gray-700 mb-5 leading-relaxed font-medium text-lg">
                        {template.description || "Professional portfolio template"}
                      </p>
                      <Link 
                        to={`/create-portfolio`} 
                        state={{ template }} 
                        className="inline-block w-full text-center bg-gradient-to-r from-pink-600 to-purple-700 text-white px-6 py-4 rounded-xl hover:from-pink-700 hover:to-purple-800 transition-all duration-300 font-black text-lg shadow-lg hover:shadow-xl"
                      >
                        Use Template
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border-2 border-white/30">
                  <i className="fas fa-search text-5xl text-purple-700 mb-6 opacity-70"></i>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">No templates found</h3>
                  <p className="text-gray-700 font-bold text-lg">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </section>

          
          <section className="mt-16 text-center bg-white/95 backdrop-blur-md rounded-2xl p-10 shadow-2xl border-2 border-white/30">
            <h3 className="text-3xl font-black bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent mb-6">
              Ready To Showcase Your Work?
            </h3>
            <p className="text-gray-800 text-xl mb-6 font-bold leading-relaxed">
              Create a stunning portfolio that reflects your unique style and professional achievements.
            </p>
            <div className="flex justify-center gap-8 text-purple-800 font-bold text-lg">
              <div className="flex items-center">
                <i className="fas fa-palette text-2xl mr-3"></i>
                <span className="lowercase">Customizable</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-bolt text-2xl mr-3"></i>
                <span className="lowercase">Fast & easy</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-mobile-alt text-2xl mr-3"></i>
                <span className="lowercase">Responsive</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}