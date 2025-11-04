import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";
import TemplateCard from "../components/TemplateCard";
import Sidebar from "../components/Sidebar.jsx";

export default function Favorites() {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    apiRequest("/favorites", "GET", null, token)
      .then(setFavorites)
      .catch(console.error);
  }, [token]);

  const handleRemove = async (templateId) => {
    await apiRequest(`/favorites/${templateId}`, "DELETE", null, token);
    setFavorites((prev) => prev.filter((f) => f.template.id !== templateId));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0014] via-[#120027] to-[#1e003a] text-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />
      <div className="flex-1 p-10 ml-0 md:ml-64">
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {favorites.map((fav) => (
            <TemplateCard key={fav.id} template={fav.template} onRemove={() => handleRemove(fav.template.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
