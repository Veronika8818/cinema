import React from 'react';
import { movies } from "./data/movies"; 
import MovieList from "./components/MovieList";
import './index.css'; 

function App() {
  return (
    <div className="app"> 
    <h1>Тестовий заголовок</h1>

      <h1 className="main-heading">Список фільмів</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
