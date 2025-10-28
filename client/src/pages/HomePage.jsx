import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";

function HomePage() {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      setError("Unauthorized — please log in first.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/templates", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        if (!res.ok) throw new Error("Failed to fetch templates");
        return res.json();
      })
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching templates:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredTemplates = templates.filter((template) =>
    template.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="home-container p-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to the Portfolio Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create your own customized portfolio with important credentials.
              Choose from our beautiful templates and showcase your work
              professionally.
            </p>
          </header>

          <section className="templates-section">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Explore Our Templates
              </h2>
              <p className="text-gray-600">
                Find the perfect template to showcase your skills and experience.
              </p>
            </div>

            <div className="max-w-md mx-auto mb-8">
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-center text-red-500 font-medium mb-4">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <i className="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Loading templates...
                  </h3>
                  <p className="text-gray-500">
                    Please wait while we load our templates
                  </p>
                </div>
              ) : filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {template.image ? (
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-500 text-center">
                          <i className="fas fa-image text-4xl mb-2"></i>
                          <p>Template Preview</p>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {template.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {template.description || "Professional portfolio template"}
                      </p>
                      <Link
                        to={`/template/${template.id}`}
                        className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Use Template
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No templates found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or check back later.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
