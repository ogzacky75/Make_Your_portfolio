import { Share2, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PortfolioCard({ portfolio, onView, onDelete, onShare }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {portfolio.title}
        </h2>
        <span className="text-xs text-gray-500">
          {new Date(portfolio.created_at).toLocaleDateString()}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3">
        Template: {portfolio.template?.name || "N/A"}
      </p>

      <div className="flex justify-between items-center mt-auto">
        <div className="flex gap-2">
          <Button
            onClick={() => onView(portfolio.slug)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
          >
            <Eye size={16} /> View
          </Button>
          <Button
            onClick={() => onShare(portfolio.public_url)}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
          >
            <Share2 size={16} /> Share
          </Button>
        </div>
        <button
          onClick={() => onDelete(portfolio.slug)}
          className="p-2 rounded-full hover:bg-red-50"
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}
