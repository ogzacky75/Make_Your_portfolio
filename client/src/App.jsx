import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from "./pages/LandingPage.jsx";
import Templates from "./pages/Templates.jsx";
import Favorites from "./pages/Favorites.jsx";
import CreatePortfolio from "./pages/CreatePortfolio.jsx"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create-portfolio" element={<CreatePortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
