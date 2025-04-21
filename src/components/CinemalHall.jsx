import React, { useState } from 'react';
import styles from './CinemalHall.module.css';

const rows = 5;
const cols = 8;

const CinemaHall = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, col) => {
    const seatId = `${row}-${col}`;
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div>
      <div className={styles.hall}>
        {[...Array(rows)].map((_, row) => (
          <div key={row} className={styles.row}>
            {[...Array(cols)].map((_, col) => {
              const seatId = `${row}-${col}`;
              const isSelected = selectedSeats.includes(seatId);
              return (
                <div
                  key={seatId}
                  className={`${styles.seat} ${isSelected ? styles.selected : styles.available}`}
                  onClick={() => handleSeatClick(row, col)}
                >
                  {col + 1}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className={styles.selectedInfo}>
        <strong>Вибрані місця:</strong> {selectedSeats.join(', ') || 'немає'}
      </div>
    </div>
  );
};

export default CinemaHall;
