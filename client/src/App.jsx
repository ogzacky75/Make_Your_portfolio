import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp.jsx';
import LogIn from './Pages/LogIn.jsx';
import Landing from './Pages/Landing.jsx';  

function App() {
  return (
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
  );
}

export default App;
