import React from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemalHall.jsx';

const Booking = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Бронювання для фільму №{id}</h2>
      <CinemaHall />
    </div>
  );
};

export default Booking;
