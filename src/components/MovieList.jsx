import MovieItem from "./MovieItem";

function MovieList({ movies, onGetMore }) {
  if(!movies) return null;

  return(
    <div>
      <h1>List of movies</h1>
      {movies.map(movie => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onGetMore={onGetMore}
        />
      ))}
    </div>
  )
}

export default MovieList;