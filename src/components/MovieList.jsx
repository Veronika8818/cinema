import React, { useState } from 'react';
import MovieCard from "./MovieCard";
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
    <input
      className={styles.searchInput}
      type="text"
      placeholder="Пошук фільму за назвою..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <div className={styles.movieGrid}>
      {filteredMovies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </div>
  );
};

export default MovieList;
