import { useState, useEffect, useContext } from "react";
import { apiRequest } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreatePortfolio() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [portfolioURL, setPortfolioURL] = useState("");

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    photo_url: "",
    contact_email: "",
    phone: "",
    linkedin: "",
    github: "",
    website: "",
  });

  const [skills, setSkills] = useState([""]);
  const [projects, setProjects] = useState([{ name: "", description: "", link: "" }]);
  const [education, setEducation] = useState([{ institution: "", degree: "", start_year: "", end_year: "" }]);
  const [experience, setExperience] = useState([{ job_title: "", company: "", start_date: "", end_date: "", description: "" }]);

  useEffect(() => {
    apiRequest("/templates")
      .then(setTemplates)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        title,
        template_id: selectedTemplate,
        personal_info: personalInfo,
        skills,
        projects,
        education,
        experience,
      };

      const res = await apiRequest("/portfolios", "POST", data, token);
      setPortfolioURL(`http://localhost:5173/portfolio/${res.slug}`);
      alert("Portfolio created successfully!");
      navigate(`/portfolio/${res.slug}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Your Portfolio</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-xl space-y-4">
        <div>
          <label className="block font-semibold mb-1">Portfolio Title</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            placeholder="e.g. Zacky Og Portfolio"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Choose Template</label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="border w-full p-2 rounded"
            required
          >
            <option value="">-- Select Template --</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <h2 className="text-xl font-bold mt-6">Personal Info</h2>
        {Object.entries(personalInfo).map(([key, value]) => (
          <div key={key}>
            <label className="block capitalize mb-1">{key.replace("_", " ")}</label>
            <input
              type="text"
              className="border w-full p-2 rounded"
              value={value}
              onChange={(e) => setPersonalInfo({ ...personalInfo, [key]: e.target.value })}
            />
          </div>
        ))}

        <h2 className="text-xl font-bold mt-6">Skills</h2>
        {skills.map((skill, i) => (
          <div key={i} className="flex space-x-2 mb-2">
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={skill}
              onChange={(e) => {
                const newSkills = [...skills];
                newSkills[i] = e.target.value;
                setSkills(newSkills);
              }}
            />
            <button
              type="button"
              className="bg-red-500 text-white px-3 rounded"
              onClick={() => setSkills(skills.filter((_, index) => index !== i))}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setSkills([...skills, ""])}
        >
          + Add Skill
        </button>

        <h2 className="text-xl font-bold mt-6">Education</h2>
        {education.map((ed, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              placeholder="Institution"
              className="border p-2 rounded"
              value={ed.institution}
              onChange={(e) => {
                const newEdu = [...education];
                newEdu[i].institution = e.target.value;
                setEducation(newEdu);
              }}
            />
            <input
              type="text"
              placeholder="Degree"
              className="border p-2 rounded"
              value={ed.degree}
              onChange={(e) => {
                const newEdu = [...education];
                newEdu[i].degree = e.target.value;
                setEducation(newEdu);
              }}
            />
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setEducation([...education, { institution: "", degree: "" }])}
        >
          + Add Education
        </button>

        <div className="text-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Portfolio"}
          </button>
        </div>
      </form>

      {portfolioURL && (
        <div className="mt-6 text-center">
          <p>Your portfolio is live at:</p>
          <a href={portfolioURL} className="text-blue-600 underline" target="_blank">
            {portfolioURL}
          </a>
        </div>
      )}
    </div>
  );
}
