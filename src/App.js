import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OutlawsCube from './Components/OutlawsCube';
import BloomburrowCube from './Components/BloomburrowCube';
import HomePage from './Components/HomePage';
import TarkirDragonstormCube from './Components/TarkirDragonStormCube';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home Page */}
          <Route path="/outlaws" element={<OutlawsCube />} />
          <Route path="/bloomburrow" element={<BloomburrowCube />} />
          <Route path='/tarkirdragonstorm' element={<TarkirDragonstormCube />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
