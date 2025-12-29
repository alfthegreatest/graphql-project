import MovieItem from "./MovieItem";
import DialogPopup from "./interface/DialogPopup";
import { useMutation } from "@apollo/client";
import { GET_MOVIES } from '../graphql/queries';
import { DELETE_MOVIE } from "../graphql/mutations";
import { useMovieUIStore } from "../stores/movieUI.store";


function MovieList({ movies }) {
    const movieToDelete = useMovieUIStore(s => s.movieToDelete);
    const clearMovieToDelete = useMovieUIStore(s => s.clearMovieToDelete);
    const setSelectedMovieId = useMovieUIStore(s => s.setSelectedMovieId);

    const [deleteMovie] = useMutation(DELETE_MOVIE, {
      refetchQueries: [{ query: GET_MOVIES }]
    });
    
    async function handleDeleteMovie() {
      await deleteMovie({ variables: { id: movieToDelete.id } });
      setSelectedMovieId();
      clearMovieToDelete();
    };

    if(!movies) return null;


    return(
      <div>
        <h1>List of movies</h1>
        {movies.map(movie => (
          <MovieItem
            key={movie.id}
            movie={movie}
          />
        ))}

        {movieToDelete && (
          <DialogPopup
            header={`Delete movie "${movieToDelete.title}"?`}
            content={
              <>
                <input
                  type="button" 
                  value="confirm"
                  className="btn btn-cancel"
                  onClick={handleDeleteMovie}
                />
                <input
                  type="button" 
                  value="cancel"
                  className="btn btn-gray"
                  onClick={clearMovieToDelete}
                />
              </>
            }
            onCloseClick={clearMovieToDelete}
          />
        )}
      </div>
    )
}

export default MovieList;