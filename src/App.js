import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OutlawsCube from './Components/OutlawsCube';
import HomePage from './Components/HomePage';
import CardDisplay from './Components/CardDisplay';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home Page */}
          <Route path="/outlaws" element={<OutlawsCube />} />
          <Route path="/bloomburrow" element={<CardDisplay setCode="blb"/>} />
          <Route path='/tarkirDragonstorm' element={<CardDisplay setCode="tdm" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
