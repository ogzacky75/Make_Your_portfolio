import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from "./pages/LandingPage.jsx"
import Templates from "./pages/Templates.jsx"
import Favorites from "./pages/Favorites.jsx"

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/templates" element={<Templates />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>


    

  )
}

export default App
