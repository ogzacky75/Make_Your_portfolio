import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../api/api";

export default function PortfolioView() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    apiRequest(`/portfolios/${slug}`)
      .then(setPortfolio)
      .catch(console.error);
  }, [slug]);

  if (!portfolio) return <p className="text-center mt-10">Loading portfolio...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{portfolio.name}</h1>
      <p>{portfolio.description}</p>
    </div>
  );
}
