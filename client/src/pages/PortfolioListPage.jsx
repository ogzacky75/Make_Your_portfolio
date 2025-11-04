import { Sidebar as SidebarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function PortfolioListPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("https://make-your-portfolio.onrender.com/portfolios", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPortfolios(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleViewPortfolio = (slug) => {
    const backendUrl = "https://make-your-portfolio.onrender.com";
    window.open(`${backendUrl}/portfolios/${slug}`, "_blank");
  };

  if (loading) return <div>Loading portfolios...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />
      <h1 className="text-3xl font-bold mb-4">Your Portfolios</h1>

      {portfolios.length === 0 ? (
        <p>No portfolios yet.</p>
      ) : (
        <ul className="space-y-2">
          {portfolios.map((p) => (
            <li
              key={p.id}
              className="border p-3 rounded hover:shadow-md flex justify-between items-center"
            >
              <span className="font-semibold">{p.title}</span>
              <button
                onClick={() => handleViewPortfolio(p.slug)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
