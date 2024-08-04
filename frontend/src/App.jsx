import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SwapInterface from './components/SwapInterface';
import LoginSignup from './components/LoginSignup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<SwapInterface />} />
        <Route path="/better-swap" element={<SwapInterface />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
};

export default App;



