import { useMovieUIStore } from '../stores/movieUI.store';


export default function MovieItem({ movie }) {
  const setMovieToDelete = useMovieUIStore(s => s.setMovieToDelete);
  const setSelectedMovieId = useMovieUIStore(s => s.setSelectedMovieId);

  if(!movie) return null;

  
  return(
    <div className="movie-item" key={movie.id}>
      <h2>
        <a 
          href="#" 
          className="delete-cross"
          onClick={(e) => { 
            e.preventDefault();
            setMovieToDelete(movie);
          }}
        >[x]</a>

        {movie.title} ({movie.year})
        <a 
          href="#" 
          className="more-link"
          onClick={(e) => { 
            e.preventDefault();
            setSelectedMovieId(movie.id);
          }}
        >[more]</a>
      </h2>
    </div>
  )
}