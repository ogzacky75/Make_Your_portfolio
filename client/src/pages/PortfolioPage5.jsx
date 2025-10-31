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

    if (loading)
        return <div className="p-6 text-center text-gray-300 text-lg animate-pulse">Loading portfolio...</div>;
    if (error)
        return <div className="p-6 text-center text-red-400 font-semibold">Error: {error}</div>;
    if (!portfolio)
        return <div className="p-6 text-center text-gray-300">No portfolio found.</div>;

    const { personal_info, education, experience, projects, skills } = portfolio;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-[#3D003C] to-[#1C0032] text-gray-100 font-sans">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#1C0032]/90 shadow-lg border-b border-yellow-400/20">
            <ul className="flex justify-center gap-8 p-4 text-sm uppercase font-semibold tracking-wide">
            {personal_info && <li><a href="#about" className="hover:text-yellow-400 transition">About</a></li>}
            {education.length > 0 && <li><a href="#education" className="hover:text-yellow-400 transition">Education</a></li>}
            {experience.length > 0 && <li><a href="#experience" className="hover:text-yellow-400 transition">Experience</a></li>}
            {projects.length > 0 && <li><a href="#projects" className="hover:text-yellow-400 transition">Projects</a></li>}
            {skills.length > 0 && <li><a href="#skills" className="hover:text-yellow-400 transition">Skills</a></li>}
            </ul>
        </nav>

        {/* About */}
        {personal_info && (
            <section id="about" className="text-center py-16 px-6">
            {personal_info.photo_url && (
                <img
                src={personal_info.photo_url}
                alt={personal_info.name}
                className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-yellow-400 shadow-[0_0_20px_rgba(255,204,0,0.4)]"
                />
            )}
            <h1 className="text-5xl font-extrabold mb-2 text-yellow-400 drop-shadow-lg">
                {personal_info.name}
            </h1>
            <p className="text-gray-300 text-lg">
                {personal_info.contact_email} • {personal_info.phone}
            </p>
            <div className="flex justify-center gap-6 mt-6">
                {personal_info.linkedin && (
                <a href={personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">LinkedIn</a>
                )}
                {personal_info.github && (
                <a href={personal_info.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">GitHub</a>
                )}
                {personal_info.website && (
                <a href={personal_info.website} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">Website</a>
                )}
            </div>
            </section>
        )}

        <div className="max-w-6xl mx-auto space-y-16 px-6 pb-20">
            {/* Education */}
            {education.length > 0 && (
            <section id="education">
                <h2 className="text-3xl font-bold mb-6 text-yellow-300 border-b border-yellow-400/40 inline-block pb-1">
                Education
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                {education.map((edu, idx) => (
                    <div key={idx} className="bg-[#2b0b2b]/70 p-5 rounded-xl border border-yellow-400/20 shadow hover:shadow-yellow-400/30 transition">
                    <h3 className="font-semibold text-xl text-yellow-300 mb-1">{edu.degree}</h3>
                    <p className="text-gray-200">{edu.institution}</p>
                    <p className="text-gray-400 text-sm">{edu.start_year} - {edu.end_year || "Present"}</p>
                    </div>
                ))}
                </div>
            </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
            <section id="experience">
                <h2 className="text-3xl font-bold mb-6 text-yellow-300 border-b border-yellow-400/40 inline-block pb-1">
                Experience
                </h2>
                <div className="space-y-5">
                {experience.map((exp, idx) => (
                    <div key={idx} className="bg-[#2b0b2b]/70 p-5 rounded-xl border border-yellow-400/20 shadow hover:shadow-yellow-400/30 transition">
                    <h3 className="font-semibold text-xl text-yellow-300">{exp.job_title}</h3>
                    <p className="text-gray-200">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-2">{exp.start_date} - {exp.end_date || "Present"}</p>
                    <p className="text-gray-100">{exp.description}</p>
                    </div>
                ))}
                </div>
            </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
            <section id="projects">
                <h2 className="text-3xl font-bold mb-6 text-yellow-300 border-b border-yellow-400/40 inline-block pb-1">
                Projects
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                {projects.map((proj, idx) => (
                    <div key={idx} className="bg-[#2b0b2b]/70 p-5 rounded-xl border border-yellow-400/20 shadow hover:shadow-yellow-400/30 transition">
                    <h3 className="font-semibold text-xl text-yellow-300 mb-2">{proj.project_name}</h3>
                    <p className="text-gray-100 mb-3">{proj.description}</p>
                    {proj.image_url && (
                        <img src={proj.image_url} alt={proj.project_name} className="w-full rounded-lg mb-3" />
                    )}
                    {proj.project_link && (
                        <a
                        href={proj.project_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 font-semibold underline hover:text-yellow-300"
                        >
                        View Project
                        </a>
                    )}
                    </div>
                ))}
                </div>
            </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
            <section id="skills">
                <h2 className="text-3xl font-bold mb-6 text-yellow-300 border-b border-yellow-400/40 inline-block pb-1">
                Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                    <span
                    key={idx}
                    className="bg-yellow-400/20 text-yellow-200 px-4 py-1 rounded-full text-sm font-medium hover:bg-yellow-400/30 transition"
                    >
                    {skill.skill_name}
                    </span>
                ))}
                </div>
            </section>
            )}
        </div>
        </div>
    );
    }
