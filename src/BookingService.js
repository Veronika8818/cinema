const STORAGE_KEY = "bookings";


export const saveBooking = (movieId, seats, userInfo) => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    existing[movieId] = {
      seats,
      userInfo,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  };
  
  export const getBookedSeats = (movieId) => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return data[movieId]?.seats || [];
  };

  