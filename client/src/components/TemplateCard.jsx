import { Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TemplateCard({ template, onFavorite }) {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleUseTemplate = () => {
    navigate("/create-portfolio", { state: { template } });
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (onFavorite) onFavorite(template.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-4 flex flex-col">
      <img
        src={template.image || "/placeholder-image.png"}
        alt={template.name}
        className="w-full h-48 object-cover rounded-xl mb-3"
      />

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {template.name}
        </h2>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {template.description || "No description provided."}
        </p>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <Button
          onClick={handleUseTemplate}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg"
        >
          Use Template
        </Button>

        <button
          onClick={handleFavorite}
          className={`p-2 rounded-full transition ${
            isFavorited ? "bg-red-100" : "hover:bg-gray-100"
          }`}
          title={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={20}
            className={isFavorited ? "text-red-500 fill-red-500" : "text-gray-500"}
          />
        </button>
      </div>

      {template.preview_url && (
        <a
          href={template.preview_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline mt-3 flex items-center gap-1"
        >
          <Eye size={16} /> Preview Template
        </a>
      )}
    </div>
  );
}
