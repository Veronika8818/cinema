import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className={styles.card}>
      <img className={styles.poster} src={movie.poster} alt={movie.title} />
      <h2 className={styles.title}>{movie.title}</h2>
      <p className={styles.description}>{movie.description}</p>
      <p className={styles.genre}>{movie.genre}</p>
      <p className={styles.datetime}>{movie.date} о {movie.time}</p>
      <button onClick={handleBooking} className={styles.bookingButton}>Забронювати</button>
    </div>
  );
};

export default MovieCard;
