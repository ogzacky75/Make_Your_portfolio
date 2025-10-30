import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AcademicPortfolioPage() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/academic-portfolios/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch portfolio");
        return res.json();
      })
      .then((data) => setPortfolio(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  if (!portfolio) return <div className="p-6 text-center">No portfolio found.</div>;

  const { personal_info, education, research, publications, skills } = portfolio;

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Header */}
      {personal_info && (
        <section className="mb-12 text-center">
          {personal_info.photo_url && (
            <img
              src={personal_info.photo_url}
              alt={personal_info.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
          )}
          <h1 className="text-4xl font-bold mb-2">{personal_info.name}</h1>
          <p className="text-lg text-gray-600">{personal_info.title}</p>
          <p className="text-gray-700">{personal_info.university}</p>
          <p className="text-gray-600">{personal_info.contact_email}</p>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="p-4 border rounded">
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-500">{edu.start_year} - {edu.end_year || "Present"}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {research.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Research</h2>
          <div className="space-y-4">
            {research.map((research, idx) => (
              <div key={idx} className="p-4 border rounded">
                <h3 className="font-semibold text-lg">{research.position}</h3>
                <p className="text-gray-600">{research.lab}</p>
                <p className="text-gray-700">{research.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {publications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Publications</h2>
          <div className="space-y-3">
            {publications.map((pub, idx) => (
              <div key={idx} className="p-3 border rounded">
                <h3 className="font-semibold">{pub.title}</h3>
                <p className="text-gray-600 text-sm">{pub.authors}</p>
                <p className="text-gray-700 text-sm">{pub.journal} ({pub.year})</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}