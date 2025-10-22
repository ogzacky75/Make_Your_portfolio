import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp.jsx';

function App() {
  return (
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  );
}

export default App;
