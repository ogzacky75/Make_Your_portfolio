import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
