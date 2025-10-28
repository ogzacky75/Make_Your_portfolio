import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";
import TemplateCard from "../components/TemplateCard";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    apiRequest("/templates")
      .then(setTemplates)
      .catch(console.error);
  }, []);

  const handleFavorite = async (templateId) => {
    try {
      await apiRequest("/favorites", "POST", { template_id: templateId }, token);
      alert("Added to favorites!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {templates.map((t) => (
        <TemplateCard key={t.id} template={t} onFavorite={() => handleFavorite(t.id)} />
      ))}
    </div>
  );
}
