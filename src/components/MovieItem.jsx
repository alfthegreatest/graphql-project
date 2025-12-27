function MovieItem({ movie, onGetMore, onDeleteClick }) {
  if(!movie) return null;

  
  return(
    <div className="movie-item" key={movie.id}>
      <h2>
        <a 
          href="#" 
          className="delete-cross"
          onClick={(e) => { 
            e.preventDefault();
            onDeleteClick(movie);
          }}
        >[x]</a>

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