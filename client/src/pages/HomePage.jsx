import React , {useState, useEffect} from React;
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import {Link} from "react-router-dom";

function HomePage(){
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch("https: ")
      .then((res) => res.json())
      .then((data) => setTemplates(data))

  }, []);

  return(
    <div className="home-container">
      <header className="portfolio">
        <h1>Welcome to the Make Your Portfolio Generator</h1>
        <p>Create your own customized Portfolio with important credentials.</p>

      </header>
    </div>
  )


}

