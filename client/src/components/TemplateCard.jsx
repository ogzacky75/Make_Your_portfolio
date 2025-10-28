import { Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TemplateCard({ template, onSelect, onFavorite }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={template.image}
        alt={template.name}
        className="w-full h-48 object-cover rounded-xl mb-3"
      />

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {template.name}
        </h2>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {template.description}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={() => onSelect(template)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Use Template
        </Button>
        <button
          onClick={() => onFavorite(template.id)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Heart size={20} className="text-red-500" />
        </button>
      </div>

      {template.preview_url && (
        <a
          href={template.preview_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline mt-2 flex items-center gap-1"
        >
          <Eye size={16} /> Preview
        </a>
      )}
    </div>
  );
}
