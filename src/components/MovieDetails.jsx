function MovieDetails({ movie }) {
  if (!movie) return null;

  return (
    <div className="movie-details">
      <h3>Movie details:</h3>
      <p><span className="key">Title:</span> <span className="value">{movie.title}</span></p>
      <p><span className="key">Year:</span> <span className="value">{movie.year}</span></p>
      <p><span className="key">Rating:</span> <span className="value">{movie.rating}</span></p>
      <p><span className="key">Author:</span> <span className="value">{movie.author.name}</span></p>
    </div>
  )
}

export default MovieDetails;

