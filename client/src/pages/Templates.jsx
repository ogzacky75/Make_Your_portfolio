import { useState, useEffect, useContext } from "react";
import TemplateCard from "../components/TemplateCard";
import { AuthContext } from "../context/AuthContext";

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

  if (loading) return <div className="text-center py-20 text-gray-500">Loading templates...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (templates.length === 0) return <div className="text-center py-20 text-gray-500">No templates found</div>;

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} onFavorite={() => handleFavorite(template.id)} />
      ))}
    </div>
  );
}
