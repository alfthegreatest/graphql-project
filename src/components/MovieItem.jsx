function MovieItem({ movie, onGetMore}) {
  if(!movie) return null;

  return(
    <div className="movie-item" key={movie.id}>
      <h2>
        {movie.title} ({movie.year})
        <a 
          href="#" 
          className="more-link"
          onClick={(e) => { 
            e.preventDefault();
            onGetMore(movie.id);
          }}
        >[more]</a>
      </h2>
    </div>
  )
}

export default MovieItem;