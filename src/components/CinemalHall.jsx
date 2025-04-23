import React, { useState, useEffect } from 'react';
import styles from './CinemalHall.module.css';
import { saveBooking, getBookedSeats } from '../BookingService';
import { useParams } from 'react-router-dom';


const rows = 5;
const cols = 8;


const CinemaHall = () => {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  


  useEffect(() => {
    setBookedSeats(getBookedSeats(id));
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Імʼя обовʼязкове';
    if (!formData.phone.trim()) newErrors.phone = 'Телефон обовʼязковий';
    if (!formData.email.trim()) {
      newErrors.email = 'Email обовʼязковий';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
      newErrors.email = 'Email невалідний';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (!validate()) return;
  
    saveBooking(id, selectedSeats, formData);
  
    const updatedSeats = [...bookedSeats, ...selectedSeats];
    setBookedSeats(Array.from(new Set(updatedSeats)));
    setSelectedSeats([]);
    setFormData({ name: '', phone: '', email: '' });
    setErrors({});
    setShowForm(false);
    alert('Бронювання успішне!');
  };
  

  
return (
  <div className={styles.container}>
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

    <button
      onClick={handleBooking}
      disabled={selectedSeats.length === 0}
      className={styles.bookingButton}
    >
      Забронювати
    </button>

    {showForm && (
      <form onSubmit={handleSubmit} className={`${styles.form} ${showForm ? styles.show : ''}`}>
      <h3>Підтвердження бронювання</h3>

        <input
          type="text"
          placeholder="Імʼя"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}

        <input
          type="tel"
          placeholder="Телефон"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}

        <button type="submit">Підтвердити</button>
      </form>
    )}
  </div>
);

};


export default CinemaHall;
