import React from 'react';
import { movies } from "./data/movies"; 
import MovieList from "./components/MovieList";
import './index.css'; 

function App() {
  return (
    <div className="app"> 
      <h1 className="text-3xl font-bold mb-4">Список фільмів</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
