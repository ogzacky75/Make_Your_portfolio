import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PortfolioPage() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`https://make-your-portfolio.onrender.com/portfolios/${slug}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch portfolio");
        return res.json();
      })
      .then((data) => setPortfolio(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading portfolio...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  if (!portfolio) return <div className="p-6 text-center text-gray-500">No portfolio found.</div>;

  const { personal_info, education = [], experience = [], projects = [], skills = [] } = portfolio;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="sticky top-0 bg-white shadow-md z-50 mb-8 rounded">
        <ul className="flex justify-center gap-6 p-4">
          {personal_info && <li><a href="#about" className="hover:text-blue-600 font-medium">About</a></li>}
          {education.length > 0 && <li><a href="#education" className="hover:text-blue-600 font-medium">Education</a></li>}
          {experience.length > 0 && <li><a href="#experience" className="hover:text-blue-600 font-medium">Experience</a></li>}
          {projects.length > 0 && <li><a href="#projects" className="hover:text-blue-600 font-medium">Projects</a></li>}
          {skills.length > 0 && <li><a href="#skills" className="hover:text-blue-600 font-medium">Skills</a></li>}
        </ul>
      </nav>

      {personal_info && (
        <section id="about" className="mb-12 text-center">
          {personal_info.photo_url && (
            <img
              src={personal_info.photo_url}
              alt={personal_info.name}
              className="w-36 h-36 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-lg"
            />
          )}
          <h1 className="text-5xl font-bold mb-2">{personal_info.name}</h1>
          <p className="text-lg text-gray-700">{personal_info.contact_email} | {personal_info.phone}</p>
          <div className="flex justify-center gap-6 mt-4">
            {personal_info.linkedin && (
              <a href={personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">LinkedIn</a>
            )}
            {personal_info.github && (
              <a href={personal_info.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">GitHub</a>
            )}
            {personal_info.website && (
              <a href={personal_info.website} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">Website</a>
            )}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section id="education" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-200 pb-2">Education</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, idx) => (
              <div key={idx} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="font-semibold text-xl mb-1">{edu.degree}</h3>
                <p className="text-gray-600 mb-1">{edu.institution}</p>
                <p className="text-gray-500">{edu.start_year} - {edu.end_year || "Present"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section id="experience" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-200 pb-2">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="font-semibold text-xl">{exp.job_title}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-gray-500 mb-2">{exp.start_date} - {exp.end_date || "Present"}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section id="projects" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-200 pb-2">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="font-semibold text-xl mb-1">{proj.name}</h3>
                <p className="text-gray-700 mb-2">{proj.description}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold underline"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section id="skills" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-200 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium"
              >
                {typeof skill === "string" ? skill : skill.skill_name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
