import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage.jsx";
import Templates from "./pages/Templates.jsx";
import Favorites from "./pages/Favorites.jsx";
import CreatePortfolio from "./pages/CreatePortfolio.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import PortfolioListPage from "./pages/PortfolioListPage.jsx";


function AppWrapper() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hideNavbar = ["/", "/login", "/signup"].includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://make-your-portfolio.onrender.com/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) setIsAuthenticated(true);
          else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        })
        .catch(() => setIsAuthenticated(false));
    }
  }, []);

  return (
    <>
      {!hideNavbar && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<LogIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Templates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolios"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PortfolioListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-portfolio"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreatePortfolio />
            </ProtectedRoute>
          }
        />
        <Route path="/portfolio/:slug" element={<PortfolioPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppWrapper />
      </Router>
    </AuthProvider>
  );
}
