import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardDisplay from './Components/CardDisplay';
import BloomburrowCube from './Components/BloomburrowCube';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CardDisplay />} /> {/* Home Page */}
          <Route path="/bloomburrow" element={<BloomburrowCube />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
