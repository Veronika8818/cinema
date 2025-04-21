import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Booking from './pages/Booking.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking/:id" element={<Booking />} />
    </Routes>
  );
}

export default App;