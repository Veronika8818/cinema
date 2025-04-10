

const MovieCard = ({ movie }) => {
    return (
      <div className="rounded-lg shadow-lg p-4 hover:scale-105 transition">
        <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover rounded" />
        <h2 className="text-xl font-bold mt-2">{movie.title}</h2>
        <p className="text-sm">{movie.description}</p>
        <p className="text-gray-500">{movie.genre}</p>
        <p className="text-sm text-blue-500">{movie.date} о {movie.time}</p>
      </div>
    );
  };
  
  export default MovieCard;
  