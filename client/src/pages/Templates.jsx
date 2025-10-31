import { useState, useEffect, useContext } from "react";
import TemplateCard from "../components/TemplateCard";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar.jsx";

export default function Templates() {
  const { token } = useContext(AuthContext);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  const handleFavorite = async (templateId) => {
    try {
      const res = await fetch("http://localhost:5000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ template_id: templateId }),
      });
      if (!res.ok) throw new Error("Failed to add favorite");
      alert("Added to favorites!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0014] to-[#1e003a] text-purple-300 text-lg font-medium">
        Loading templates...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0014] to-[#1e003a] text-red-400 text-lg font-medium">
        {error}
      </div>
    );

  if (templates.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0014] to-[#1e003a] text-gray-400 text-lg font-medium">
        No templates found.
      </div>
    );

  return (
  <div className="flex min-h-screen bg-gradient-to-br from-[#0a0014] via-[#120027] to-[#1e003a] text-gray-100">
    <aside className="w-64 bg-[#0a0014]/90 border-r border-purple-800/40 shadow-lg hidden md:block">
      <Sidebar />
    </aside>

    <main className="flex-1 p-10 ml-0 md:ml-64">
      <h1 className="text-4xl font-extrabold text-purple-400 mb-8 text-center md:text-left">
        Explore Templates
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-[#150022] rounded-2xl p-6 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1 border border-purple-800/30"
          >
            <TemplateCard
              template={template}
              onFavorite={() => handleFavorite(template.id)}
            />
          </div>
        ))}
      </div>
    </main>
  </div>
);

}
