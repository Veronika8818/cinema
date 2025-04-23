import React, { useState, useEffect } from 'react';
import styles from './CinemalHall.module.css';
import { useParams } from 'react-router-dom';


const rows = 5;
const cols = 8;

const CinemaHall = () => {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [showForm, setShowForm] = useState(false);
  


  useEffect(() => {
    const data = localStorage.getItem('bookings');
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed[id]) {
        setBookedSeats(parsed[id]);
      }
    }
  }, [id]);

  const handleSeatClick = (row, col) => {
    const seatId = `${row}-${col}`;
    if (bookedSeats.includes(seatId)) {
      alert('Це місце вже заброньовано!');
      return;
    }
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };
  

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Спочатку виберіть місця!');
      return;
    }
    setShowForm(true);
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    const data = localStorage.getItem('bookings');
    const parsed = data ? JSON.parse(data) : {};

    const updatedSeats = [...(parsed[id] || []), ...selectedSeats];
    parsed[id] = Array.from(new Set(updatedSeats));

    localStorage.setItem('bookings', JSON.stringify(parsed));
    setBookedSeats(parsed[id]);
    setSelectedSeats([]);
    setFormData({ name: '', phone: '', email: '' });
    setShowForm(false);
    alert('Бронювання успішне!');
  };

  return (
    <div>
      <div className={styles.hall}>
        {[...Array(rows)].map((_, row) => (
          <div key={row} className={styles.row}>
            {[...Array(cols)].map((_, col) => {
              const seatId = `${row}-${col}`;
              const isSelected = selectedSeats.includes(seatId);
              const isBooked = bookedSeats.includes(seatId);
              return (
                <div
                key={seatId}
                className={`${styles.seat} ${
                  isBooked
                    ? styles.booked
                    : isSelected
                    ? styles.selected
                    : styles.available
                }`}
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

      <button onClick={handleBooking} disabled={selectedSeats.length === 0} className={styles.bookingButton}>
        Забронювати
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3>Підтвердження бронювання</h3>
          <input type="text" placeholder="Імʼя" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="tel" placeholder="Телефон" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <button type="submit">Підтвердити</button>
        </form>
      )}
    </div>
  );
};


export default CinemaHall;
